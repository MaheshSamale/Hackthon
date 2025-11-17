import axios from "axios";
import { toast } from "react-toastify";
import config from "./config";

export async function loginUser(email, password) {
    try {
        const userbody = { email, password }
         const url = config.BASE_URL + '/user/login'
        // const url = 'http://localhost:4000/user/login'
        const response = await axios.post(url, userbody)
        return response.data
    } catch (ex) {
        toast.error(ex)
    }
}

export async function registerUser(full_name, email, password, phone_no) {
    try {
        // const url = config.BASE_URL + '/user/register'
        const url = 'http://localhost:4000/user/register'
        const body = { full_name, email, password, phone_no }
        const response = await axios.post(url, body)
        return response.data
    } catch (ex) {
        toast.error(ex)
    }
}

export async function getProfile() {
    try {
        const url = config.BASE_URL + '/user/profile'
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }
}

export async function updateUser(phone_no) {
    try {
        const url = config.BASE_URL + '/user'
        const body = { phone_no }
        const headers = {
            token: window.sessionStorage.getItem('token')
        }
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (error) {
        toast.error(error)
    }
}