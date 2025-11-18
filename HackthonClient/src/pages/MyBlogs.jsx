import React from 'react'
import { getBlogUser ,deleteBlogs,upadte} from '../services/blog'
import { toast } from 'react-toastify'
import { useState,useEffect } from 'react'

const MyBlogs = () => {
   const [blogs,setBlogs] = useState([])
   const [title , setTitle] = useState('')

   useEffect(() => {
           getBlogs()
       }, [])
   
       const getBlogs = async () => {
           const result = await getBlogUser()
           if (result.status == 'success') {
               setBlogs(result.data)
             
           }
           else
               toast.error(result.error)
       }


    const updateBlog = async (c) =>{
      console.log(c)
      setTitle(c.title)
      const title = prompt("Enter the Title")
      if (!title) {
        toast.error("Please Enter the Title")
        return
      }
      const result = await upadte(c.blog_id,title)
      if (result.status == 'success'){
         toast.success('Title Updated')
         getBlogs()
      }

    }


     const deleteBlog = async (blog_id) =>{
           const result = await deleteBlogs(blog_id)
           if (result.status == 'success'){
              toast.success('Category Deleted')
             getBlogs()
           }
              
         }


        
  return (
    <div className="row mt-3 ms-3">
    {blogs.length === 0 ? (
      <div className="col-12 text-center">
        <h5>No Blogs Found</h5>
      </div>
    ) : (
      blogs.map((c) => (
        <div className="col-md-4 mb-4" key={c.blog_id}>
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">

              <h5 className="card-title fw-bold">{c.title} </h5>

              <p className="card-text text-secondary" style={{ fontSize: "0.95rem" }}>  {c.contents} </p>
  
              <hr />
              <div className="d-flex justify-content-between">
                <button  className="btn btn-sm btn-outline-primary" onClick={() => updateBlog(c)}>  Edit </button>
  
                <button className="btn btn-sm btn-outline-danger"  onClick={() => deleteBlog(c.blog_id)}> Delete </button>
              </div>
  
            </div>
          </div>
        </div>
      ))
    )}
  </div>
  
  )
}

export default MyBlogs
