// 看图选词 - 显示图片，选择正确英文单词
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './quiz.module.css'
import { generateExercises, type Exercise, type TopicKey } from '../data/exercises'
import { playCorrect, playWrong, playStar } from '../utils/sound'
import { speak } from '../utils/speech'
import { useLearningStore } from '../store/learningStore'

const QUESTION_COUNT = 8

export default function ImageQuizPage() {
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

  const handleSelect = useCallback(
    (id: string) => {
      if (selected) return
      setSelected(id)

      if (id === exercise.correct.id) {
        setFeedback('correct')
        playCorrect()
        playStar()
        speak(exercise.correct.en)
        setCorrectCount((c) => c + 1)
        setStarAnim(true)
        setTimeout(() => setStarAnim(false), 800)
        setTimeout(() => { setFeedback(null); setSelected(null); setCurrent((c) => c + 1) }, 1200)
      } else {
        setFeedback('wrong')
        playWrong()
        const chosen = exercise.options.find((o) => o.id === id)
        setWrongItems((w) => [...w, { emoji: exercise.correct.emoji, correctEn: exercise.correct.en, userEn: chosen?.en || '' }])
        setTimeout(() => { setFeedback(null); setSelected(null); setCurrent((c) => c + 1) }, 1800)
      }
    },
    [selected, exercise]
  )

  useEffect(() => {
    if (isFinished) {
      const score = Math.round((correctCount / exercises.length) * 100)
      const stars = score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0
      addPracticeRecord({ type: 'image', topic, score, stars, correct: correctCount, total: exercises.length, date: new Date().toISOString().slice(0, 10) })
      addStudyTime(Math.round(exercises.length * 10))
    }
  }, [isFinished])

  if (isFinished) {
    navigate(`/practice/image/result?topic=${topic}&correct=${correctCount}&total=${exercises.length}`, { replace: true })
    return null
  }

  return (
    <div className={styles.page}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((current + 1) / exercises.length) * 100}%` }} />
      </div>

      {/* 大图片展示 */}
      <div className={styles.questionArea}>
        <span className={styles.questionEmoji}>{exercise.correct.emoji}</span>
        <p className={styles.questionText}>这是什么？</p>
      </div>

      {/* 文字选项 */}
      <div className={styles.optionsGrid}>
        {exercise.options.map((opt) => {
          let cls = styles.optionBtn
          if (selected === opt.id && opt.id === exercise.correct.id) cls += ` ${styles.correct}`
          else if (selected === opt.id) cls += ` ${styles.wrong}`
          else if (selected) cls += ` ${styles.disabled}`
          return (
            <button key={opt.id} className={cls} onClick={() => handleSelect(opt.id)}>
              <span className={styles.optionText}>{opt.en}</span>
            </button>
          )
        })}
      </div>

      {feedback === 'correct' && <div className={`${styles.feedback} ${styles.correct}`}>✅ 太棒了！{exercise.correct.en}</div>}
      {feedback === 'wrong' && <div className={`${styles.feedback} ${styles.wrong}`}>❌ 正确答案：{exercise.correct.en}</div>}

      {starAnim && (
        <div className={styles.starBurst}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ '--tx': `${(Math.random() - 0.5) * 200}px`, '--ty': `${(Math.random() - 0.5) * 200}px`, animationDelay: `${i * 0.05}s` } as React.CSSProperties}>⭐</span>
          ))}
        </div>
      )}
    </div>
  )
}
