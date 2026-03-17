// 应用主布局：顶部栏 + 内容区 + 底部导航
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>🌟 BabyEnglish</div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItem}>🏠<span>首页</span></a>
        <a href="/alphabet" className={styles.navItem}>🔤<span>字母</span></a>
        <a href="/settings" className={styles.navItem}>⚙️<span>设置</span></a>
      </nav>
    </div>
  )
}
