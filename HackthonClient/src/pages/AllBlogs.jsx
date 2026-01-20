import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBlog, findBlog } from "../services/blog";
import { getCategory } from "../services/category";
import { getUsers } from "../services/user";

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBlogs();
    getCategoriesName();
    getUsersBYname();
  }, []);

  const getUsersBYname = async () => {
    const result = await getUsers();
    if (result.status === "success") {
      setUsers(result.data);
    } else {
      toast.error(result.error);
    }
  };

  const getCategoriesName = async () => {
    const result = await getCategory();
    if (result.status === "success") {
      setCategories(result.data);
    } else {
      toast.error(result.error);
    }
  };

  const getBlogs = async () => {
    const result = await getBlog();
    if (result.status === "success") {
      setAllBlogs(result.data);
    } else {
      toast.error(result.error);
    }
  };

  // 🔍 SEARCH FUNCTIONALITY
  const handleSearch = async (text) => {
    setSearchTerm(text);

    if (text.trim() === "") {
      getBlogs();
      return;
    }

    const result = await findBlog(text);
    if (result.status === "success") {
      setAllBlogs(result.data);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="container mt-4">

      {/* 🔍 Search Bar */}
      <div className="d-flex mb-3">
        <input
          className="form-control"
          type="search"
          placeholder="Search by title or content..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {allBlogs.length === 0 ? (
          <div className="col-12 text-center">
            <h5>No Blogs Found</h5>
          </div>
        ) : (
          allBlogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.blog_id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">

                  {/* Category */}
                  <span className="badge bg-primary mb-2">
                    {categories.find(c => c.category_id === blog.category_id)?.title || "No Category"}
                  </span>

                  {/* Title */}
                  <h5 className="card-title mt-2">{blog.title}</h5>

                  {/* Content */}
                  <p className="card-text">{blog.contents}</p>

                  {/* User */}
                  <p className="text-muted text-end mb-0">
                    By {users.find(u => u.user_id === blog.user_id)?.full_name || "Unknown"}
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
