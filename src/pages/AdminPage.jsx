import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://kishan-portfolio-fullstack.onrender.com/api'
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/* ── Cloudinary unsigned upload ─────────────────────────── */
async function uploadToCloudinary(file) {
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: form },
  )
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.secure_url
}

/* ── YouTube helpers ────────────────────────────────────── */
function extractYouTubeId(url) {
  if (!url) return null
  const m =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

function YouTubePreview({ url }) {
  const id = extractYouTubeId(url)
  if (!id) return null
  return (
    <div className="admin-yt-preview">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube preview"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

/* ── Image dropzone ─────────────────────────────────────── */
function ImageUpload({ value, onChange, uploading }) {
  const handleFile = async (file) => {
    if (!file) return
    onChange({ uploading: true })
    try {
      const url = await uploadToCloudinary(file)
      onChange({ uploading: false, url })
    } catch {
      onChange({ uploading: false, url: '' })
      alert('Image upload failed. Check your Cloudinary config.')
    }
  }

  return (
    <label
      className="admin-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        handleFile(e.dataTransfer.files[0])
      }}
    >
      {uploading ? (
        <div className="admin-dropzone__spinner" />
      ) : value ? (
        <img src={value} alt="Preview" className="admin-dropzone__preview" />
      ) : (
        <div className="admin-dropzone__placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Drop image or click to upload</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </label>
  )
}

/* ── Toggle switch ──────────────────────────────────────── */
function Toggle({ checked, onChange, label }) {
  return (
    <label className="admin-toggle">
      <div className={`admin-toggle__track ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}>
        <div className="admin-toggle__thumb" />
      </div>
      <span>{label}</span>
    </label>
  )
}

/* ═══════════════════════════════════════════════════════════
   ADMIN PAGE
   ═══════════════════════════════════════════════════════════ */
const CATEGORY_OPTIONS = [
  'Work',
  'Instagram Reel',
  'YouTube Video',
  'Cinematic Edit',
  'Client Project',
  'Brand Video',
  'Other',
]

export default function AdminPage() {
  const navigate = useNavigate()

  /* ── Work state ───────────────────────────── */
  const [projects, setProjects] = useState([])
  const [workForm, setWorkForm] = useState({
    title: '', description: '', image: '', videoUrl: '', featured: false, categoryLabel: 'Work',
  })
  const [customCategory, setCustomCategory] = useState('')
  const [workImgUploading, setWorkImgUploading] = useState(false)
  const [workLoading, setWorkLoading] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)

  /* ── Fetch data ───────────────────────────── */
  useEffect(() => { 
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin-login')
    } else {
      fetchProjects() 
    }
  }, [navigate])

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`)
      setProjects(await res.json())
    } catch (err) { console.error('Failed to fetch projects:', err) }
  }

  /* ── Work handlers ────────────────────────── */
  const submitWork = async (e) => {
    e.preventDefault()
    if (!workForm.image) return alert('Please upload an image first')
    setWorkLoading(true)
    const finalCategoryLabel = workForm.categoryLabel === 'Other' ? (customCategory.trim() || 'Work') : workForm.categoryLabel
    try {
      const url = editingProjectId ? `${API_URL}/projects/${editingProjectId}` : `${API_URL}/projects`
      const method = editingProjectId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...workForm, category: 'work', categoryLabel: finalCategoryLabel }),
      })
      if (res.ok) {
        setWorkForm({ title: '', description: '', image: '', videoUrl: '', featured: false, categoryLabel: 'Work' })
        setCustomCategory('')
        setEditingProjectId(null)
        fetchProjects()
      }
    } catch (err) { console.error('Failed to save project:', err) }
    setWorkLoading(false)
  }

  const handleEditClick = (project) => {
    setEditingProjectId(project._id)
    const catLabel = project.categoryLabel || 'Work'
    setWorkForm({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      videoUrl: project.videoUrl || project.youtubeUrl || '',
      featured: project.featured || false,
      categoryLabel: CATEGORY_OPTIONS.includes(catLabel) ? catLabel : 'Other'
    })
    if (!CATEGORY_OPTIONS.includes(catLabel)) {
      setCustomCategory(catLabel)
    } else {
      setCustomCategory('')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingProjectId(null)
    setWorkForm({ title: '', description: '', image: '', videoUrl: '', featured: false, categoryLabel: 'Work' })
    setCustomCategory('')
  }

  const toggleFeatured = async (project) => {
    try {
      await fetch(`${API_URL}/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      })
      fetchProjects()
    } catch (err) { console.error('Failed to toggle featured:', err) }
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' })
      fetchProjects()
    } catch (err) { console.error('Failed to delete project:', err) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/admin-login')
  }

  /* ── Render ───────────────────────────────── */
  return (
    <div className="admin">
      <div className="admin__container">
        {/* Header */}
        <header className="admin__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="admin__title">Admin Panel</h1>
            <p className="admin__subtitle">Manage your work</p>
          </div>
          <button className="admin__btn-sm admin__btn-sm--danger" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
            Logout
          </button>
        </header>

        <div className="admin__panel">
            <form onSubmit={submitWork} className="admin__form">
              <div className="admin__form-grid">
                {/* Left col — image */}
                <div className="admin__form-col">
                  <label className="admin__label">Thumbnail Image *</label>
                  <ImageUpload
                    value={workForm.image}
                    uploading={workImgUploading}
                    onChange={({ uploading, url }) => {
                      setWorkImgUploading(uploading)
                      if (url !== undefined) setWorkForm((f) => ({ ...f, image: url }))
                    }}
                  />
                </div>

                {/* Right col — fields */}
                <div className="admin__form-col admin__form-fields">
                  <div>
                    <label className="admin__label">Title *</label>
                    <input
                      className="admin__input"
                      type="text"
                      placeholder="Project title"
                      value={workForm.title}
                      onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="admin__label">Description</label>
                    <textarea
                      className="admin__input admin__textarea"
                      placeholder="Brief description…"
                      value={workForm.description}
                      onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin__label">YouTube Link (optional)</label>
                    <input
                      className="admin__input"
                      type="url"
                      placeholder="https://youtube.com/watch?v=…"
                      value={workForm.videoUrl}
                      onChange={(e) => setWorkForm({ ...workForm, videoUrl: e.target.value })}
                    />
                    <YouTubePreview url={workForm.videoUrl} />
                  </div>
                  <div>
                    <label className="admin__label">Project Type</label>
                    <select
                      className="admin__input"
                      value={CATEGORY_OPTIONS.includes(workForm.categoryLabel) ? workForm.categoryLabel : 'Other'}
                      onChange={(e) => {
                        const val = e.target.value
                        setWorkForm({ ...workForm, categoryLabel: val })
                        if (val !== 'Other') setCustomCategory('')
                      }}
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {(workForm.categoryLabel === 'Other' || !CATEGORY_OPTIONS.includes(workForm.categoryLabel)) && (
                      <input
                        className="admin__input"
                        style={{ marginTop: 8 }}
                        type="text"
                        placeholder="Enter custom category…"
                        value={customCategory || (CATEGORY_OPTIONS.includes(workForm.categoryLabel) ? '' : workForm.categoryLabel)}
                        onChange={(e) => setCustomCategory(e.target.value)}
                      />
                    )}
                  </div>
                  <Toggle
                    checked={workForm.featured}
                    onChange={(v) => setWorkForm({ ...workForm, featured: v })}
                    label="Featured on homepage"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="admin__btn" disabled={workLoading || workImgUploading} style={{ flex: 1 }}>
                  {workLoading ? 'Saving…' : (editingProjectId ? 'Update Work' : 'Add Work')}
                </button>
                {editingProjectId && (
                  <button type="button" className="admin__btn" style={{ flex: 1, background: '#333' }} onClick={cancelEdit}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>

            {/* Work list */}
            <div className="admin__list">
              <h2 className="admin__list-heading">All Work ({projects.length})</h2>
              {projects.length === 0 && <p className="admin__empty">No projects yet.</p>}
              {projects.map((p) => (
                <div key={p._id} className="admin__card">
                  <img src={p.image} alt={p.title} className="admin__card-img" />
                  <div className="admin__card-body">
                    <div className="admin__card-top">
                      <h3 className="admin__card-title">{p.title}</h3>
                      <span className="admin__badge" style={{ background: '#2a2a2a', color: '#aaa', fontWeight: 500 }}>{p.categoryLabel || 'Work'}</span>
                      {p.featured && <span className="admin__badge">Featured</span>}
                    </div>
                    {p.description && <p className="admin__card-desc">{p.description}</p>}
                  </div>
                  <div className="admin__card-actions">
                    <button className="admin__btn-sm" onClick={() => handleEditClick(p)}>
                      Edit
                    </button>
                    <button
                      className={`admin__btn-sm ${p.featured ? 'admin__btn-sm--active' : ''}`}
                      onClick={() => toggleFeatured(p)}
                      title={p.featured ? 'Unfeature' : 'Feature'}
                    >
                      {p.featured ? '★' : '☆'}
                    </button>
                    <button className="admin__btn-sm admin__btn-sm--danger" onClick={() => deleteProject(p._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}