import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBlog, findBlog } from "../services/blog";
import { getCategory }from '../services/category'
import {getUsers} from '../services/user'

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories,setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBlogs();
    getCategoriesName();
    getUsersBYname();
  }, []);


  const getUsersBYname = async ()=>{
    const result = await getUsers()
    if (result.status == 'success') {
      setUsers(result.data)
        console.log(result.data)
      
    }
    else
        toast.error(result.error)
  }


  const getCategoriesName = async () =>{
    const result = await getCategory()
    if (result.status == 'success') {
        setCategories(result.data)
        console.log(result.data)
      
    }
    else
        toast.error(result.error)
  }

  const getBlogs = async () => {
    const result = await getBlog();
    if (result.status === "success") {
      setAllBlogs(result.data);
    } else {
      toast.error(result.error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); 

    if (searchTerm.trim() === "") {
      getBlogs(); 
      return;
    }

    const result = await findBlog(searchTerm);

    if (result.status === "success") {
      setAllBlogs(result.data);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="container mt-4">

      <form className="d-flex mb-3" onSubmit={handleSearch}>
        <input className="form-control me-2" type="search" placeholder="Search by Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>


      <div className="row">
            {allBlogs.length === 0 ? (
              <div className="col-12 text-center">
                <h5>No Blogs Found</h5>
              </div>
            ) : (
              allBlogs.map((blog) => (
                <div className="col-md-4 mb-4" key={blog.id}>
                  <div className="card shadow-sm">
                    <div className="card-body">

                      <h5 className="card-title">{blog.title}</h5>

                      <p className="card-text">{blog.contents}</p>

                      <p className="badge bg-primary">
                        {categories.find(c => c.category_id === blog.category_id)?.title || "No Category"}
                      </p>

                      <p className="text-muted">
                        {"by --"+users.find(u => u.user_id === blog.user_id)?.full_name || "Unknown"}
                      </p>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
    </div>
  );
}

export default AllBlogs;
