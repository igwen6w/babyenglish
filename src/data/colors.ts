// 颜色主题数据
export interface ColorItem {
  id: string
  en: string
  zh: string
  hex: string
  example: string
  emoji: string
}

const colorsData: ColorItem[] = [
  { id: 'red', en: 'Red', zh: '红色', hex: '#FF4B4B', example: 'A red apple', emoji: '🍎' },
  { id: 'blue', en: 'Blue', zh: '蓝色', hex: '#1CB0F6', example: 'A blue sky', emoji: '☁️' },
  { id: 'green', en: 'Green', zh: '绿色', hex: '#58CC02', example: 'A green tree', emoji: '🌲' },
  { id: 'yellow', en: 'Yellow', zh: '黄色', hex: '#FFC800', example: 'A yellow sun', emoji: '☀️' },
  { id: 'orange', en: 'Orange', zh: '橙色', hex: '#FF9600', example: 'An orange carrot', emoji: '🥕' },
  { id: 'purple', en: 'Purple', zh: '紫色', hex: '#CE82FF', example: 'A purple flower', emoji: '💜' },
  { id: 'pink', en: 'Pink', zh: '粉色', hex: '#FF69B4', example: 'A pink pig', emoji: '🐷' },
  { id: 'white', en: 'White', zh: '白色', hex: '#FFFFFF', example: 'A white snowman', emoji: '⛄' },
  { id: 'black', en: 'Black', zh: '黑色', hex: '#333333', example: 'A black cat', emoji: '🐈‍⬛' },
  { id: 'brown', en: 'Brown', zh: '棕色', hex: '#8B4513', example: 'A brown bear', emoji: '🐻' },
]

export default colorsData
