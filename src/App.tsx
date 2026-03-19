// 应用路由配置
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import PageTransition from './components/PageTransition'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import AlphabetPage from './pages/AlphabetPage'
import AlphabetDetailPage from './pages/AlphabetDetailPage'
import TopicPage from './pages/TopicPage'
import TopicDetailPage from './pages/TopicDetailPage'
import SettingsPage from './pages/SettingsPage'
import PracticePage from './pages/PracticePage'
import ListeningQuizPage from './pages/ListeningQuizPage'
import ImageQuizPage from './pages/ImageQuizPage'
import MatchQuizPage from './pages/MatchQuizPage'
import MemoryGamePage from './pages/MemoryGamePage'
import QuizResultPage from './pages/QuizResultPage'
import MapPage from './pages/MapPage'
import OnboardingPage from './pages/OnboardingPage'

const ONBOARDING_KEY = 'babyenglish_onboarded'

function App() {
  const [onboarded, setOnboarded] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    setOnboarded(!!localStorage.getItem(ONBOARDING_KEY))
  }, [])

  // 等待引导状态检查完成
  if (onboarded === null) return null

  // 未完成引导，显示引导页
  if (!onboarded) {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<OnboardingPage onFinish={() => setOnboarded(true)} />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppLayout>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/alphabet" element={<AlphabetPage />} />
              <Route path="/alphabet/:letter" element={<AlphabetDetailPage />} />
              <Route path="/topics" element={<TopicPage />} />
              <Route path="/topics/:topicId" element={<TopicDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* 互动练习 */}
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/practice/listening" element={<ListeningQuizPage />} />
              <Route path="/practice/image" element={<ImageQuizPage />} />
              <Route path="/practice/match" element={<MatchQuizPage />} />
              <Route path="/practice/memory" element={<MemoryGamePage />} />
              <Route path="/practice/:type/result" element={<QuizResultPage />} />
            </Routes>
          </PageTransition>
        </AppLayout>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
