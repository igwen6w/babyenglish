// 应用路由配置
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/alphabet/:letter" element={<AlphabetDetailPage />} />
          <Route path="/topics" element={<TopicPage />} />
          <Route path="/topics/:topicId" element={<TopicDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* 第三阶段：互动练习 */}
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/listening" element={<ListeningQuizPage />} />
          <Route path="/practice/image" element={<ImageQuizPage />} />
          <Route path="/practice/match" element={<MatchQuizPage />} />
          <Route path="/practice/memory" element={<MemoryGamePage />} />
          <Route path="/practice/:type/result" element={<QuizResultPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
