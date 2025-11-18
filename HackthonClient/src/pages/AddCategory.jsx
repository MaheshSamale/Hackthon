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
    if (!title || !description) {
      toast.error("Please fill all fields")
      return
    }
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
      if (!title) {
        toast.error("Please Enter the Title")
        return
      }
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
        <div className="row">
  {categories.length === 0 ? (
    <div className="col-12 text-center">
      <h5>No Categories Found</h5>
    </div>
  ) : (
    categories.map((c) => (
      <div className="col-md-4 mb-4" key={c.category_id}>
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body">

            <h5 className="card-title fw-bold"> {c.title}</h5>

            <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}> <strong>ID:</strong> {c.category_id} </p>

            <p className="card-text text-secondary" style={{ fontSize: "0.95rem" }}>  {c.description}</p>
            <hr />

            <div className="d-flex justify-content-between">
              <button  className="btn btn-sm btn-outline-primary"  onClick={() => updateCategory(c)} >  Edit</button>

              <button className="btn btn-sm btn-outline-danger"  onClick={() => deleteCategorys(c.category_id)} >  Delete </button>
            </div>

          </div>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  )
}

export default AddCategory


