import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ onSuccess }: { onSuccess: (user: any) => void }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) return setMsg(data.message || 'Error')
      localStorage.setItem('token', data.token)
      // fetch user info
      const meRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${data.token}` }
      })
      const user = await meRes.json()
      onSuccess(user)
      nav('/')
    } catch (err: any) {
      setMsg(err.message || 'Error')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <div className="error">{msg}</div>
      <p style={{fontSize: '0.9em', color: '#666'}}>Demo: admin@example.com / password</p>
    </div>
  )
}

// Modified: 2026-03-13T07:38:01.274Z