// 角色引导系统 - 猫头鹰引导组件
import { useState, useEffect } from 'react'
import styles from './Guide.module.css'

// 鼓励语列表
const CORRECT_PHRASES = ['太棒了！🎉', '你真聪明！🧠', '完美！✨', '答对了！👏', '真厉害！💪']
const WRONG_PHRASES = ['没关系，再试一次！😊', '加油！💪', '你可以的！🌟', '差一点点！🎯']
const COMPLETE_PHRASES = ['太厉害了！🏆', '你学得真快！🚀', '太优秀了！⭐', '了不起！🎓']

type PhraseType = 'correct' | 'wrong' | 'complete'

interface Props {
  type?: PhraseType
  /** 显示时长(ms)，0=需要手动关闭 */
  duration?: number
  /** 点击关闭回调 */
  onClose?: () => void
}

/** 随机选一句 */
function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 引导气泡是否已看过（首次使用引导） */
const GUIDE_KEY = 'baby-english-guide-seen'

export function showGuideOnce() {
  const seen = localStorage.getItem(GUIDE_KEY)
  return !seen
}

export function markGuideSeen() {
  localStorage.setItem(GUIDE_KEY, '1')
}

export default function Guide({ type = 'correct', duration = 1500, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!type) return
    const phrases = type === 'correct' ? CORRECT_PHRASES : type === 'wrong' ? WRONG_PHRASES : COMPLETE_PHRASES
    setText(pick(phrases) || '')
    setVisible(true)
    if (duration > 0) {
      const t = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(t)
    }
  }, [type, duration, onClose])

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={() => { setVisible(false); onClose?.() }}>
      <div className={styles.guide} onClick={(e) => e.stopPropagation()}>
        <div className={styles.owl}>🦉</div>
        <div className={styles.bubble}>
          <span className={styles.bubbleText}>{text}</span>
        </div>
        <div className={styles.bubbleTail} />
      </div>
    </div>
  )
}

/** 首次进入页面的引导组件 */
export function WelcomeGuide() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (showGuideOnce()) {
      const t = setTimeout(() => setShow(true), 500)
      return () => clearTimeout(t)
    }
  }, [])

  if (!show) return null

  return (
    <div className={styles.overlay} onClick={() => { setShow(false); markGuideSeen() }}>
      <div className={styles.welcomeGuide}>
        <div className={styles.welcomeOwl}>🦉</div>
        <div className={styles.welcomeBubble}>
          <p className={styles.welcomeTitle}>欢迎来到英语冒险！</p>
          <p className={styles.welcomeDesc}>跟着关卡地图，一步步学完字母和单词吧！</p>
          <button className={styles.welcomeBtn} onClick={() => { setShow(false); markGuideSeen() }}>
            开始学习！🚀
          </button>
        </div>
      </div>
    </div>
  )
}
