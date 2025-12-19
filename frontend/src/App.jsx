import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useStore from './store/useStore'
import { supabase } from './supabase'

// Student Pages
import Login from './pages/Login'
import PetSelection from './pages/PetSelection'
import Dashboard from './ pages/Dashboard'
import SubjectGraph from './pages/SubjectGraph'
import TopicContent from './pages/TopicContent'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import SubjectAnalytics from './pages/SubjectAnalytics'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import ManageCourses from './pages/ManageCourses'

// Layouts
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'

// Student Protected Route Component  
function ProtectedRoute({ children }) {
  const { user } = useStore()

  // Check if user is authenticated (Supabase, email/password, or guest mode)
  const isGuest = localStorage.getItem('guestMode') === 'true'
  const currentUser = localStorage.getItem('currentUser')
  const isEmailAuth = currentUser && currentUser !== 'null'

  if (!user && !isGuest && !isEmailAuth) {
    return <Navigate to="/" replace />
  }

  return children
}

// Admin Protected Route Component
function AdminProtectedRoute({ children }) {
  const adminSession = JSON.parse(localStorage.getItem('adminSession') || '{}')

  if (!adminSession.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { setSession, setUser } = useStore()

  useEffect(() => {
    const isGuest = localStorage.getItem('guestMode') === 'true'

    if (!isGuest) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  return (
    <Router>
      <Routes>
        {/* Unified Login */}
        <Route path="/" element={<Login />} />
        <Route path="/select-pet" element={<PetSelection />} />

        {/* Student Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/subjects/:code" element={<ProtectedRoute><SubjectGraph /></ProtectedRoute>} />
          <Route path="/subjects/:subjectCode/analytics" element={<ProtectedRoute><SubjectAnalytics /></ProtectedRoute>} />
          <Route path="/topics/:topicId" element={<ProtectedRoute><TopicContent /></ProtectedRoute>} />
          <Route path="/topics/:topicId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/courses" element={<AdminProtectedRoute><ManageCourses /></AdminProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

