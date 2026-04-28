import { Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import AboutPage from './pages/AboutPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import WorkPage from './pages/WorkPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
