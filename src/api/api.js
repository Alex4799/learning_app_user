import axios from 'axios'

export const header ={
    Authorization:'',
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
}

export const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api/'
})