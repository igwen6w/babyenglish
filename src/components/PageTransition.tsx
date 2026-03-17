// 页面转场动画组件 - 方向感知的滑入滑出效果
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './PageTransition.module.css'

type TransitionDir = 'none' | 'forward' | 'back' | 'enter'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionType, setTransitionType] = useState<TransitionDir>('none')
  const historyLenRef = useRef(0)

  useEffect(() => {
    if (historyLenRef.current === 0) {
      historyLenRef.current = window.history.length
      setDisplayChildren(children)
      return
    }

    const newLen = window.history.length
    const goingBack = newLen < historyLenRef.current
    historyLenRef.current = newLen

    const dir: TransitionDir = goingBack ? 'back' : 'forward'
    setTransitionType(dir)

    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setTransitionType('enter')
      const timer2 = setTimeout(() => {
        setTransitionType('none')
      }, 300)
      return () => clearTimeout(timer2)
    }, 0)

    return () => clearTimeout(timer)
  }, [location.pathname, children])

  const cls = [
    styles.wrapper,
    transitionType === 'forward' && styles.exitLeft,
    transitionType === 'back' && styles.exitRight,
    transitionType === 'enter' && styles.enter,
  ].filter(Boolean).join(' ')

  return <div className={cls}>{displayChildren}</div>
}
