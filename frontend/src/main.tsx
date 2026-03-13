import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import MediaManager from './pages/MediaManager'
import UserManagement from './pages/UserManagement'
import './styles.css'

const App = () => {
  const [user, setUser] = React.useState<any>(null)
  const nav = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // fetch current user
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(u => setUser(u))
        .catch(() => localStorage.removeItem('token'))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    nav('/login')
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <Link to="/">Dashboard</Link>
          {user && <Link to="/editor">New Post</Link>}
          {user && <Link to="/media">Media</Link>}
          {user?.roles?.includes('admin') && <Link to="/users">Users</Link>}
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <span>{user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>      <Routes>
        <Route path="/" element={user ? <Dashboard user={user} /> : <Login onSuccess={setUser} />} />
        <Route path="/login" element={!user ? <Login onSuccess={setUser} /> : <Dashboard user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editor" element={user ? <Editor user={user} /> : <Login onSuccess={setUser} />} />
        <Route path="/editor/:id" element={user ? <Editor user={user} /> : <Login onSuccess={setUser} />} />
        <Route path="/media" element={user ? <MediaManager user={user} /> : <Login onSuccess={setUser} />} />
        <Route path="/users" element={user?.roles?.includes('admin') ? <UserManagement /> : <Dashboard user={user} />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
