// 练习主页面 - 展示所有练习类型 + 选择主题
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './quiz.module.css'
import { topicConfig, type TopicKey } from '../data/exercises'
import { playClick } from '../utils/sound'

interface QuizType {
  type: string
  icon: string
  name: string
  desc: string
}

const quizTypes: QuizType[] = [
  { type: 'listening', icon: '🔊', name: '听音选图', desc: '听发音，选出正确的图片' },
  { type: 'image', icon: '🖼️', name: '看图选词', desc: '看图片，选出正确的英文' },
  { type: 'match', icon: '🔗', name: '拖拽配对', desc: '把图片和英文配对' },
  { type: 'memory', icon: '🃏', name: '记忆翻牌', desc: '翻牌配对记忆力挑战' },
]

export default function PracticePage() {
  const navigate = useNavigate()
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null)

  const topics = Object.entries(topicConfig) as [TopicKey, { label: string; emoji: string }][]

  function handleQuizSelect(quiz: QuizType) {
    playClick()
    setSelectedQuiz(quiz)
  }

  function handleTopicSelect(topic: TopicKey) {
    playClick()
    if (selectedQuiz) {
      navigate(`/practice/${selectedQuiz.type}?topic=${topic}`)
    }
  }

  // 未选择练习类型：显示练习列表
  if (!selectedQuiz) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>🎮 互动练习</h1>
        <div className={styles.quizCards}>
          {quizTypes.map((q) => (
            <div key={q.type} className={styles.quizCard} onClick={() => handleQuizSelect(q)}>
              <span className={styles.quizCardIcon}>{q.icon}</span>
              <div className={styles.quizCardInfo}>
                <h3>{q.name}</h3>
                <p>{q.desc}</p>
              </div>
              <span className={styles.quizCardArrow}>▶</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 已选择练习类型：选择主题
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{selectedQuiz.icon} 选择主题</h1>
      <div className={styles.topicGrid}>
        {topics.map(([key, cfg]) => (
          <div
            key={key}
            className={styles.topicCard}
            onClick={() => handleTopicSelect(key)}
          >
            <span className={styles.topicEmoji}>{cfg.emoji}</span>
            <span className={styles.topicLabel}>{cfg.label}</span>
          </div>
        ))}
      </div>
      <button className={styles.secondaryBtn} onClick={() => setSelectedQuiz(null)}>
        ← 返回练习列表
      </button>
    </div>
  )
}
