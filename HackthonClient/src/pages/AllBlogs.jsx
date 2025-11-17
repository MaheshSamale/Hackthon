import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBlog, findBlog } from "../services/blog";

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getBlogs();
  }, []);

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

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
          </tr>
        </thead>

        <tbody>
          {allBlogs.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No Blogs Found
              </td>
            </tr>
          ) : (
            allBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.contents}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllBlogs;
