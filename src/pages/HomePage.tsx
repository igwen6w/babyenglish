// 首页 - 学习地图入口
import { useLearningStore } from '../store/learningStore'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { todayStudyTime, streakDays, learnedLetters } = useLearningStore()

  // 格式化学习时长
  const minutes = Math.floor(todayStudyTime / 60)

  return (
    <div className={styles.page}>
      {/* 欢迎区域 */}
      <section className={styles.hero}>
        <div className={styles.heroEmoji}>🦉</div>
        <h1 className={styles.heroTitle}>开始学习吧！</h1>
        <p className={styles.heroDesc}>选择一个模块，开始你的英语冒险</p>
      </section>

      {/* 学习模块卡片 */}
      <section className={styles.modules}>
        <a href="/alphabet" className={`${styles.card} ${styles.cardGreen}`}>
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
            <p className={styles.cardDesc}>颜色 · 动物 · 水果 · 数字</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>

        <a href="/practice" className={`${styles.card} ${styles.cardGold}`}>
          <span className={styles.cardIcon}>🎮</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>互动练习</h2>
            <p className={styles.cardDesc}>听音选图 · 看图选词 · 配对 · 翻牌</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>
      </section>

      {/* 学习进度 */}
      <section className={styles.progress}>
        <div className={styles.progressCard}>
          <span className={styles.progressIcon}>⭐</span>
          <div>
            <div className={styles.progressTitle}>今日学习</div>
            <div className={styles.progressValue}>{minutes} / 5 分钟</div>
          </div>
        </div>
        <div className={styles.progressCard}>
          <span className={styles.progressIcon}>🔥</span>
          <div>
            <div className={styles.progressTitle}>连续学习</div>
            <div className={styles.progressValue}>{streakDays || 1} 天</div>
          </div>
        </div>
      </section>
    </div>
  )
}
