import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) return setMsg(data.message || 'Error')
      setMsg('Success! Redirecting to login...')
      setTimeout(() => nav('/login'), 1500)
    } catch (err: any) {
      setMsg(err.message || 'Error')
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit} className="form">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <div className={msg.includes('Success') ? 'success' : 'error'}>{msg}</div>
    </div>
  )
}

// Modified: 2026-03-13T07:38:01.275Z