// 练习数据生成器 - 根据主题动态生成练习题目
import alphabetData from './alphabet'
import colorsData from './colors'
import animalsData from './animals'
import fruitsData from './fruits'
import numbersData from './numbers'

// 统一数据项接口
export interface ItemData {
  id: string
  en: string
  zh: string
  emoji: string
}

// 练习题目接口
export interface Exercise {
  id: string
  question: string      // 题目（如 "听音选图"）
  correct: ItemData      // 正确答案
  options: ItemData[]    // 选项（包含正确答案）
}

// 主题类型
export type TopicKey = 'alphabet' | 'colors' | 'animals' | 'fruits' | 'numbers'

// 主题配置
export const topicConfig: Record<TopicKey, { label: string; emoji: string }> = {
  alphabet: { label: '字母', emoji: '🔤' },
  colors: { label: '颜色', emoji: '🎨' },
  animals: { label: '动物', emoji: '🐾' },
  fruits: { label: '水果', emoji: '🍎' },
  numbers: { label: '数字', emoji: '🔢' },
}

// 将各数据源统一为 ItemData 格式
function getTopicData(topic: TopicKey): ItemData[] {
  switch (topic) {
    case 'alphabet':
      return alphabetData.map((a) => ({ id: a.id, en: a.word, zh: a.wordZh, emoji: a.emoji }))
    case 'colors':
      return colorsData.map((c) => ({ id: c.id, en: c.en, zh: c.zh, emoji: c.emoji }))
    case 'animals':
      return animalsData.map((a) => ({ id: a.id, en: a.en, zh: a.zh, emoji: a.emoji }))
    case 'fruits':
      return fruitsData.map((f) => ({ id: f.id, en: f.en, zh: f.zh, emoji: f.emoji }))
    case 'numbers':
      return numbersData.map((n) => ({ id: n.id, en: n.en, zh: n.zh, emoji: n.emoji }))
  }
}

// Fisher-Yates 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = a[i]!
    a[i] = a[j]!
    a[j] = temp
  }
  return a
}

// 从数组中随机取 n 个不重复元素
function pickRandom<T extends ItemData>(arr: T[], n: number, exclude?: T): T[] {
  const filtered = exclude ? arr.filter((x) => x.id !== exclude.id) : arr
  const shuffled = shuffle(filtered)
  return shuffled.slice(0, Math.min(n, shuffled.length))
}

/**
 * 生成练习题目列表
 * @param topic 主题
 * @param count 题目数量
 */
export function generateExercises(topic: TopicKey, count = 8): Exercise[] {
  const data = getTopicData(topic)
  const questions = shuffle(data).slice(0, Math.min(count, data.length))
  const exercises: Exercise[] = []

  for (const correct of questions) {
    const distractors = pickRandom(data, 3, correct)
    const options = shuffle([correct, ...distractors])
    exercises.push({
      id: `ex-${topic}-${correct.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      question: correct.zh,
      correct,
      options,
    })
  }

  return exercises
}

/**
 * 生成配对练习数据（拖拽配对用）
 * @param topic 主题
 * @param count 配对数量
 */
export function generateMatchPairs(topic: TopicKey, count = 6): { left: ItemData[]; right: ItemData[] } {
  const data = getTopicData(topic)
  const selected = shuffle(data).slice(0, Math.min(count, data.length))
  return {
    left: selected,
    right: shuffle(selected),
  }
}

/**
 * 生成记忆游戏卡片数据
 * 每个项目生成两张卡：一张 emoji，一张英文，需要配对
 * @param topic 主题
 * @param count 对数（最终卡数 = count * 2）
 */
export interface MemoryCard {
  id: string
  pairId: string
  content: string   // 显示内容
  type: 'emoji' | 'text'
}

export function generateMemoryCards(topic: TopicKey, count = 6): MemoryCard[] {
  const data = getTopicData(topic)
  const selected = shuffle(data).slice(0, Math.min(count, data.length))
  const cards: MemoryCard[] = []

  for (const item of selected) {
    cards.push({ id: `${item.id}-emoji`, pairId: item.id, content: item.emoji, type: 'emoji' })
    cards.push({ id: `${item.id}-text`, pairId: item.id, content: item.en, type: 'text' })
  }

  return shuffle(cards)
}
