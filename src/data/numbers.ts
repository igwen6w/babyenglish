// 数字 1-10 数据
export interface NumberItem {
  id: string
  num: number
  en: string
  zh: string
  emoji: string
  example: string
}

const numbersData: NumberItem[] = [
  { id: 'num-1', num: 1, en: 'One', zh: '一', emoji: '1️⃣', example: 'I have one nose' },
  { id: 'num-2', num: 2, en: 'Two', zh: '二', emoji: '2️⃣', example: 'I have two eyes' },
  { id: 'num-3', num: 3, en: 'Three', zh: '三', emoji: '3️⃣', example: 'I see three birds' },
  { id: 'num-4', num: 4, en: 'Four', zh: '四', emoji: '4️⃣', example: 'A cat has four legs' },
  { id: 'num-5', num: 5, en: 'Five', zh: '五', emoji: '5️⃣', example: 'I have five fingers' },
  { id: 'num-6', num: 6, en: 'Six', zh: '六', emoji: '6️⃣', example: 'Six eggs in a box' },
  { id: 'num-7', num: 7, en: 'Seven', zh: '七', emoji: '7️⃣', example: 'Seven days in a week' },
  { id: 'num-8', num: 8, en: 'Eight', zh: '八', emoji: '8️⃣', example: 'An octopus has eight legs' },
  { id: 'num-9', num: 9, en: 'Nine', zh: '九', emoji: '9️⃣', example: 'Nine little ducks' },
  { id: 'num-10', num: 10, en: 'Ten', zh: '十', emoji: '🔟', example: 'I can count to ten' },
]

export default numbersData
