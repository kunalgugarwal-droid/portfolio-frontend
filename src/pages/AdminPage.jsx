import { useState, useEffect } from 'react'

const API_URL = 'https://kishan-portfolio-fullstack.onrender.com/api/projects'

export default function AdminPage() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    category: 'web',
    image: '',
    videoUrl: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setForm({ title: '', category: 'web', image: '', videoUrl: '', description: '' })
        fetchProjects()
      }
    } catch (err) {
      console.error('Failed to create project:', err)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      fetchProjects()
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-light mb-8 tracking-wide">Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-white focus:outline-none focus:border-gray-600"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="design">Design</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            required
          />
          <input
            type="text"
            placeholder="Video URL (optional)"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            className="w-full bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 h-24 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center gap-4 bg-[#151515] border border-[#2a2a2a] p-4">
              <img src={project.image} alt={project.title} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-gray-500 text-sm">{project.category}</p>
              </div>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500 hover:text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}