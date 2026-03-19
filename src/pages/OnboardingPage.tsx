// 首次使用引导页面 - 3-4 步滑动引导
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './OnboardingPage.module.css'

const ONBOARDING_KEY = 'babyenglish_onboarded'

const steps = [
  {
    emoji: '🦉',
    title: '欢迎来到 BabyEnglish！',
    desc: '嗨！我是猫头鹰老师，让我带你开启英语学习之旅吧！',
    bg: 'var(--green)',
  },
  {
    emoji: '🌍',
    title: '选择学习语言',
    desc: '目前支持英语学习，更多语言即将上线！',
    bg: 'var(--blue)',
  },
  {
    emoji: '🎯',
    title: '设置每日目标',
    desc: '每天坚持学习，养成良好的学习习惯！',
    bg: 'var(--gold)',
  },
  {
    emoji: '🚀',
    title: '开始学习吧！',
    desc: '准备好了吗？让我们一起学习英语！',
    bg: 'var(--purple)',
  },
]

interface OnboardingPageProps {
  onFinish?: () => void
}

export default function OnboardingPage({ onFinish }: OnboardingPageProps) {
  const [step, setStep] = React.useState(0)
  const [dailyGoal, setDailyGoal] = React.useState(10)
  const navigate = useNavigate()

  // 已完成引导则跳过
  React.useEffect(() => {
    if (localStorage.getItem(ONBOARDING_KEY)) {
      navigate('/', { replace: true })
    }
  }, [])

  const handleFinish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    localStorage.setItem('babyenglish_daily_goal', String(dailyGoal))
    onFinish?.()
  }

  const next = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      handleFinish()
    }
  }

  const prev = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const s = steps[step]
  if (!s) return null

  return (
    <div className={styles.container}>
      {/* 进度条 */}
      <div className={styles.progress}>
        {steps.map((_, i) => (
          <div key={i} className={`${styles.dot} ${i <= step ? styles.dotActive : ''}`} />
        ))}
      </div>

      {/* 内容区 */}
      <div className={styles.content}>
        <div className={styles.emoji} style={{ background: s.bg }}>{s.emoji}</div>
        <h1 className={styles.title}>{s.title}</h1>
        <p className={styles.desc}>{s.desc}</p>

        {/* 每日目标选择（第3步） */}
        {step === 2 && (
          <div className={styles.goalOptions}>
            {[5, 10, 15].map(min => (
              <button
                key={min}
                className={`${styles.goalBtn} ${dailyGoal === min ? styles.goalActive : ''}`}
                onClick={() => setDailyGoal(min)}
                style={dailyGoal === min ? { background: s.bg } : {}}
              >
                <span className={styles.goalNum}>{min}</span>
                <span className={styles.goalLabel}>分钟/天</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 操作区 */}
      <div className={styles.footer}>
        {step > 0 && (
          <button className={styles.skipBtn} onClick={prev}>← 返回</button>
        )}
        {step < steps.length - 1 && (
          <button className={styles.skipBtn} onClick={handleFinish}>跳过</button>
        )}
        <button className={styles.nextBtn} onClick={next} style={{ background: s.bg }}>
          {step === steps.length - 1 ? '开始学习！ 🎉' : '下一步 →'}
        </button>
      </div>
    </div>
  )
}


