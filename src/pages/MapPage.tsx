// 关卡地图页面 - 多邻国风格学习路径
import { useNavigate } from 'react-router-dom'
import { useLearningStore } from '../store/learningStore'
import { useMemo } from 'react'
import styles from './MapPage.module.css'

// 关卡定义
interface LevelNode {
  id: number
  title: string
  emoji: string
  type: 'letters' | 'topic'
  /** 关联的路由或字母范围 */
  route: string
  description: string
}

const LEVELS: LevelNode[] = [
  { id: 1, title: 'ABC', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'A B C' },
  { id: 2, title: 'DEF', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'D E F' },
  { id: 3, title: 'GHI', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'G H I' },
  { id: 4, title: 'JKL', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'J K L' },
  { id: 5, title: 'MNO', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'M N O' },
  { id: 6, title: 'PQR', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'P Q R' },
  { id: 7, title: 'STU', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'S T U' },
  { id: 8, title: 'VWX', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'V W X' },
  { id: 9, title: 'YZ', emoji: '🔤', type: 'letters', route: '/alphabet', description: 'Y Z' },
  { id: 10, title: '颜色', emoji: '🎨', type: 'topic', route: '/topics/colors', description: '学习颜色单词' },
  { id: 11, title: '数字', emoji: '🔢', type: 'topic', route: '/topics/numbers', description: '学习数字单词' },
  { id: 12, title: '动物', emoji: '🐾', type: 'topic', route: '/topics/animals', description: '学习动物单词' },
  { id: 13, title: '水果', emoji: '🍎', type: 'topic', route: '/topics/fruits', description: '学习水果单词' },
  { id: 14, title: '字母复习', emoji: '📝', type: 'topic', route: '/practice/listening', description: '听力练习' },
  { id: 15, title: '看图选词', emoji: '🖼️', type: 'topic', route: '/practice/image', description: '图片练习' },
  { id: 16, title: '配对挑战', emoji: '🧩', type: 'topic', route: '/practice/match', description: '配对游戏' },
  { id: 17, title: '记忆翻牌', emoji: '🃏', type: 'topic', route: '/practice/memory', description: '翻牌记忆' },
  { id: 18, title: '综合练习', emoji: '🏆', type: 'topic', route: '/practice', description: '全部类型' },
]

export default function MapPage() {
  const navigate = useNavigate()
  const { level, totalXp, currentXp, neededXp, levelProgress, streakDays } = useLearningStore()
  const progressPercent = Math.round((currentXp / neededXp) * 100)

  // 计算每个关卡状态
  const nodeStatuses = useMemo(() => {
    const completedIds = new Set(levelProgress.filter(l => l.completed).map(l => l.id))
    const starsMap = new Map(levelProgress.map(l => [l.id, l.stars]))

    return LEVELS.map((node, i) => {
      const completed = completedIds.has(node.id)
      const unlocked = i === 0 || completedIds.has(LEVELS[i - 1]?.id ?? -1)
      return {
        ...node,
        completed,
        unlocked,
        stars: starsMap.get(node.id) || 0,
      }
    })
  }, [levelProgress])

  const handleLevelClick = (node: typeof nodeStatuses[0]) => {
    if (!node.unlocked || node.completed) return
    navigate(node.route)
  }

  // 蜿蜒路径的节点位置 - 交替左右偏移
  const getNodeOffset = (index: number) => {
    const pattern = index % 4
    if (pattern === 0) return 0
    if (pattern === 1) return 30
    if (pattern === 2) return 0
    return -30
  }

  return (
    <div className={styles.page}>
      {/* 顶部状态栏 */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.avatar}>🦉</span>
          <div>
            <div className={styles.headerLevel}>Lv.{level}</div>
            <div className={styles.headerXp}>{totalXp} XP</div>
          </div>
        </div>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${progressPercent}%` }} />
        </div>
        <div className={styles.streak}>🔥 {streakDays}天</div>
      </div>

      {/* 关卡路径 */}
      <div className={styles.path}>
        {nodeStatuses.map((node, i) => (
          <div key={node.id}>
            {/* 连线 */}
            {i > 0 && (
              <div className={styles.connector}>
                <svg width="100" height="60" viewBox="0 0 100 60" className={styles.connectorSvg}>
                  <path
                    d={`M 50 0 C 50 30, ${50 - getNodeOffset(i) + getNodeOffset(i - 1)} 30, ${50 - getNodeOffset(i)} 60`}
                    stroke={node.unlocked || node.completed ? 'var(--green)' : 'var(--bg-card-hover)'}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            {/* 节点 */}
            <div
              className={`${styles.node} ${node.completed ? styles.completed : node.unlocked ? styles.active : styles.locked}`}
              style={{ marginLeft: `${getNodeOffset(i)}px`, marginRight: `${-getNodeOffset(i)}px` }}
              onClick={() => handleLevelClick(node)}
            >
              <div className={styles.nodeCircle}>
                {node.completed ? (
                  <span className={styles.check}>✓</span>
                ) : node.unlocked ? (
                  <span className={styles.nodeEmoji}>{node.emoji}</span>
                ) : (
                  <span className={styles.lock}>🔒</span>
                )}
              </div>
              <div className={styles.stars}>
                {[1, 2, 3].map(s => (
                  <span key={s} className={`${styles.star} ${s <= node.stars ? styles.starFilled : ''}`}>⭐</span>
                ))}
              </div>
              <div className={styles.nodeTitle}>{node.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
