// 字母学习页
import { useNavigate } from 'react-router-dom'
import { useLearningStore } from '../store/learningStore'
import styles from './AlphabetPage.module.css'
import alphabetData from '../data/alphabet'

export default function AlphabetPage() {
  const navigate = useNavigate()
  const learnedLetters = useLearningStore((s) => s.learnedLetters)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🔤 字母学习</h1>
      {/* 学习进度 */}
      <div className={styles.progress}>
        <div className={styles.progressText}>
          已学习 {learnedLetters.length} / 26
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(learnedLetters.length / 26) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {alphabetData.map((item) => {
          const learned = learnedLetters.includes(item.id)
          return (
            <button
              key={item.id}
              className={`${styles.letterBtn} ${learned ? styles.learned : ''}`}
              style={{ background: `hsl(${(item.upper.charCodeAt(0) - 65) * 14}, 70%, 55%)` }}
              onClick={() => navigate(`/alphabet/${item.id}`)}
            >
              <span className={styles.upper}>{item.upper}</span>
              <span className={styles.lower}>{item.lower}</span>
              {learned && <span className={styles.check}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
