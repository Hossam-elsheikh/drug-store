
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4000'

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials:true,
})

export const instancePrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getProducts = async () => {
    const response = await instance.get('/product')
    return response;
}


export const getUser = async (userId:any) => {
    const res = await instance.get(`/user/${userId}`);
    console.log(res)
    return res;
};