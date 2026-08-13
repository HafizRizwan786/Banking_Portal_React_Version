import './App.css'
import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Profile = lazy(()=> import('./pages/Profile'))


// Loading fallback component
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-primary)',
      fontSize: '1.2rem'
    }}>
      Loading...
    </div>
  )
}

// Reverse protection: redirect authenticated users away from auth pages
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        } />

        <Route path='/login' element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
