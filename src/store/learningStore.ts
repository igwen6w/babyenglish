// 学习状态管理（zustand + localStorage 持久化）
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 练习结果记录
export interface PracticeRecord {
  type: string        // listening | image | match | memory
  topic: string       // alphabet | colors | ...
  score: number       // 得分 0-100
  stars: number       // 获得星星 1-3
  correct: number     // 正确数
  total: number       // 总题数
  date: string        // 完成日期
}

// 每日目标
export interface DailyGoals {
  date: string          // YYYY-MM-DD
  questionsAnswered: number  // 已答题数
  newWordsLearned: number    // 新学词汇数
  studyMinutes: number       // 学习分钟数
  completed: boolean         // 是否已领取奖励
}

// 关卡进度
export interface LevelProgress {
  id: number
  stars: number        // 0-3
  completed: boolean
}

const today = () => new Date().toISOString().slice(0, 10)

// 计算等级：Level N 需要 N*20 XP 累计
function calcLevel(totalXp: number): { level: number; currentXp: number; neededXp: number } {
  let level = 1
  let remaining = totalXp
  while (remaining >= level * 20) {
    remaining -= level * 20
    level++
  }
  return { level, currentXp: remaining, neededXp: level * 20 }
}

interface LearningState {
  // 基础学习数据
  learnedLetters: string[]
  learnedWords: string[]
  todayStudyTime: number
  todayDate: string
  streakDays: number
  lastStudyDate: string
  practiceRecords: PracticeRecord[]
  totalStars: number

  // === 第四阶段：游戏化系统 ===
  // 经验值与等级
  totalXp: number
  level: number
  currentXp: number
  neededXp: number

  // 连击
  combo: number
  maxCombo: number

  // 每日目标
  dailyGoals: DailyGoals

  // 关卡进度
  levelProgress: LevelProgress[]

  // Actions
  markLetterLearned: (letter: string) => void
  markWordLearned: (id: string) => void
  addStudyTime: (seconds: number) => void
  addPracticeRecord: (record: PracticeRecord) => void
  addXp: (amount: number) => void
  incrementCombo: () => void
  resetCombo: () => void
  addDailyQuestion: () => void
  addDailyNewWord: () => void
  claimDailyReward: () => number  // 返回奖励 XP
  completeLevel: (levelId: number, stars: number) => boolean  // 返回是否升级
  getNextLevelId: () => number
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      learnedLetters: [],
      learnedWords: [],
      todayStudyTime: 0,
      todayDate: today(),
      streakDays: 0,
      lastStudyDate: '',
      practiceRecords: [],
      totalStars: 0,

      // 游戏化系统
      totalXp: 0,
      level: 1,
      currentXp: 0,
      neededXp: 20,
      combo: 0,
      maxCombo: 0,
      dailyGoals: { date: today(), questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false },
      levelProgress: [],

      markLetterLearned: (letter) =>
        set((s) => ({
          learnedLetters: s.learnedLetters.includes(letter) ? s.learnedLetters : [...s.learnedLetters, letter],
        })),

      markWordLearned: (id) =>
        set((s) => {
          const isNew = !s.learnedWords.includes(id)
          const newWords = isNew ? [...s.learnedWords, id] : s.learnedWords
          // 更新每日目标
          const date = today()
          const goals = s.dailyGoals.date === date ? { ...s.dailyGoals } : { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false }
          if (isNew) goals.newWordsLearned++
          return { learnedWords: newWords, dailyGoals: goals }
        }),

