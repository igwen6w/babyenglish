// 首页 - 学习地图入口
import styles from './HomePage.module.css'

export default function HomePage() {
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
            <p className={styles.cardDesc}>学习 26 个英文字母</p>
          </div>
          <span className={styles.cardArrow}>▶</span>
        </a>

        <div className={`${styles.card} ${styles.cardBlue}`} style={{ opacity: 0.6 }}>
          <span className={styles.cardIcon}>📚</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>主题词汇</h2>
            <p className={styles.cardDesc}>即将开放</p>
          </div>
          <span className={styles.cardArrow}>🔒</span>
        </div>

        <div className={`${styles.card} ${styles.cardGold}`} style={{ opacity: 0.6 }}>
          <span className={styles.cardIcon}>🎮</span>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>互动练习</h2>
            <p className={styles.cardDesc}>即将开放</p>
          </div>
          <span className={styles.cardArrow}>🔒</span>
        </div>
      </section>

      {/* 学习进度 */}
      <section className={styles.progress}>
        <div className={styles.progressCard}>
          <span className={styles.progressIcon}>⭐</span>
          <div>
            <div className={styles.progressTitle}>今日学习</div>
            <div className={styles.progressValue}>0 / 5 分钟</div>
          </div>
        </div>
        <div className={styles.progressCard}>
          <span className={styles.progressIcon}>🔥</span>
          <div>
            <div className={styles.progressTitle}>连续学习</div>
            <div className={styles.progressValue}>1 天</div>
          </div>
        </div>
      </section>
    </div>
  )
}
