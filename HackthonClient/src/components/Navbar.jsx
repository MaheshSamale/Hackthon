import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

function Navbar() {
   
    const navigate = useNavigate()
    const logout = () => {
        window.sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Blog App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to= "/home/allBlogs">Home</Link>
                         {/* <Link className="nav-link" to="/home/allBlogs">Home</Link> */}
                        <Link className="nav-link" to="/home/addblogs">Add Blogs</Link>
                        <Link className="nav-link" to="/home/addcategory">Add Category</Link>
                        <Link className="nav-link" to="/home/myblogs">My Blogs</Link>
                        <Link className="nav-link" to="/home/profile">Profile</Link>
                        <button className="nav-link" onClick={logout} >Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
