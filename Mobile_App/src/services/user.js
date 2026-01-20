import axios from "axios";
import config from "./config";
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage' 

export async function loginUser(email, password) {
    try {
        const userbody = { email, password }
         const url = config.BASE_URL + '/user/login'
        const response = await axios.post(url, userbody)
        return response.data
    } catch (ex) {
        Alert.error(ex)
    }
}

export async function registerUser(full_name, email, password, phone_no) {
    try {
        const url = config.BASE_URL + '/user/register'
        const body = { full_name, email, password, phone_no }
        const response = await axios.post(url, body)
        return response.data
    } catch (ex) {
        Alert.error(ex)
    }
}

export async function getProfile() {
    try {
        const url = config.BASE_URL + '/user/profile'
        const headers = {
            token: await AsyncStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        Alert.error(error)
    }
}

export async function updateUser(phone_no) {
    try {
        const url = config.BASE_URL + '/user'
        const body = { phone_no }
        const headers = {
            token: await AsyncStorage.getItem('token')
        }
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (error) {
        Alert.error(error)
    }
}


export async function getUsers() {
    try {
        const url = config.BASE_URL + '/user/'
        const headers = {
            token: await AsyncStorage.getItem('token')
        }
        const response = await axios.get(url, { headers })
        return response.data
    } catch (error) {
        Alert.error(error)
    }
}