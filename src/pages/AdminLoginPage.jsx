import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://kishan-portfolio-fullstack.onrender.com/api'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('adminLoggedIn', 'true')
        navigate('/admin')
      } else {
        setError(data.message || 'Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            className="admin__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin__btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
