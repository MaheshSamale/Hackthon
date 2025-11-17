import React from 'react'
import { useState ,useEffect } from 'react'
import { addCategoryTitleDesc , getCategory,deleteCategory , upadte} from '../services/category'
import { toast } from 'react-toastify'
const AddCategory = () => {
   const [title, setTitle] = useState('')
   const [description,setDescription] = useState('')
   const [categories,setCategories] = useState([])

   useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const result = await getCategory()
        if (result.status == 'success') {
            setCategories(result.data)
          
        }
        else
            toast.error(result.error)
    }
  
   const addCategoryName = async () => {
        const result = await addCategoryTitleDesc(title,description)
        if (result.status == 'success'){
           toast.success('Category Added')
           getCategories()
        }
           
    }
    const deleteCategorys = async (category_id) =>{
      console.log("in delete")
      console.log(category_id)
      const result = await deleteCategory(category_id)
      if (result.status == 'success'){
         toast.success('Category Deleted')
        getCategories()
      }
         
    }

    const updateCategory = async (c) =>{
      console.log(c)
      setTitle(c.title)
      setDescription(c.description)
      const title = prompt("Enter the Title")
      const result = await upadte(c.category_id,title)
      console.log(title)
      console.log(c.category_id)
      if (result.status == 'success'){
         toast.success('Title Updated')
         getCategories()
      }

    }


  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-3">
            <div className='container w-50 border border-secondary p-4'>
                <h3 className='text-center'>Add Category</h3>
                <div className="mb-3 mt-3">
                  <label for="inputName" className="form-label">Category Name:</label>
                <input type="text" className="form-control" id="inputName" onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                  <label for="inputName" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputName" onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <button className='btn btn-success' onClick={addCategoryName}>Add Category</button>
                </div>
            </div>
        </div>
         <table className="table">
          <thead>
            <tr>
              <th scope="col">Category ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr>
                <td scope="row" >{c.category_id}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td><button onClick={() => updateCategory(c)} >edit</button></td>
                <td><button onClick={() => deleteCategorys(c.category_id)}>delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AddCategory


