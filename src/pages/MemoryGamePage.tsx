// 记忆翻牌游戏 - 经典配对记忆
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './quiz.module.css'
import { generateMemoryCards, type MemoryCard, type TopicKey } from '../data/exercises'
import { playCorrect, playComplete } from '../utils/sound'
import { useLearningStore } from '../store/learningStore'

const CARD_COUNT = 6 // 6对 = 12张卡

export default function MemoryGamePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const topic = (searchParams.get('topic') || 'animals') as TopicKey
  const addPracticeRecord = useLearningStore((s) => s.addPracticeRecord)
  const addStudyTime = useLearningStore((s) => s.addStudyTime)

  const [cards] = useState<MemoryCard[]>(() => generateMemoryCards(topic, CARD_COUNT))
  const [flipped, setFlipped] = useState<Set<string>>(new Set())
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [steps, setSteps] = useState(0)
  const [lockBoard, setLockBoard] = useState(false)
  const [firstCard, setFirstCard] = useState<MemoryCard | null>(null)

  const totalPairs = cards.length / 2
  const isComplete = matched.size === cards.length

  useEffect(() => {
    if (isComplete) {
      playComplete()
      const score = Math.max(0, Math.round((totalPairs / steps) * 100))
      const stars = steps <= totalPairs + 2 ? 3 : steps <= totalPairs + 6 ? 2 : 1
      addPracticeRecord({ type: 'memory', topic, score, stars, correct: totalPairs, total: steps, date: new Date().toISOString().slice(0, 10) })
      addStudyTime(60)
      navigate(`/practice/memory/result?topic=${topic}&correct=${totalPairs}&total=${steps}`, { replace: true })
    }
  }, [isComplete])

  const handleFlip = useCallback(
    (card: MemoryCard) => {
      if (lockBoard || flipped.has(card.id) || matched.has(card.id)) return

      const newFlipped = new Set(flipped)
      newFlipped.add(card.id)
      setFlipped(newFlipped)

      if (!firstCard) {
        setFirstCard(card)
        return
      }

      // 第二张卡
      setSteps((s) => s + 1)
      setLockBoard(true)

      if (firstCard.pairId === card.pairId) {
        // 匹配成功
        playCorrect()
        const newMatched = new Set(matched)
        newMatched.add(firstCard.id)
        newMatched.add(card.id)
        setMatched(newMatched)
        setFirstCard(null)
        setFlipped(new Set())
        setLockBoard(false)
      } else {
        // 不匹配，翻回去
        setTimeout(() => {
          setFlipped(new Set())
          setFirstCard(null)
          setLockBoard(false)
        }, 800)
      }
    },
    [flipped, matched, firstCard, lockBoard]
  )

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>🃏 记忆翻牌</h1>

      {/* 统计 */}
      <div className={styles.memoryStats}>
        <span>🎯 步数：{steps}</span>
        <span>✅ 配对：{matched.size / 2} / {totalPairs}</span>
      </div>

      {/* 卡片网格 */}
      <div className={styles.memoryGrid}>
        {cards.map((card) => {
          const isFlipped = flipped.has(card.id)
          const isMatched = matched.has(card.id)

          if (isFlipped || isMatched) {
            return (
              <div key={card.id} className={`${styles.memoryCard} ${styles.memoryCardFront} ${isMatched ? styles.matched : ''}`}>
                {card.content}
              </div>
            )
          }
          return (
            <div key={card.id} className={`${styles.memoryCard} ${styles.memoryCardBack}`} onClick={() => handleFlip(card)}>
              ❓
            </div>
          )
        })}
      </div>
    </div>
  )
}
