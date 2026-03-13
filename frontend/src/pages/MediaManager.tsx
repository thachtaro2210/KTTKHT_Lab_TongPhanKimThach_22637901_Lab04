import React, { useState } from 'react'

export default function MediaManager({ user }: { user: any }) {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  React.useEffect(() => { fetchMedia() }, [])

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      setFiles(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    setLoading(true)
    const token = localStorage.getItem('token')
    const form = new FormData()
    form.append('file', e.target.files[0])
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const data = await res.json()
      if (!res.ok) return setMsg(data.message || 'Error')
      setMsg('Uploaded!')
      fetchMedia()
    } catch (err: any) {
      setMsg(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (id: string) => {
    const token = localStorage.getItem('token')
    try {
      await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMedia()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <h2>Media Manager</h2>
      <div className="upload-area">
        <label>
          Upload File
          <input type="file" onChange={handleUpload} disabled={loading} />
        </label>
        {loading && <p>Uploading...</p>}
      </div>
      <div className={msg.includes('Error') ? 'error' : 'success'}>{msg}</div>
      <div className="media-grid">
        {files.map(f => (
          <div key={f._id} className="media-item">
            <img src={f.url} alt={f.filename} />
            <p>{f.filename}</p>
            <button onClick={() => deleteFile(f._id)} className="btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
