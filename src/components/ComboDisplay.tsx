// 连击系统组件
import { useState, useEffect, useRef } from 'react'
import styles from './ComboDisplay.module.css'

interface Props {
  /** 当前连击数 */
  combo: number
  /** 最高连击记录 */
  maxCombo: number
}

export default function ComboDisplay({ combo, maxCombo }: Props) {
  const [displayCombo, setDisplayCombo] = useState(combo)
  const [shaking, setShaking] = useState(false)
  const prevCombo = useRef(combo)

  useEffect(() => {
    if (combo > 0) {
      setDisplayCombo(combo)
    }
    // 连击断裂检测
    if (combo < prevCombo.current && prevCombo.current >= 3) {
      setShaking(true)
      setTimeout(() => setShaking(false), 400)
    }
    prevCombo.current = combo
  }, [combo])

  if (displayCombo < 2) return null

  const scale = Math.min(1 + displayCombo * 0.06, 1.6)
  const color = displayCombo >= 10 ? 'var(--gold)' : displayCombo >= 5 ? 'var(--orange)' : 'var(--red)'

  return (
    <div className={`${styles.combo} ${shaking ? styles.shake : ''}`} style={{ transform: `scale(${scale})` }}>
      <span className={styles.fire}>🔥</span>
      <span className={styles.number} style={{ color }}>{displayCombo}x</span>
      {displayCombo >= maxCombo && maxCombo > 2 && (
        <span className={styles.newRecord}>NEW!</span>
      )}
    </div>
  )
}
