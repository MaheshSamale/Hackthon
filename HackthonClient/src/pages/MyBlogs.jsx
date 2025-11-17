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
  <div>
    
         <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((c) => (
              <tr>
                <td scope="row" >{c.title}</td>
                <td>{c.contents}</td>
                <td><button onClick={() => updateBlog(c)} >edit</button></td>
                <td><button onClick={() => deleteBlog(c.blog_id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default MyBlogs
