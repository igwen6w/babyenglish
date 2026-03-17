// 动物主题数据
export interface AnimalItem {
  id: string
  en: string
  zh: string
  emoji: string
  example: string
}

const animalsData: AnimalItem[] = [
  { id: 'cat', en: 'Cat', zh: '猫', emoji: '🐱', example: 'The cat is sleeping' },
  { id: 'dog', en: 'Dog', zh: '狗', emoji: '🐶', example: 'The dog is running' },
  { id: 'bird', en: 'Bird', zh: '鸟', emoji: '🐦', example: 'The bird can fly' },
  { id: 'fish', en: 'Fish', zh: '鱼', emoji: '🐟', example: 'The fish can swim' },
  { id: 'rabbit', en: 'Rabbit', zh: '兔子', emoji: '🐰', example: 'The rabbit is cute' },
  { id: 'elephant', en: 'Elephant', zh: '大象', emoji: '🐘', example: 'The elephant is big' },
  { id: 'monkey', en: 'Monkey', zh: '猴子', emoji: '🐒', example: 'The monkey likes bananas' },
  { id: 'lion', en: 'Lion', zh: '狮子', emoji: '🦁', example: 'The lion is strong' },
  { id: 'tiger', en: 'Tiger', zh: '老虎', emoji: '🐯', example: 'The tiger has stripes' },
  { id: 'panda', en: 'Panda', zh: '熊猫', emoji: '🐼', example: 'The panda eats bamboo' },
  { id: 'cow', en: 'Cow', zh: '奶牛', emoji: '🐮', example: 'The cow says moo' },
  { id: 'duck', en: 'Duck', zh: '鸭子', emoji: '🦆', example: 'The duck swims in the pond' },
]

export default animalsData
