import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useStore from './store/useStore'
import { supabase } from './supabase'

// Pages
import Login from './pages/Login'
import PetSelection from './pages/PetSelection'
import Dashboard from './pages/Dashboard'
import SubjectGraph from './pages/SubjectGraph'
import TopicContent from './pages/TopicContent'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import SubjectAnalytics from './pages/SubjectAnalytics'

// Layout
import Layout from './components/Layout'

// Protected Route Component  
function ProtectedRoute({ children }) {
  const { user } = useStore()

  // Check if user is authenticated (Supabase, email/password, or guest mode)
  const isGuest = localStorage.getItem('guestMode') === 'true'
  const currentUser = localStorage.getItem('currentUser')
  const isEmailAuth = currentUser && currentUser !== 'null'

  console.log('=== ProtectedRoute Check ===')
  console.log('Supabase user:', user)
  console.log('Guest mode:', isGuest)
  console.log('Current user from localStorage:', currentUser)
  console.log('Is email auth:', isEmailAuth)
  console.log('Can access?:', !!(user || isGuest || isEmailAuth))

  if (!user && !isGuest && !isEmailAuth) {
    console.log('❌ Access denied - redirecting to login')
    return <Navigate to="/" replace />
  }

  console.log('✅ Access granted')
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
        <Route path="/" element={<Login />} />
        <Route path="/select-pet" element={<PetSelection />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/subjects/:code" element={<ProtectedRoute><SubjectGraph /></ProtectedRoute>} />
          <Route path="/subjects/:subjectCode/analytics" element={<ProtectedRoute><SubjectAnalytics /></ProtectedRoute>} />
          <Route path="/topics/:topicId" element={<ProtectedRoute><TopicContent /></ProtectedRoute>} />
          <Route path="/topics/:topicId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
