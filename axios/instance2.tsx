import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:4000'

export const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const instancePrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})

//////////////////////////////////////////////////// user //////////////////////////////////////////////////////

export const getUser = async (auth: any) => {
    // const usePrivate = useAxiosPrivate()
    // useAxiosPrivate()
    // const { auth }: any = useAuth()
    // const { auth }: any = useAuth()
    console.log(auth)

    try {
        const response = await instancePrivate.get(`/user/${auth.userId}`)
        // console.log(response);
        return response.data
    } catch (error) {
        console.error('error while getting user', error)
    }
    // try {
    //     const response = await axios({
    //         method: 'GET',
    //         url: `${API_URL}/user/${auth.userId}`,
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     });
    //     console.log(response);

    //     return response
    // } catch (error) {
    //     console.error('error while fetching available Payments', error);
    // }
}

//////////////////////////////////////////////////// Products //////////////////////////////////////////////////////

export const getProducts = async () => {
    try {
        const response = await instance.get('/product')
        return response
    } catch (error) {
        console.error('error getting products', error)
    }
}

//////////////////////////////////////////////////// cart //////////////////////////////////////////////////////

export const fetchCartItems = async (axiosPrivate: any, auth: any) => {
    try {
        const userId: any = auth.userId
        const response = await axiosPrivate.get('/user/cart/items', {
            withCredentials: true,
            params: { userId },
        })
        return response
    } catch (error) {
        console.error('error happened while fetching cart', error)
    }
}

export const cartItemQuantity = async (
    axiosPrivate: any,
    userId,
    productId,
    quantity
) => {
    try {
        const response = await axiosPrivate.patch('/user/cart/quantity', {
            userId: userId,
            productId: productId,
            quantity: quantity,
        })
        console.log(response)
        return response
    } catch (error) {
        console.error('error while increasing quantity of the item', error)
    }
}

export const cancelItemCart = async ({
    axiosPrivate,
    userId,
    productId,
}: any) => {
    try {
        const response = await axiosPrivate.delete('/user/cart/remove', {
            data: { userId, productId },
        })
        console.log(response)
        return response
    } catch (error) {
        console.error('error while cancelling the order', error)
    }
}

export const calcCart = async ({ axiosPrivate, auth }: any) => {
    try {
        const userId = auth.userId
        const response = await axiosPrivate.get('/user/cart/calcCart', {
            params: { userId },
        })
        // console.log(response)
        return response
    } catch (error) {
        console.error('error while calc cart total price', error)
    }
}

//////////////////////////////////////////////////// Orders //////////////////////////////////////////////////////

export const createOrder = async (axiosPrivate, auth, delivery, payment) => {
    try {
        const response = await axiosPrivate.post('/order', {
            userId: auth.userId,
            delivery,
            payment,
        })
        console.log(response)
        return response
    } catch (error) {
        console.error('error while creating the order', error)
    }
}

export const cancelOrder = async (
    axiosPrivate: any,
    orderId: string,
    cartId: string
) => {
    try {
        const response = await axiosPrivate.patch('/order/cancel', {
            orderId: orderId,
            cartId: cartId,
        })
        console.log(response)
    } catch (error) {
        console.error('error while canceling the order', error)
    }
}

// export const getOrders = async (axiosPrivate: any) => {
//     try {
//         const response = await axiosPrivate.get('/order', {
//             withCredentials: true
//         })
//         return response
//     } catch (error) {
//         console.error('error while fetching orders', error);
//     }
// }

// export const orderQuantity = async (axiosPrivate: any, orderId: string, cartId: string, num: number,) => {
//     try {
//         const response = await axiosPrivate.patch('/order', {
//             orderId: orderId,
//             cartId: cartId,
//             quantity: num
//         })
//     } catch (error) {
//         console.error('error while updating order quantity', error);
//     }
// }

//////////////////////////////////////////////////// Payment //////////////////////////////////////////////////////

export const availablePayment = async (InvoiceAmount: any) => {
    try {
        const response = await axios.post(`${API_URL}/payment/initiate`, {
            InvoiceAmount,
            CurrencyIso: 'KWD',
        })
        return response
    } catch (error) {
        console.error('error while fetching available Payments', error)
    }
}

export const executePayment = async (payload: any) => {
    try {
        const response = await axios.post(`${API_URL}/payment/execute`, payload)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('error while executing payment', error)
    }
}
