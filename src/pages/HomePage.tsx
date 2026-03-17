// 首页 - 改版版（游戏化系统）
import { useLearningStore } from '../store/learningStore'
import Confetti from '../components/Confetti'
import AchievementBadge, { checkAchievements, AchievementPopup } from '../components/AchievementBadge'
import { useState, useEffect } from 'react'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { level, currentXp, neededXp, totalXp, streakDays, learnedLetters, learnedWords,
    dailyGoals, totalStars, maxCombo, claimDailyReward } = useLearningStore()

  const [showConfetti, setShowConfetti] = useState(false)
  const [newAchievement, setNewAchievement] = useState<string | null>(null)
  const [showBadges, setShowBadges] = useState(false)

  const xpPercent = Math.round((currentXp / neededXp) * 100)
  const minutes = Math.floor(dailyGoals.studyMinutes || 0)

  // 每日目标进度
  const goals = [
    { label: '答题', current: dailyGoals.questionsAnswered, target: 5, emoji: '✏️' },
    { label: '新词', current: dailyGoals.newWordsLearned, target: 3, emoji: '📖' },
    { label: '分钟', current: minutes, target: 5, emoji: '⏱️' },
  ]
  const allGoalsDone = goals.every(g => g.current >= g.target) && !dailyGoals.completed

  // 检查成就
  useEffect(() => {
    const newOnes = checkAchievements()
    if (newOnes.length > 0) {
      setNewAchievement(newOnes[0]!)
    }
  }, [totalStars, streakDays, learnedLetters.length, level, totalXp])

  const handleClaimReward = () => {
    const xp = claimDailyReward()
    if (xp > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2500)
    }
  }

  const goalRingPercent = Math.round((goals.filter(g => g.current >= g.target).length / goals.length) * 100)

  return (
    <div className={styles.page}>
      <Confetti active={showConfetti} />

      {newAchievement && <AchievementPopup achievementId={newAchievement} onClose={() => setNewAchievement(null)} />}

      {/* 顶部：头像 + 等级 + XP */}
      <section className={styles.profile}>
        <div className={styles.profileRow}>
          <span className={styles.avatar}>🦉</span>
          <div className={styles.profileInfo}>
            <div className={styles.levelBadge}>Lv.{level}</div>
            <div className={styles.xpText}>{totalXp} XP</div>
          </div>
        </div>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${xpPercent}%` }} />
        </div>
      </section>

      {/* 继续学习按钮 */}
      <a href="/map" className={styles.continueBtn}>
        继续学习 ▶
      </a>

      {/* 每日目标 */}
      <section className={styles.dailySection}>
        <div className={styles.sectionTitle}>📋 今日目标</div>
        <div className={styles.goalsRow}>
          {/* 圆形进度环 */}
          <div className={styles.ringWrapper}>
            <svg className={styles.ring} viewBox="0 0 80 80">
              <circle className={styles.ringBg} cx="40" cy="40" r="34" />
              <circle className={styles.ringFill} cx="40" cy="40" r="34"
                style={{ strokeDasharray: `${2 * Math.PI * 34}`, strokeDashoffset: `${2 * Math.PI * 34 * (1 - goalRingPercent / 100)}` }} />
            </svg>
            <div className={styles.ringText}>{goals.filter(g => g.current >= g.target).length}/{goals.length}</div>
          </div>
          <div className={styles.goalItems}>
            {goals.map(g => (
              <div key={g.label} className={`${styles.goalItem} ${g.current >= g.target ? styles.goalDone : ''}`}>
                <span>{g.emoji}</span>
                <span>{g.current}/{g.target}</span>
                <span className={styles.goalLabel}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
        {allGoalsDone && (
          <button className={styles.claimBtn} onClick={handleClaimReward}>领取奖励 +20 XP 🎁</button>
        )}
        {dailyGoals.completed && (
          <div className={styles.claimed}>✅ 奖励已领取</div>
        )}
      </section>

      {/* 快速统计 */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>🔥</span>
          <div className={styles.statValue}>{streakDays || 1}</div>
          <div className={styles.statLabel}>连续天数</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⚡</span>
          <div className={styles.statValue}>{maxCombo}</div>
          <div className={styles.statLabel}>最高连击</div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⭐</span>
          <div className={styles.statValue}>{totalStars}</div>
          <div className={styles.statLabel}>总星星</div>
        </div>
      </section>

      {/* 学习模块入口 */}
      <section className={styles.modules}>
        <div className={styles.sectionTitle}>📚 学习模块</div>
        <a href="/map" className={`${styles.card} ${styles.cardGreen}`}>
          <span className={styles.cardIcon}>🗺️</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>关卡地图</h2>
            <p className={styles.cardDesc}>跟随路径闯关学习</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>
        <a href="/alphabet" className={`${styles.card} ${styles.cardBlue}`}>
          <span className={styles.cardIcon}>🔤</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>字母学习</h2>
            <p className={styles.cardDesc}>{learnedLetters.length} / 26 个字母</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>
        <a href="/topics" className={`${styles.card} ${styles.cardBlue}`}>
          <span className={styles.cardIcon}>📚</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>主题词汇</h2>
            <p className={styles.cardDesc}>{learnedWords.length} 个词汇</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>
        <a href="/practice" className={`${styles.card} ${styles.cardGold}`}>
          <span className={styles.cardIcon}>🎮</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>互动练习</h2>
            <p className={styles.cardDesc}>听音 · 看图 · 配对 · 翻牌</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>
      </section>

      {/* 成就徽章 */}
      <section className={styles.badgeSection}>
        <button className={styles.badgeToggle} onClick={() => setShowBadges(!showBadges)}>
          {showBadges ? '收起成就 ▲' : '查看成就 ▼'}
        </button>
        {showBadges && <AchievementBadge />}
      </section>
    </div>
  )
}
