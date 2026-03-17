// 五彩纸屑动画组件 - 纯 CSS/JS 实现
import { useEffect, useRef, useState } from 'react'
import styles from './Confetti.module.css'

interface Props {
  active: boolean
  duration?: number
}

/** 颜色池 */
const COLORS = ['#FF4B4B', '#58CC02', '#1CB0F6', '#FFC800', '#CE82FF', '#FF9600', '#FF69B4', '#00FFD4'] as const

export default function Confetti({ active, duration = 2500 }: Props) {
  const [pieces, setPieces] = useState<Array<{ id: number; color: string; left: number; delay: number; size: number; rotation: number }>>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (active) {
      const p = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
      }))
      setPieces(p)
      timerRef.current = setTimeout(() => setPieces([]), duration)
      return () => clearTimeout(timerRef.current)
    }
    return undefined
  }, [active, duration])

  if (!pieces.length) return null

  return (
    <div className={styles.container}>
      {pieces.map((p) => (
        <div
          key={p.id}
          className={styles.piece}
          style={{
            backgroundColor: p.color,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            '--rotation': `${p.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
