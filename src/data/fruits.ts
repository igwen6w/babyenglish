// 水果主题数据
export interface FruitItem {
  id: string
  en: string
  zh: string
  emoji: string
  example: string
}

const fruitsData: FruitItem[] = [
  { id: 'apple', en: 'Apple', zh: '苹果', emoji: '🍎', example: 'I like apples' },
  { id: 'banana', en: 'Banana', zh: '香蕉', emoji: '🍌', example: 'The banana is yellow' },
  { id: 'orange', en: 'Orange', zh: '橙子', emoji: '🍊', example: 'Oranges are sweet' },
  { id: 'grape', en: 'Grape', zh: '葡萄', emoji: '🍇', example: 'Grapes are purple' },
  { id: 'strawberry', en: 'Strawberry', zh: '草莓', emoji: '🍓', example: 'Strawberries are red' },
  { id: 'watermelon', en: 'Watermelon', zh: '西瓜', emoji: '🍉', example: 'Watermelon is big' },
  { id: 'peach', en: 'Peach', zh: '桃子', emoji: '🍑', example: 'The peach is juicy' },
  { id: 'pear', en: 'Pear', zh: '梨', emoji: '🍐', example: 'I eat a pear' },
  { id: 'cherry', en: 'Cherry', zh: '樱桃', emoji: '🍒', example: 'Cherries are small' },
]

export default fruitsData
