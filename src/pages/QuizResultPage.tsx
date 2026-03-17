// 练习结果页 - 显示得分、星星、错题回顾
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import styles from './quiz.module.css'
import { playComplete } from '../utils/sound'
import { useEffect } from 'react'
import { topicConfig } from '../data/exercises'

export default function QuizResultPage() {
  const navigate = useNavigate()
  const { type } = useParams<{ type: string }>()
  const [searchParams] = useSearchParams()
  const correct = parseInt(searchParams.get('correct') || '0')
  const total = parseInt(searchParams.get('total') || '0')
  const topic = searchParams.get('topic') || 'animals'

  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const stars = score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0

  const topicLabel = topicConfig[topic as keyof typeof topicConfig]?.label || topic
  const typeNames: Record<string, string> = {
    listening: '听音选图',
    image: '看图选词',
    match: '拖拽配对',
    memory: '记忆翻牌',
  }

  useEffect(() => {
    playComplete()
  }, [])

  function handleRetry() {
    navigate(`/practice/${type}?topic=${topic}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.resultCard}>
        <h1 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
          {typeNames[type || ''] || '练习'} · {topicLabel}
        </h1>

        {/* 星星评价 */}
        <div className={styles.resultStars}>
          {[1, 2, 3].map((i) => (
            <span key={i}>{i <= stars ? '⭐' : '☆'}</span>
          ))}
        </div>

        {/* 得分 */}
        <div className={styles.resultScore}>{score}%</div>
        <p className={styles.resultLabel}>
          答对 {correct} / {total} 题
        </p>

        {stars === 3 && <p style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: 16 }}>🎉 太棒了！完美表现！</p>}
        {stars === 2 && <p style={{ color: 'var(--blue)', fontWeight: 700, marginBottom: 16 }}>👏 很不错！继续加油！</p>}
        {stars === 1 && <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>💪 再练一次会更好！</p>}
        {stars === 0 && <p style={{ color: 'var(--red)', marginBottom: 16 }}>😊 没关系，多练习就能学会！</p>}
      </div>

      {/* 操作按钮 */}
      <button className={styles.primaryBtn} onClick={handleRetry}>
        🔄 再来一次
      </button>
      <button className={styles.secondaryBtn} onClick={() => navigate('/practice')}>
        📋 返回练习
      </button>
    </div>
  )
}
