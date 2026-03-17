// 应用路由配置
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import AlphabetPage from './pages/AlphabetPage'
import AlphabetDetailPage from './pages/AlphabetDetailPage'
import TopicPage from './pages/TopicPage'
import TopicDetailPage from './pages/TopicDetailPage'
import SettingsPage from './pages/SettingsPage'

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
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
