// 字母详情页
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import alphabetData from '../data/alphabet'
import { speak } from '../utils/speech'
import { useLearningStore } from '../store/learningStore'
import styles from './AlphabetPage.module.css'

export default function AlphabetDetailPage() {
  const { letter } = useParams<{ letter: string }>()
  const navigate = useNavigate()
  const markLetterLearned = useLearningStore((s) => s.markLetterLearned)

  const index = alphabetData.findIndex((a) => a.id === letter)
  const item = alphabetData[index]

  useEffect(() => {
    if (item) markLetterLearned(item.id)
  }, [item, markLetterLearned])

  if (!item) return <div>未找到字母</div>

  const prev = alphabetData[index - 1]
  const next = alphabetData[index + 1]
  const goPrev = () => prev && navigate(`/alphabet/${prev.id}`)
  const goNext = () => next && navigate(`/alphabet/${next.id}`)

  return (
    <div className={styles.detail}>
      <button className={styles.backBtn} onClick={() => navigate('/alphabet')}>
        ← 返回字母表
      </button>

      <div className={styles.bigLetter}>{item.upper}</div>
      <div className={styles.lowercase}>{item.lower}</div>

      <div className={styles.wordCard}>
        <div className={styles.wordEmoji}>{item.emoji}</div>
        <div className={styles.wordEn}>{item.word}</div>
        <div className={styles.wordZh}>{item.wordZh}</div>
        <button className={styles.speakBtn} onClick={() => speak(item.word)}>
          🔊 发音
        </button>
      </div>

      <div className={styles.navRow}>
        <button className={styles.navBtn} onClick={goPrev} disabled={index === 0}>
          ← 上一个
        </button>
        <button className={styles.navBtn} onClick={goNext} disabled={index === 25}>
          下一个 →
        </button>
      </div>
    </div>
  )
}
