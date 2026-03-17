// 听音选图 - 播放单词发音，选择正确图片
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './quiz.module.css'
import { generateExercises, type Exercise, type TopicKey } from '../data/exercises'
import { playCorrect, playWrong, playStar } from '../utils/sound'
import { speak } from '../utils/speech'
import { useLearningStore } from '../store/learningStore'

const QUESTION_COUNT = 8

export default function ListeningQuizPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const topic = (searchParams.get('topic') || 'animals') as TopicKey
  const addPracticeRecord = useLearningStore((s) => s.addPracticeRecord)
  const addStudyTime = useLearningStore((s) => s.addStudyTime)

  const [exercises] = useState<Exercise[]>(() => generateExercises(topic, QUESTION_COUNT))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [, setWrongItems] = useState<{ emoji: string; correctEn: string; userEn: string }[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [starAnim, setStarAnim] = useState(false)

  const exercise = exercises[current]!
  const isFinished = current >= exercises.length

  // 自动播放发音
  useEffect(() => {
    if (exercise && !feedback) {
      const timer = setTimeout(() => speak(exercise.correct.en), 400)
      return () => clearTimeout(timer)
    }
  }, [current, exercise, feedback])

  const handleSelect = useCallback(
    (id: string) => {
      if (selected) return
      setSelected(id)

      if (id === exercise.correct.id) {
        setFeedback('correct')
        playCorrect()
        playStar()
        setCorrectCount((c) => c + 1)
        setStarAnim(true)
        setTimeout(() => setStarAnim(false), 800)

        // 自动下一题
        setTimeout(() => {
          setFeedback(null)
          setSelected(null)
          setCurrent((c) => c + 1)
        }, 1200)
      } else {
        setFeedback('wrong')
        playWrong()
        const chosen = exercise.options.find((o) => o.id === id)
        setWrongItems((w) => [
          ...w,
          { emoji: exercise.correct.emoji, correctEn: exercise.correct.en, userEn: chosen?.en || '' },
        ])

        setTimeout(() => {
          setFeedback(null)
          setSelected(null)
          setCurrent((c) => c + 1)
        }, 1800)
      }
    },
    [selected, exercise]
  )

  // 完成时记录
  useEffect(() => {
    if (isFinished) {
      const score = Math.round((correctCount / exercises.length) * 100)
      const stars = score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0
      addPracticeRecord({ type: 'listening', topic, score, stars, correct: correctCount, total: exercises.length, date: new Date().toISOString().slice(0, 10) })
      addStudyTime(Math.round(exercises.length * 10))
    }
  }, [isFinished])

  if (isFinished) {
    navigate(`/practice/listening/result?topic=${topic}&correct=${correctCount}&total=${exercises.length}`, { replace: true })
    return null
  }

  const progress = ((current + 1) / exercises.length) * 100

  return (
    <div className={styles.page}>
      {/* 进度条 */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* 播放按钮 */}
      <div className={styles.questionArea}>
        <button className={styles.speakerBtn} onClick={() => speak(exercise.correct.en)}>
          🔊
        </button>
        <p className={styles.questionText}>听发音，选出正确的图片</p>
      </div>

      {/* 选项 */}
      <div className={styles.optionsGrid}>
        {exercise.options.map((opt) => {
          let cls = styles.optionBtn
          if (selected === opt.id && opt.id === exercise.correct.id) cls += ` ${styles.correct}`
          else if (selected === opt.id) cls += ` ${styles.wrong}`
          else if (selected) cls += ` ${styles.disabled}`
          return (
            <button key={opt.id} className={cls} onClick={() => handleSelect(opt.id)}>
              <span className={styles.optionEmoji}>{opt.emoji}</span>
              <span className={styles.optionText}>{opt.en}</span>
            </button>
          )
        })}
      </div>

      {/* 反馈 */}
      {feedback === 'correct' && (
        <div className={`${styles.feedback} ${styles.correct}`}>✅ 太棒了！</div>
      )}
      {feedback === 'wrong' && (
        <div className={`${styles.feedback} ${styles.wrong}`}>
          ❌ 正确答案：{exercise.correct.emoji} {exercise.correct.en}
        </div>
      )}

      {/* 星星动画 */}
      {starAnim && (
        <div className={styles.starBurst}>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              style={{
                '--tx': `${(Math.random() - 0.5) * 200}px`,
                '--ty': `${(Math.random() - 0.5) * 200}px`,
                animationDelay: `${i * 0.05}s`,
              } as React.CSSProperties}
            >
              ⭐
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
