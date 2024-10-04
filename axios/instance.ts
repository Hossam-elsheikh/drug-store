import { SearchParams } from '@/context/ProductsProvider'
import { PaymentStatus, SetOrderPaymentStatus } from '@/types'
import axios, { AxiosError } from 'axios'

enum ApiEndPoints {
    PRODUCT = '/product',
    PRODUCT_SEARCH = '/Product/search',
    USER = '/user',
    ORDERS = '/order',
    CATEGORIES = '/category',
    SUB_CATEGORIES = '/subCategory',
    BRANDS = '/brand',
    MEDIA = '/media',
    REVIEW = '/review',
    PROFILE = '/profile',
}

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

export const instancePrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})
interface ErrorResponse {
    message: string
}

const handleApiError = (elem: AxiosError<ErrorResponse>) => {
    throw new Error(elem.response?.data.message || 'An unknown error occurred')
}
interface ProductSearchParams {
    page?: number
    search?: string
}
const errorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        handleApiError(err)
    } else {
        // Handle non-Axios errors
        throw new Error('An unknown error occurred')
    }
}
// ---------------------------------------------------User----------------------------------------------

export const userSignUp = async (values: any) => {
    try {
        const response = await instance.post('/user', JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        // errorMessage(error)
        console.error(error);

        return error
    }
}

export const userSignIn = async (values: any) => {
    try {
        const response: any = await instance.post(
            '/user/sign-in',
            JSON.stringify(values),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        // errorMessage(error)
        console.error(error);
        
        return error
    }
}

export const getUser = async (userId: string): Promise<any> => {
    try {
        const response = await instancePrivate.get(
            `${ApiEndPoints.USER}/${userId}`
        )
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const updateUser = async ({ userId, data }:any): Promise<any> => {
    console.log(data)
    try {
        const response = await instancePrivate.patch(
            `${ApiEndPoints.USER}/${userId}`,
            data
        )
        console.log(response)
        return response.data
    } catch (error) {
        errorMessage(error)
        throw error
    }
}

// export const addUserAddress = async (
//     userId: string,
//     newAddress: any
// ): Promise<any> => {
//     try {
//         const response = await instancePrivate.patch(
//             `${ApiEndPoints.USER}/${userId}/editUser`,
//             { newAddress }
//         )
//         console.log(response)
//         return response.data
//     } catch (error) {
//         handleApiError(error, 'addUserAddress')
//         return error
//     }
// }

export const deleteUser = async (userId: string): Promise<any> => {
    try {
        const response = await instancePrivate.delete(
            `${ApiEndPoints.USER}/${userId}`
        )

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getUserOrders = async (userId: string): Promise<any> => {
    try {
        const response = await instancePrivate.get(
            `${ApiEndPoints.ORDERS}/userorders/${userId}`
        )
        console.log(response.data);
        
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

//////////////////////////////////////////////////// Products //////////////////////////////////////////////////////

export const getWebsiteData = async () => {
    try {
        const response = await instance.get(ApiEndPoints.PROFILE)
        console.log(response.data);
        
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}
export const getProducts = async (filters: SearchParams) => {
    try {
        const response = await instance.get(ApiEndPoints.PRODUCT, {
            params: filters,
        })

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getOneProduct = async (productId: string): Promise<any> => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.PRODUCT}/${productId}`
        )
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}
// ---------------------------------------------------Search Products----------------------------------------------
type Filters = {
    name?: string
    category?: string
    subCategory?: string
    brand?: string
    next?: string | null | unknown
    limit?: number
    sort?: string
    order?: string
}
export const fetchProducts = async (filters: Filters): Promise<any> => {
    try {
        const response = await instance.get(`${ApiEndPoints.PRODUCT}`, {
            params: filters,
        })
        console.log(response.data.products)

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getRelatedProducts = async (productId: string | undefined) => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.PRODUCT}/related/${productId}`
        )
        console.log(response.data)

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}
// ---------------------------------------------------Categories----------------------------------------------

export const getCategories = async (): Promise<any> => {
    try {
        const response = await instance.get(ApiEndPoints.CATEGORIES)

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getOneCategory = async (id: string): Promise<any> => {
    try {
        const response = await instance.get(`${ApiEndPoints.CATEGORIES}/${id}`)
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

//                           -------------------------SubCategories----------------
export const getSubCategories = async (category: string): Promise<any> => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.SUB_CATEGORIES}/${category}`
        )
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getOneSubCategory = async (
    subCategoryID: string | null
): Promise<any> => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.SUB_CATEGORIES}/${subCategoryID}`
        )
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

// ---------------------------------------------------Brands----------------------------------------------

export const getBrands = async (): Promise<any> => {
    try {
        const response = await instance.get(ApiEndPoints.BRANDS)
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getOneBrand = async (brandId: string): Promise<any> => {
    try {
        const response = await instance.get(`${ApiEndPoints.BRANDS}/${brandId}`)
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}
export const getCarouselMedia = async (): Promise<any> => {
    try {
        const response = await instance.get(`${ApiEndPoints.MEDIA}/carousel`)
        console.log(response.data)

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}
export const getBanners = async (): Promise<any> => {
    try {
        const response = await instance.get(`${ApiEndPoints.MEDIA}/banner`)
        console.log(response.data)

        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

//////////////////////////////////////////////////// cart //////////////////////////////////////////////////////

export const AddToCart = async (product: any, auth: any) => {
    console.log(product, auth, 'from instance')

    try {
        const response = await instancePrivate.post('/user/cart', {
            productId: product._id,
            quantity: 1,
            userId: auth.userId,
        })
        console.log(response)
    } catch (err) {
        errorMessage(err)
    }
}

export const transCartToAPI = async (userId: string, localStorageCart: any) => {
    try {
        const response = await instancePrivate.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/cart/add/many`,
            { userId, products: localStorageCart }
        )
        console.log(response)
        return response
    } catch (error) {
        errorMessage(error)
        return error
    }
}

export const fetchCartItems = async (axiosPrivate: any, auth: any) => {
    try {
        const userId: any = auth.userId
        const response = await axiosPrivate.get('/user/cart/items', {
            withCredentials: true,
            params: { userId },
        })
        return response
    } catch (error) {
        errorMessage(error)
    }
}

export const cartItemQuantity = async (
    axiosPrivate: any,
    userId: string,
    productId: string,
    quantity: number | string
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
        errorMessage(error)
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
        errorMessage(error)
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
        errorMessage(error)
    }
}

export const getCoupon = async (axiosPrivate:any, couponName:any) => {
    try {
        const response = await axiosPrivate.get('/coupon/coupon', {
            couponName,
        })
        console.log(response)
        return response
    } catch (error) {
        errorMessage(error)
    }
}

export const applyCoupon = async (
    axiosPrivate:any,
    userId:any,
    couponCode:any,
    cartTotalPrice:any
) => {
    
    try {
        const response = await axiosPrivate.patch('/coupon/apply/coupon', {
            couponCode,
            userId,
            cartTotalPrice,
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

//------------------------------------------------- wishList ------------------------------------------------------

export const addToWishList = async (productId: any, userId: any) => {
    try {
        const response = await instancePrivate.post('/wishlist', {
            productId,
            userId,
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const transLocalWishListToAPI = async (products: any, userId: any) => {
    try {
        const response = await instancePrivate.post(
            '/wishlist/wishlist/add/many',
            { products, userId }
        )
        console.log(response.data)
        console.log(
            'wishlist is now moved from localStorage to api successfully !!!!'
        )
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const getWishList = async (userId: any) => {
    try {
        const response = await instance.get(`/wishList/${userId}`)
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

export const removeProductFromWishList = async (
    userId: any,
    productId: any
) => {
    try {
        const response = await instancePrivate.patch('/wishList', {
            userId,
            productId,
        })
        console.log(response.data, 'product removed successfully from wishlist')
        return response.data
    } catch (error) {
        errorMessage(error)
    }
}

//////////////////////////////////////////////////// Orders //////////////////////////////////////////////////////

export const getOrder = async ({ axiosPrivate, orderId }: any) => {
    try {
        const response = await axiosPrivate.get(`/order/${orderId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error while getting the order', error);
        return error;
    }
}

export const getUserAllOrders = async ({ axiosPrivate, userId }: any) => {
    try {
        const response = await axiosPrivate.get(`/order/user/orders/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error while getting the order', error);
        return error;
    }
}

export const createOrder = async (
    axiosPrivate:any,
    auth:any,
    deliveryMethod:any,
    paymentMethod:any,
    shippingAddress:any
) => {
    try {
        const response = await axiosPrivate.post('/order', {
            userId: auth.userId,
            deliveryMethod,
            paymentMethod,
            shippingAddress,
        })
        console.log(response)
        return response
    } catch (error) {
        errorMessage(error)
    }
}

export const cancelOrder = async ({
    axiosPrivate,
    orderId,
    userId
}: {
    axiosPrivate: any
    orderId: string
    userId:any
}) => {
    try {
        const response = await axiosPrivate.patch('/order/cancel', {
            orderId: orderId,userId
        })
        console.log(response)
    } catch (error) {
        errorMessage(error)
    }
}

export const setThePaymentURL = async ({ axiosPrivate, orderId, paymentURL }: any) => {
    try {
        const response = await axiosPrivate.post('/payment/setPaymentURL', { orderId, paymentURL });
        console.log(response.data);
        return response.data;
    } catch (error) {
        errorMessage(error)
    }
}

// export const getThePaymentURLs = async ({ axiosPrivate, userId }: any) => {
//     try {
//         const response = await axiosPrivate.get(`/payment/paymentURL/${userId}`);
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error while getting the URLs', error);
//     }
// };

export const setOrderPaymentSuccessStatus = async ({ orderId, userId, InvoiceStatus }: any) => {
    console.log(orderId, userId, InvoiceStatus);
    try {
        const response = await instancePrivate.patch(`/order/success`, { orderId, userId, InvoiceStatus })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error while setting Order Payment Status', error)
    }
}
export const setOrderPaymentFailureStatus = async ({ orderId, TransactionStatus, Error, ErrorCode }: any) => {
    console.log(orderId, TransactionStatus, Error, ErrorCode);
    try {
        const response = await instancePrivate.patch(`/order/failure`, { orderId, TransactionStatus, Error, ErrorCode })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error while setting Order Payment Status', error)
    }
}

//////////////////////////////////////////////////// Payment //////////////////////////////////////////////////////

export const availablePayment = async (InvoiceAmount: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/initiate`, {
            InvoiceAmount,
            CurrencyIso: 'KWD',
        })
        return response
    } catch (error) {
        errorMessage(error)
    }
}

export const executePayment = async (payload: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/execute`, payload)
        console.log(response)
        return response.data
    } catch (error) {
        console.error('error while executing payment', error)
        return error
    }
}

export const paymentStatus = async (Key: PaymentStatus) => {
    console.log(Key);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/status`, { Key })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error while getting payment status', error);
        return error;
    }
}

// -----------------------------Customer Review-----------------------------------------

type ReviewPost = {
    userId: string
    productId: string | undefined
    rate?: number
    comment?: string
    reviewId?: string
}
export const addReview = async (data: ReviewPost) => {
    try {
        const response = await instance.post(`${ApiEndPoints.REVIEW}`, data)
        return response.data
    } catch (err) {
        errorMessage(err)
    }
}
//

export const getReviews = async (productId: string) => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.REVIEW}/${productId}`
        )
        return response.data
    } catch (err) {
        errorMessage(err)
    }
}

export const deleteReview = async (reviewId: string) => {
    try {
        const response = await instance.delete(
            `${ApiEndPoints.REVIEW}/${reviewId}`
        )
        return response.data
    } catch (err) {
        errorMessage(err)
    }
}

export const getReview = async (data: ReviewPost) => {
    try {
        const response = await instance.get(
            `${ApiEndPoints.REVIEW}/oneReview`, {
            params: data
        }
        )
        return response.data
    } catch (err) {
        errorMessage(err)
    }
}
export const updateReview = async (data: ReviewPost) => {
    try {
        const response = await instance.patch(`${ApiEndPoints.REVIEW}/`, data)
        return response.data
    } catch (err) {
        errorMessage(err)
    }
}
