// 学习状态管理（zustand + localStorage 持久化）
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

  // 标记字母已学习
  markLetterLearned: (letter: string) => void
  // 标记词汇已学习
  markWordLearned: (id: string) => void
  // 增加学习时长（秒）
  addStudyTime: (seconds: number) => void
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
        // 跨天重置
        if (state.todayDate !== date) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().slice(0, 10)
          // 连续天数计算
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
    }),
    { name: 'baby-english-learning' }
  )
)
