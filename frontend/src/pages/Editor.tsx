import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Editor({ user }: { user: any }) {
  const { id } = useParams()
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState('draft')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(!!id)

  useEffect(() => {
    if (id) fetchContent()
  }, [id])

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/contents/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setSlug(data.slug)
      setBody(data.body)
      setStatus(data.status)
      setTags(data.tags.join(', '))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const save = async (publish: boolean = false) => {
    if (!title || !slug || !body) return setMsg('Fill all fields')
    const token = localStorage.getItem('token')
    const payload = {
      title,
      slug,
      body,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      status: publish ? 'published' : 'draft'
    }
    try {
      const res = await fetch(
        id ? `/api/contents/${id}` : '/api/contents',
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      )
      const data = await res.json()
      if (!res.ok) return setMsg(data.message || 'Error')
      setMsg('Saved!')
      setTimeout(() => nav('/'), 1000)
    } catch (err: any) {
      setMsg(err.message || 'Error')
    }
  }

  if (loading) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container editor">
      <h2>{id ? 'Edit Post' : 'New Post'}</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input-lg" />
      <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} />
      <input placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <textarea placeholder="Body (HTML)" value={body} onChange={e => setBody(e.target.value)} rows={15}></textarea>
      <div className="flex gap">
        <button onClick={() => save(false)} className="btn-primary">Save Draft</button>
        <button onClick={() => save(true)} className="btn-success">Publish</button>
        <button onClick={() => nav('/')} className="btn-cancel">Cancel</button>
      </div>
      <div className={msg.includes('Error') ? 'error' : 'success'}>{msg}</div>
    </div>
  )
}
