import axios from "axios";
import config from "./config";
import { toast } from "react-toastify";

export async function addBlog(title, contents,category_id) {
    const url = config.BASE_URL + '/blogs/post'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
   try {
        const body = {title,contents, category_id}
        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (ex) {
        toast.error(ex)
    }
} 

export async function getBlog() {
    const url = config.BASE_URL + '/blogs/all'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
    try {
        const response = await axios.get(url, {headers})
        return response.data
    } catch (error) {
        toast.error(error)
    }
}

export async function findBlog(searchTerm) {
    const url = config.BASE_URL + '/blogs/find'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }

    try {
        const response = await axios.post(url, { title: searchTerm }, { headers })
        return response.data
    } catch (error) {
        toast.error(error.message)
    }
}


export async function getBlogUser() {
    const url = config.BASE_URL + '/blogs/byuser'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
    try {
        const response = await axios.get(url,{headers})
        return response.data
    } catch (error) {
        toast.error(error)
    }
}

export async function deleteBlogs(blog_id) {{
    const url = config.BASE_URL + '/blogs/delete'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
   try {
        const body =  { blog_id }
        console.log(body)
        const response = await axios.delete(`${url}/${blog_id}`,{headers})
        console.log(response)
        return response.data
    } catch (ex) {
        console.log(ex);
        
        toast.error(ex)
    }
}
}



export async function upadte(blog_id,title) {
    const url = config.BASE_URL + '/blogs/update'
    const headers = {
        token: window.sessionStorage.getItem('token')
    }
   try {
        const body = {blog_id,title}
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (ex) {
        toast.error(ex)
    }
}
