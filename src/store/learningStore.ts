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

interface LearningState {
  // 已学习的字母 ID 列表
  learnedLetters: string[]
  // 已学习的主题词汇 ID 列表
  learnedWords: string[]
  // 今日累计学习时长（秒）
  todayStudyTime: number
  // 今日学习日期（YYYY-MM-DD）
  todayDate: string
  // 连续学习天数
  streakDays: number
  // 上次学习日期
  lastStudyDate: string
  // 练习历史记录
  practiceRecords: PracticeRecord[]
  // 总获得星星数
  totalStars: number

  // 标记字母已学习
  markLetterLearned: (letter: string) => void
  // 标记词汇已学习
  markWordLearned: (id: string) => void
  // 增加学习时长（秒）
  addStudyTime: (seconds: number) => void
  // 记录练习结果
  addPracticeRecord: (record: PracticeRecord) => void
}

const today = () => new Date().toISOString().slice(0, 10)

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

      markLetterLearned: (letter) =>
        set((s) => ({
          learnedLetters: s.learnedLetters.includes(letter)
            ? s.learnedLetters
            : [...s.learnedLetters, letter],
        })),

      markWordLearned: (id) =>
        set((s) => ({
          learnedWords: s.learnedWords.includes(id)
            ? s.learnedWords
            : [...s.learnedWords, id],
        })),

      addStudyTime: (seconds) => {
        const date = today()
        const state = get()
        if (state.todayDate !== date) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().slice(0, 10)
          const newStreak =
            state.lastStudyDate === yesterdayStr
              ? state.streakDays + 1
              : state.lastStudyDate === date
              ? state.streakDays
              : 1
          set({
            todayStudyTime: seconds,
            todayDate: date,
            lastStudyDate: date,
            streakDays: newStreak,
          })
        } else {
          set({
            todayStudyTime: state.todayStudyTime + seconds,
            lastStudyDate: date,
          })
        }
      },

      addPracticeRecord: (record) =>
        set((s) => ({
          practiceRecords: [...s.practiceRecords.slice(-49), record], // 保留最近50条
          totalStars: s.totalStars + record.stars,
        })),
    }),
    { name: 'baby-english-learning' }
  )
)
