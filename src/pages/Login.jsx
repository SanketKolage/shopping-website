// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validCredentials = {
    username: 'admin',
    password: 'password123'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
     
      if (username === validCredentials.username && password === validCredentials.password) {
        localStorage.setItem('token', 'mock_jwt_token')
        setIsAuthenticated(true)
        navigate('/')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="demo-credentials">
        <p>Demo credentials:</p>
        <p>Username: {validCredentials.username}</p>
        <p>Password: {validCredentials.password}</p>
      </div>
    </div>
  )
}