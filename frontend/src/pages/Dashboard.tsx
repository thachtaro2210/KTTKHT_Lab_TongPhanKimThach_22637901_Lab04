import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface ContentItem { _id: string; title: string; slug: string; status: string; author: any; createdAt: string }

export default function Dashboard({ user }: { user: any }) {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchList() }, [])

  const fetchList = async () => {
    try {
      const res = await fetch('/api/contents')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteContent = async (id: string) => {
    if (!window.confirm('Delete?')) return
    const token = localStorage.getItem('token')
    try {
      await fetch(`/api/contents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchList()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <h2>Dashboard - All Posts</h2>
      {items.length === 0 ? (
        <p>No posts yet. {user && <Link to="/editor">Create one</Link>}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>          <tbody>
            {items.map(it => (
              <tr key={it._id}>
                <td>{it.title}</td>
                <td>{it.author?.name || 'Unknown'}</td>
                <td><span className={`badge ${it.status}`}>{it.status}</span></td>
                <td>{new Date(it.createdAt).toLocaleDateString()}</td>
                <td className="actions-cell">
                  {user ? (
                    user.roles?.includes('admin') || user._id === it.author?._id ? (
                      <>
                        <Link to={`/editor/${it._id}`} className="action-link">✏️ Edit</Link>
                        <button onClick={() => deleteContent(it._id)} className="action-btn-delete">🗑️ Delete</button>
                      </>
                    ) : (
                      <span className="text-muted">-</span>
                    )
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
