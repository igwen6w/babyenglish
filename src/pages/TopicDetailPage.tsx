// 主题词汇详情页
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import colorsData from '../data/colors'
import animalsData from '../data/animals'
import fruitsData from '../data/fruits'
import numbersData from '../data/numbers'
import { speak } from '../utils/speech'
import { useLearningStore } from '../store/learningStore'
import styles from './TopicPage.module.css'

// 主题数据映射
const topicMap: Record<string, { items: { id: string; en: string; zh: string; emoji: string; example?: string }[]; name: string }> = {
  colors: { items: colorsData, name: '颜色' },
  animals: { items: animalsData, name: '动物' },
  fruits: { items: fruitsData, name: '水果' },
  numbers: { items: numbersData, name: '数字' },
}

// "hex" 类型兼容
type ItemLike = { id: string; en: string; zh: string; emoji: string; example?: string; hex?: string }

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const learnedWords = useLearningStore((s) => s.learnedWords)
  const markWordLearned = useLearningStore((s) => s.markWordLearned)

  const [selected, setSelected] = useState<ItemLike | null>(null)

  const topic = topicMap[topicId || '']
  if (!topic) return <div>主题未找到</div>

  const items = topic.items as ItemLike[]
  const progress = items.filter((i) => learnedWords.includes(i.id)).length

  // 点击词汇卡片
  const handleSelect = (item: ItemLike) => {
    setSelected(item)
    markWordLearned(item.id)
    speak(item.en)
  }

  // 触摸滑动支持
  const [touchStart, setTouchStart] = useState(0)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0]?.clientX ?? 0)
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - (e.changedTouches[0]?.clientX ?? 0)
    if (!selected) return
    const idx = items.findIndex((i) => i.id === selected.id)
    if (Math.abs(diff) > 60) {
      const target = diff > 0 ? idx + 1 : idx - 1
      if (target >= 0 && target < items.length) setSelected(items[target]!)
    }
  }

  return (
    <div className={styles.detailPage} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button className={styles.backBtn} onClick={() => navigate('/topics')}>
        ← 返回主题列表
      </button>

      <h1 className={styles.detailTitle}>{topic.name}</h1>

      {/* 进度条 */}
      <div className={styles.progress}>
        <div className={styles.progressText}>已学习 {progress} / {items.length}</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(progress / items.length) * 100}%` }} />
        </div>
      </div>

      {selected ? (
        /* 词汇详情弹层 */
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalEmoji}>{selected.emoji}</div>
            <div className={styles.modalEn}>{selected.en}</div>
            <div className={styles.modalZh}>{selected.zh}</div>
            {selected.hex && (
              <div className={styles.colorSwatch} style={{ background: selected.hex }} />
            )}
            {selected.example && (
              <div className={styles.modalExample}>{selected.example}</div>
            )}
            <button className={styles.speakBtn} onClick={() => speak(selected.en)}>
              🔊 发音
            </button>
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>
              关闭
            </button>
          </div>
        </div>
      ) : (
        /* 词汇网格 */
        <div className={styles.wordGrid}>
          {items.map((item) => {
            const learned = learnedWords.includes(item.id)
            return (
              <button
                key={item.id}
                className={`${styles.wordCard} ${learned ? styles.wordLearned : ''}`}
                onClick={() => handleSelect(item)}
              >
                <span className={styles.wordEmoji}>{item.emoji}</span>
                <span className={styles.wordEn}>{item.en}</span>
                <span className={styles.wordZh}>{item.zh}</span>
                {learned && <span className={styles.wordCheck}>✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
