import axios from "axios";
import config from "./config";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'


export async function getCategory() {
    const url = config.BASE_URL + '/category/all'
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        Alert.error(error)
    }
}

export async function addCategoryTitleDesc(title,description) {
    const url = config.BASE_URL + '/category/add'
    // console.log(url);
    const headers = {
        token: await AsyncStorage.getItem('token')
    }
   try {
        const body = {title,description}
        const response = await axios.post(url, body, { headers })
        return response.data
    } catch (ex) {
        Alert.error(ex)
    }
} 

export async function deleteCategory(category_id) {{
    const url = config.BASE_URL + '/category/delete'
    // console.log(category_id)
    const headers = {
         token: await AsyncStorage.getItem('token')
    }
   try {
        const body =  { category_id }
        // console.log(body)
        const response = await axios.delete(`${url}/${category_id}`,{headers})
        // console.log(response)
        return response.data
    } catch (ex) {
        // console.log(ex);
        
        Alert.error(ex)
    }
}
    
}

export async function update(category_id,title) {
    const url = config.BASE_URL + '/category/update'
    // console.log(url);
    
    const headers = {
        token: await AsyncStorage.getItem('token')
    }
   try {
        const body = {category_id,title}
        const response = await axios.put(url, body, { headers })
        return response.data
    } catch (ex) {
        Alert.error(ex)
    }
}