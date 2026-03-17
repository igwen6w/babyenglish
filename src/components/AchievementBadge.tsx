// 成就徽章系统
import { useState } from 'react'
import Confetti from './Confetti'
import styles from './AchievementBadge.module.css'
import { useLearningStore } from '../store/learningStore'

export interface Achievement {
  id: string
  name: string
  desc: string
  emoji: string
  /** 检查是否已达成（从 store 推断） */
  check: () => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_practice', name: '初出茅庐', desc: '完成第一次练习', emoji: '🌱', check: () => { const s = useLearningStore.getState(); return s.practiceRecords.length > 0 } },
  { id: 'streak_3', name: '坚持不懈', desc: '连续学习 3 天', emoji: '🔥', check: () => useLearningStore.getState().streakDays >= 3 },
  { id: 'streak_7', name: '一周达人', desc: '连续学习 7 天', emoji: '⚡', check: () => useLearningStore.getState().streakDays >= 7 },
  { id: 'learn_10_letters', name: '字母新星', desc: '学会 10 个字母', emoji: '🔤', check: () => useLearningStore.getState().learnedLetters.length >= 10 },
  { id: 'learn_all_letters', name: '字母大师', desc: '学会所有 26 个字母', emoji: '👑', check: () => useLearningStore.getState().learnedLetters.length >= 26 },
  { id: 'stars_10', name: '十星闪耀', desc: '累计获得 10 颗星', emoji: '⭐', check: () => useLearningStore.getState().totalStars >= 10 },
  { id: 'stars_30', name: '三十而立', desc: '累计获得 30 颗星', emoji: '🌟', check: () => useLearningStore.getState().totalStars >= 30 },
  { id: 'perfect', name: '完美通关', desc: '练习全部答对一次', emoji: '💎', check: () => { const s = useLearningStore.getState(); return s.practiceRecords.some(r => r.correct === r.total && r.total > 0) } },
  { id: 'level_5', name: '小学徒', desc: '达到等级 5', emoji: '🎓', check: () => useLearningStore.getState().level >= 5 },
  { id: 'level_10', name: '大学者', desc: '达到等级 10', emoji: '🏅', check: () => useLearningStore.getState().level >= 10 },
]

const UNLOCKED_KEY = 'baby-english-achievements'

export function getUnlocked(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '[]'))
}

function saveUnlocked(set: Set<string>) {
  localStorage.setItem(UNLOCKED_KEY, JSON.stringify([...set]))
}

export function checkAchievements(): string[] {
  const unlocked = getUnlocked()
  const newly: string[] = []
  for (const a of ACHIEVEMENTS) {
    if (!unlocked.has(a.id) && a.check()) {
      unlocked.add(a.id)
      newly.push(a.id)
    }
  }
  if (newly.length) saveUnlocked(unlocked)
  return newly
}

// 弹窗组件：获得新成就时显示
export function AchievementPopup({ achievementId, onClose }: { achievementId: string; onClose: () => void }) {
  const a = ACHIEVEMENTS.find(x => x.id === achievementId)
  if (!a) return null
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <Confetti active />
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <div className={styles.popupEmoji}>{a.emoji}</div>
        <div className={styles.popupLabel}>🏆 新成就！</div>
        <div className={styles.popupName}>{a.name}</div>
        <div className={styles.popupDesc}>{a.desc}</div>
        <button className={styles.popupBtn} onClick={onClose}>太棒了！🎉</button>
      </div>
    </div>
  )
}

// 成就列表展示（嵌入首页或设置页）
export default function AchievementBadge() {
  const unlocked = getUnlocked()
  const [all] = useState(ACHIEVEMENTS)

  return (
    <div className={styles.grid}>
      {all.map(a => (
        <div key={a.id} className={`${styles.badge} ${unlocked.has(a.id) ? styles.unlocked : styles.locked}`}>
          <span className={styles.badgeEmoji}>{unlocked.has(a.id) ? a.emoji : '🔒'}</span>
          <span className={styles.badgeName}>{a.name}</span>
          <span className={styles.badgeDesc}>{a.desc}</span>
        </div>
      ))}
    </div>
  )
}
