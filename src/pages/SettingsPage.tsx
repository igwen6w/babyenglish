// 设置页（占位）
import styles from './SettingsPage.module.css'

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>⚙️ 设置</h1>

      <div className={styles.section}>
        <div className={styles.item}>
          <span className={styles.itemIcon}>🔊</span>
          <span className={styles.itemLabel}>音效</span>
          <div className={styles.toggle} style={{ background: 'var(--green)' }}>
            <div className={styles.toggleKnob} style={{ transform: 'translateX(24px)' }}></div>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.itemIcon}>🎵</span>
          <span className={styles.itemLabel}>背景音乐</span>
          <div className={styles.toggle} style={{ background: 'var(--text-muted)' }}>
            <div className={styles.toggleKnob}></div>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.itemIcon}>🌙</span>
          <span className={styles.itemLabel}>深色模式</span>
          <div className={styles.toggle} style={{ background: 'var(--green)' }}>
            <div className={styles.toggleKnob} style={{ transform: 'translateX(24px)' }}></div>
          </div>
        </div>
      </div>

      <div className={styles.version}>
        BabyEnglish v0.1.0
      </div>
    </div>
  )
}
