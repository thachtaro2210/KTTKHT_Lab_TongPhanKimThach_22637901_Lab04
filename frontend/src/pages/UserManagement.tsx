import React, { useState, useEffect } from 'react'

interface User { _id: string; name: string; email: string; roles: string[] }

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (userId: string, newRole: string) => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ roles: [newRole] })
      })
      const data = await res.json()
      if (!res.ok) return setMsg(data.message || 'Error')
      setMsg('Updated!')
      fetchUsers()
    } catch (err: any) {
      setMsg(err.message || 'Error')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!window.confirm('Delete user?')) return
    const token = localStorage.getItem('token')
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <h2>User Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.roles[0]} onChange={e => updateRole(u._id, e.target.value)}>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteUser(u._id)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={msg.includes('Error') ? 'error' : 'success'}>{msg}</div>
    </div>
  )
}

// Modified: 2026-03-13T07:38:03.466Z