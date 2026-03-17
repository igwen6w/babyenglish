// 主题列表页
import { useNavigate } from 'react-router-dom'
import styles from './TopicPage.module.css'

const topics = [
  { id: 'colors', name: '颜色', nameEn: 'Colors', emoji: '🎨', color: 'var(--purple)' },
  { id: 'animals', name: '动物', nameEn: 'Animals', emoji: '🐾', color: 'var(--orange)' },
  { id: 'fruits', name: '水果', nameEn: 'Fruits', emoji: '🍓', color: 'var(--red)' },
  { id: 'numbers', name: '数字', nameEn: 'Numbers', emoji: '🔢', color: 'var(--blue)' },
]

export default function TopicPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📚 主题词汇</h1>
      <p className={styles.subtitle}>选择一个主题，学习新单词</p>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={styles.card}
            style={{ background: topic.color }}
            onClick={() => navigate(`/topics/${topic.id}`)}
          >
            <span className={styles.emoji}>{topic.emoji}</span>
            <div className={styles.nameEn}>{topic.nameEn}</div>
            <div className={styles.nameZh}>{topic.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
