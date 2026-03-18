// 全局 Loading 组件 - 页面切换时的加载指示器 + 骨架屏
import styles from './Loading.module.css'

interface LoadingProps {
  full?: boolean  // 全屏覆盖
}

export function Loading({ full = false }: LoadingProps) {
  return (
    <div className={`${styles.container} ${full ? styles.full : ''}`}>
      <div className={styles.spinner} />
      <p className={styles.text}>加载中...</p>
    </div>
  )
}

/** 骨架屏 - 简单实现 */
export function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.skeleton}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonItem} style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  )
}