      addStudyTime: (seconds) => {
        const date = today()
        const state = get()
        if (state.todayDate !== date) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().slice(0, 10)
          const newStreak = state.lastStudyDate === yesterdayStr
            ? state.streakDays + 1
            : state.lastStudyDate === date ? state.streakDays : 1
          set({
            todayStudyTime: seconds,
            todayDate: date,
            lastStudyDate: date,
            streakDays: newStreak,
            dailyGoals: { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false },
          })
        } else {
          const minutes = Math.floor((state.todayStudyTime + seconds) / 60)
          const goals = state.dailyGoals.date === date ? { ...state.dailyGoals } : { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false }
          goals.studyMinutes = minutes
          set({ todayStudyTime: state.todayStudyTime + seconds, lastStudyDate: date, dailyGoals: goals })
        }
      },

      addPracticeRecord: (record) =>
        set((s) => ({
          practiceRecords: [...s.practiceRecords.slice(-49), record],
          totalStars: s.totalStars + record.stars,
        })),

      addXp: (amount) => {
        const state = get()
        const newTotal = state.totalXp + amount
        const lv = calcLevel(newTotal)
        set({ totalXp: newTotal, level: lv.level, currentXp: lv.currentXp, neededXp: lv.neededXp })
        return lv.level > state.level  // 返回是否升级
      },

      incrementCombo: () => {
        const c = get().combo + 1
        set({ combo: c, maxCombo: Math.max(get().maxCombo, c) })
      },

      resetCombo: () => set({ combo: 0 }),

      addDailyQuestion: () => {
        const date = today()
        const state = get()
        const goals = state.dailyGoals.date === date ? { ...state.dailyGoals } : { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false }
        goals.questionsAnswered++
        set({ dailyGoals: goals })
      },

      addDailyNewWord: () => {
        const date = today()
        const state = get()
        const goals = state.dailyGoals.date === date ? { ...state.dailyGoals } : { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false }
        goals.newWordsLearned++
        set({ dailyGoals: goals })
      },

      claimDailyReward: () => {
        const state = get()
        if (state.dailyGoals.completed) return 0
        set({ dailyGoals: { ...state.dailyGoals, completed: true } })
        // +20 XP
        const newTotal = state.totalXp + 20
        const lv = calcLevel(newTotal)
        set({ totalXp: newTotal, level: lv.level, currentXp: lv.currentXp, neededXp: lv.neededXp })
        return 20
      },

      completeLevel: (levelId, stars) => {
        const state = get()
        const existing = state.levelProgress.find(l => l.id === levelId)
        const newProgress = existing
          ? state.levelProgress.map(l => l.id === levelId ? { ...l, stars: Math.max(l.stars, stars), completed: true } : l)
          : [...state.levelProgress, { id: levelId, stars, completed: true }]
        // +10 XP for completion, +5 for 3 stars
        const xpGain = 10 + (stars >= 3 ? 5 : 0)
        const newTotal = state.totalXp + xpGain
        const lv = calcLevel(newTotal)
        const leveledUp = lv.level > state.level
        set({ levelProgress: newProgress, totalXp: newTotal, level: lv.level, currentXp: lv.currentXp, neededXp: lv.neededXp })
        return leveledUp
      },

      getNextLevelId: () => {
        const state = get()
        // 找第一个未完成或未解锁的关卡
        // 关卡解锁规则：前一关已完成，或第一关
        const completedIds = new Set(state.levelProgress.filter(l => l.completed).map(l => l.id))
        for (let i = 1; i <= 20; i++) {
          if (i === 1 && !completedIds.has(1)) return 1
          if (completedIds.has(i - 1) && !completedIds.has(i)) return i
          if (completedIds.has(i)) continue
          return Math.max(...completedIds, 0) + 1
        }
        return 1
      },
    }),
    {
      name: 'baby-english-learning',
      // 升级后恢复等级计算
      onRehydrateStorage: () => (state) => {
        if (state) {
          const lv = calcLevel(state.totalXp)
          state.level = lv.level
          state.currentXp = lv.currentXp
          state.neededXp = lv.neededXp
          // 重置每日目标（如果是新的一天）
          const date = today()
          if (state.dailyGoals.date !== date) {
            state.dailyGoals = { date, questionsAnswered: 0, newWordsLearned: 0, studyMinutes: 0, completed: false }
          }
        }
      },
    }
  )
)
