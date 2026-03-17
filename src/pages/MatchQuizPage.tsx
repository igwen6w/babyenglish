// 拖拽配对 - 左侧图片，右侧英文，点击配对
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './quiz.module.css'
import { generateMatchPairs, type TopicKey, type ItemData } from '../data/exercises'
import { playCorrect, playWrong, playComplete } from '../utils/sound'
import { speak } from '../utils/speech'
import { useLearningStore } from '../store/learningStore'

const PAIR_COUNT = 6

export default function MatchQuizPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const topic = (searchParams.get('topic') || 'animals') as TopicKey
  const addPracticeRecord = useLearningStore((s) => s.addPracticeRecord)
  const addStudyTime = useLearningStore((s) => s.addStudyTime)

  const { left, right } = generateMatchPairs(topic, PAIR_COUNT)
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set())
  const [selectedLeft, setSelectedLeft] = useState<ItemData | null>(null)
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [errorCount, setErrorCount] = useState(0)

  const totalPairs = left.length
  const isComplete = matchedIds.size === totalPairs

  // 配对成功时播放发音
  useEffect(() => {
    if (matchedIds.size > 0 && !isComplete) {
      const lastMatched = left.find((item) => matchedIds.has(item.id))
      if (lastMatched) speak(lastMatched.en)
    }
  }, [matchedIds.size])

  useEffect(() => {
    if (isComplete) {
      playComplete()
      const score = Math.max(0, Math.round(((totalPairs) / (totalPairs + errorCount)) * 100))
      const stars = errorCount === 0 ? 3 : errorCount <= 2 ? 2 : 1
      addPracticeRecord({ type: 'match', topic, score, stars, correct: totalPairs, total: totalPairs + errorCount, date: new Date().toISOString().slice(0, 10) })
      addStudyTime(60)
      navigate(`/practice/match/result?topic=${topic}&correct=${totalPairs}&total=${totalPairs + errorCount}`, { replace: true })
    }
  }, [isComplete])

  const handleLeftSelect = useCallback((item: ItemData) => {
    if (matchedIds.has(item.id)) return
    setSelectedLeft(item)
  }, [matchedIds])

  const handleRightSelect = useCallback((item: ItemData) => {
    if (!selectedLeft || matchedIds.has(item.id)) return
    if (selectedLeft.id === item.id) {
      // 配对成功
      playCorrect()
      setMatchedIds((s) => new Set([...s, item.id]))
    } else {
      // 配对失败
      playWrong()
      setErrorCount((c) => c + 1)
      setWrongPair(item.id)
      setTimeout(() => setWrongPair(null), 500)
    }
    setSelectedLeft(null)
  }, [selectedLeft, matchedIds])

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>🔗 拖拽配对</h1>
      <p className={styles.questionText} style={{ textAlign: 'center', marginBottom: 16 }}>
        先点左边图片，再点右边单词配对
      </p>

      <div className={styles.matchContainer}>
        {/* 左侧 - emoji 列表 */}
        <div className={styles.matchColumn}>
          {left.map((item) => {
            let cls = styles.matchItem
            if (matchedIds.has(item.id)) cls += ` ${styles.matched}`
            else if (selectedLeft?.id === item.id) cls += ` ${styles.selected}`
            return (
              <div key={item.id} className={cls} onClick={() => handleLeftSelect(item)}>
                <span className={styles.itemEmoji}>{item.emoji}</span>
              </div>
            )
          })}
        </div>

        {/* 右侧 - 英文单词列表（乱序） */}
        <div className={styles.matchColumn}>
          {right.map((item) => {
            let cls = styles.matchItem
            if (matchedIds.has(item.id)) cls += ` ${styles.matched}`
            else if (wrongPair === item.id) cls += ` ${styles.wrong}`
            return (
              <div key={`right-${item.id}`} className={cls} onClick={() => handleRightSelect(item)}>
                <span className={styles.itemText}>{item.en}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
