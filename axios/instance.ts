import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4000'

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const instancePrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getProducts = async () => {
    try {
        const response = await instance.get('/product')
        return response;
    } catch (error) {
        console.error('error getting products', error);
    }
}

export const getUser = async () => {
    const usePrivate = useAxiosPrivate()
    const { auth }: any = useAuth()
    try {
        const response = await instancePrivate.get(`/user/${auth.userId}`)
        console.log(response);
        return response
    } catch (error) {
        console.error('error while getting user', error);
    }
}
