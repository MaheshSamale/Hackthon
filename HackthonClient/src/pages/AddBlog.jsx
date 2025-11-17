import React, { useState, useEffect } from 'react'
import { getCategory } from '../services/category'
import { addBlog } from '../services/blog'
import { toast } from 'react-toastify'

const AddBlog = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category_id, setCategory_id] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const result = await getCategory()

    if (result.status === 'success') {
      setCategories(result.data)
      console.log("Categories Loaded:", result.data)
    } else {
      toast.error(result.error)
    }
  }

  const addBlogs = async () => {
    if (!title || !content || !category_id) {
      toast.error("Please fill all fields")
      return
    }

    const result = await addBlog(title, content, category_id)

    if (result.status === 'success') {
      toast.success('Blog Added Successfully')
      setTitle('')
      setContent('')
      setCategory_id('')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="container w-50 border border-secondary p-4">

        <h3 className="text-center">Add Blog</h3>
        <div className="mb-3 mt-3">
          <label className="form-label">Title</label>
          <input  type="text" className="form-control"  value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea  className="form-control" rows="4" value={content} onChange={e => setContent(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Select Category</label>
          <select
            className="form-select"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}>
            <option value="">-- Select Category --</option>

            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success w-100" onClick={addBlogs}> Add Blog </button>

      </div>
    </div>
  )
}

export default AddBlog
