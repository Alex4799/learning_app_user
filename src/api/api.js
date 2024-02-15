import axios from 'axios'

export const header ={
    Authorization:'',
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
}

export const api = axios.create({
    baseURL:'https://learningapp.alexlucifer.info/api/'
})