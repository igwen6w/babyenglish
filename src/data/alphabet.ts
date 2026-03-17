// 26 个英文字母数据
export interface AlphabetItem {
  id: string
  upper: string
  lower: string
  word: string // 示例单词
  wordZh: string // 示例单词中文
  emoji: string
}

const alphabetData: AlphabetItem[] = [
  { id: 'A', upper: 'A', lower: 'a', word: 'Apple', wordZh: '苹果', emoji: '🍎' },
  { id: 'B', upper: 'B', lower: 'b', word: 'Bear', wordZh: '熊', emoji: '🐻' },
  { id: 'C', upper: 'C', lower: 'c', word: 'Cat', wordZh: '猫', emoji: '🐱' },
  { id: 'D', upper: 'D', lower: 'd', word: 'Dog', wordZh: '狗', emoji: '🐶' },
  { id: 'E', upper: 'E', lower: 'e', word: 'Elephant', wordZh: '大象', emoji: '🐘' },
  { id: 'F', upper: 'F', lower: 'f', word: 'Fish', wordZh: '鱼', emoji: '🐟' },
  { id: 'G', upper: 'G', lower: 'g', word: 'Grape', wordZh: '葡萄', emoji: '🍇' },
  { id: 'H', upper: 'H', lower: 'h', word: 'House', wordZh: '房子', emoji: '🏠' },
  { id: 'I', upper: 'I', lower: 'i', word: 'Ice cream', wordZh: '冰淇淋', emoji: '🍦' },
  { id: 'J', upper: 'J', lower: 'j', word: 'Juice', wordZh: '果汁', emoji: '🧃' },
  { id: 'K', upper: 'K', lower: 'k', word: 'Kite', wordZh: '风筝', emoji: '🪁' },
  { id: 'L', upper: 'L', lower: 'l', word: 'Lion', wordZh: '狮子', emoji: '🦁' },
  { id: 'M', upper: 'M', lower: 'm', word: 'Moon', wordZh: '月亮', emoji: '🌙' },
  { id: 'N', upper: 'N', lower: 'n', word: 'Nut', wordZh: '坚果', emoji: '🥜' },
  { id: 'O', upper: 'O', lower: 'o', word: 'Orange', wordZh: '橙子', emoji: '🍊' },
  { id: 'P', upper: 'P', lower: 'p', word: 'Panda', wordZh: '熊猫', emoji: '🐼' },
  { id: 'Q', upper: 'Q', lower: 'q', word: 'Queen', wordZh: '女王', emoji: '👑' },
  { id: 'R', upper: 'R', lower: 'r', word: 'Rainbow', wordZh: '彩虹', emoji: '🌈' },
  { id: 'S', upper: 'S', lower: 's', word: 'Star', wordZh: '星星', emoji: '⭐' },
  { id: 'T', upper: 'T', lower: 't', word: 'Tiger', wordZh: '老虎', emoji: '🐯' },
  { id: 'U', upper: 'U', lower: 'u', word: 'Umbrella', wordZh: '雨伞', emoji: '☂️' },
  { id: 'V', upper: 'V', lower: 'v', word: 'Violin', wordZh: '小提琴', emoji: '🎻' },
  { id: 'W', upper: 'W', lower: 'w', word: 'Whale', wordZh: '鲸鱼', emoji: '🐋' },
  { id: 'X', upper: 'X', lower: 'x', word: 'Xylophone', wordZh: '木琴', emoji: '🎵' },
  { id: 'Y', upper: 'Y', lower: 'y', word: 'Yarn', wordZh: '毛线', emoji: '🧶' },
  { id: 'Z', upper: 'Z', lower: 'z', word: 'Zebra', wordZh: '斑马', emoji: '🦓' },
]

export default alphabetData
