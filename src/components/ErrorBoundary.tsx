// 错误边界 - 捕获 React 渲染错误，显示友好提示
import React from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.icon}>😵</div>
            <h2 className={styles.title}>哎呀，出错了</h2>
            <p className={styles.desc}>页面遇到了一些问题，请点击下方按钮重试。</p>
            <button className={styles.retryBtn} onClick={this.handleRetry}>
              🔄 重试
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
