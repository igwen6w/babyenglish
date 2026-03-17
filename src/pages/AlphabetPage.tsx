// 字母学习页（占位）
import styles from './AlphabetPage.module.css'

export default function AlphabetPage() {
  // 26个字母的占位列表
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🔤 字母学习</h1>
      <p className={styles.subtitle}>点击字母开始学习</p>

      <div className={styles.grid}>
        {letters.map((letter) => (
          <button
            key={letter}
            className={styles.letterBtn}
            style={{
              // 彩色渐变效果
              background: `hsl(${(letter.charCodeAt(0) - 65) * 14}, 70%, 55%)`
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}
