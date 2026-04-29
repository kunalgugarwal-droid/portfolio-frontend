import { useState, useEffect } from 'react'

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
export default function AdminPage() {
  const [tab, setTab] = useState('work')

  /* ── Work state ───────────────────────────── */
  const [projects, setProjects] = useState([])
  const [workForm, setWorkForm] = useState({
    title: '', description: '', image: '', videoUrl: '', featured: false,
  })
  const [workImgUploading, setWorkImgUploading] = useState(false)
  const [workLoading, setWorkLoading] = useState(false)

  /* ── Services state ───────────────────────── */
  const [services, setServices] = useState([])
  const [serviceForm, setServiceForm] = useState({ title: '', image: '' })
  const [svcImgUploading, setSvcImgUploading] = useState(false)
  const [svcLoading, setSvcLoading] = useState(false)

  /* ── Fetch data ───────────────────────────── */
  useEffect(() => { fetchProjects(); fetchServices() }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`)
      setProjects(await res.json())
    } catch (err) { console.error('Failed to fetch projects:', err) }
  }

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`)
      setServices(await res.json())
    } catch (err) { console.error('Failed to fetch services:', err) }
  }

  /* ── Work handlers ────────────────────────── */
  const submitWork = async (e) => {
    e.preventDefault()
    if (!workForm.image) return alert('Please upload an image first')
    setWorkLoading(true)
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...workForm, category: 'work' }),
      })
      if (res.ok) {
        setWorkForm({ title: '', description: '', image: '', videoUrl: '', featured: false })
        fetchProjects()
      }
    } catch (err) { console.error('Failed to create project:', err) }
    setWorkLoading(false)
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

  /* ── Service handlers ─────────────────────── */
  const submitService = async (e) => {
    e.preventDefault()
    if (!serviceForm.image) return alert('Please upload an image first')
    setSvcLoading(true)
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm),
      })
      if (res.ok) {
        setServiceForm({ title: '', image: '' })
        fetchServices()
      }
    } catch (err) { console.error('Failed to create service:', err) }
    setSvcLoading(false)
  }

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return
    try {
      await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' })
      fetchServices()
    } catch (err) { console.error('Failed to delete service:', err) }
  }

  /* ── Render ───────────────────────────────── */
  return (
    <div className="admin">
      <div className="admin__container">
        {/* Header */}
        <header className="admin__header">
          <h1 className="admin__title">Admin Panel</h1>
          <p className="admin__subtitle">Manage your work &amp; services</p>
        </header>

        {/* Tabs */}
        <div className="admin__tabs">
          <button
            className={`admin__tab ${tab === 'work' ? 'is-active' : ''}`}
            onClick={() => setTab('work')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Work
          </button>
          <button
            className={`admin__tab ${tab === 'services' ? 'is-active' : ''}`}
            onClick={() => setTab('services')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            Services
          </button>
        </div>

        {/* ═══ WORK TAB ═══ */}
        {tab === 'work' && (
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
                  <Toggle
                    checked={workForm.featured}
                    onChange={(v) => setWorkForm({ ...workForm, featured: v })}
                    label="Featured on homepage"
                  />
                </div>
              </div>

              <button type="submit" className="admin__btn" disabled={workLoading || workImgUploading}>
                {workLoading ? 'Saving…' : 'Add Work'}
              </button>
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
                      {p.featured && <span className="admin__badge">Featured</span>}
                    </div>
                    {p.description && <p className="admin__card-desc">{p.description}</p>}
                  </div>
                  <div className="admin__card-actions">
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
        )}

        {/* ═══ SERVICES TAB ═══ */}
        {tab === 'services' && (
          <div className="admin__panel">
            <form onSubmit={submitService} className="admin__form">
              <div className="admin__form-grid">
                <div className="admin__form-col">
                  <label className="admin__label">Service Image *</label>
                  <ImageUpload
                    value={serviceForm.image}
                    uploading={svcImgUploading}
                    onChange={({ uploading, url }) => {
                      setSvcImgUploading(uploading)
                      if (url !== undefined) setServiceForm((f) => ({ ...f, image: url }))
                    }}
                  />
                </div>
                <div className="admin__form-col admin__form-fields">
                  <div>
                    <label className="admin__label">Title *</label>
                    <input
                      className="admin__input"
                      type="text"
                      placeholder="Service title"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="admin__btn" disabled={svcLoading || svcImgUploading}>
                {svcLoading ? 'Saving…' : 'Add Service'}
              </button>
            </form>

            {/* Services list */}
            <div className="admin__list">
              <h2 className="admin__list-heading">All Services ({services.length})</h2>
              {services.length === 0 && <p className="admin__empty">No services yet.</p>}
              {services.map((s) => (
                <div key={s._id} className="admin__card">
                  <img src={s.image} alt={s.title} className="admin__card-img" />
                  <div className="admin__card-body">
                    <h3 className="admin__card-title">{s.title}</h3>
                  </div>
                  <div className="admin__card-actions">
                    <button className="admin__btn-sm admin__btn-sm--danger" onClick={() => deleteService(s._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}