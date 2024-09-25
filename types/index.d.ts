// -------------------------------------------------USER

interface Address {
    state: string
    city: string
    street: string
    _id: string
}

interface CartItem {
    productId: string
    quantity: number
    _id: string
}
declare interface UserProfileInfoProps {
    userInfo: UserInfo | null
    isLoading: boolean
    isError: boolean
    error?: unknown
}
declare interface User {
    _id: string
    name: string
    email: string
    password: string
    addresses: Address[]
    wishList: any[]
    mobile: string
    failedLoginAttempts: number
    createdAt: string
    updatedAt: string
    __v: number
    refreshToken: string
    cart: CartItem[]
}

interface FormValues {
    input: string
}

export type Product = {
    name: {
        en: string
        ar: string
    }
    description: {
        en: string
        ar: string
    }
    _id: string
    slug: string
    subCategory: {
        name: {
            en: string
            ar: string
        }
        _id: string
        parentCategory: string
        slug: string
    }
    category: {
        name: {
            en: string
            ar: string
        }
        _id: string
        slug: string
    }
    brand: {
        name: {
            en: string
            ar: string
        }
        _id: string
        slug: string
    }
    price: number
    stock: number
    netPrice: number
    sale: number
    sold: number
    image: string
    customerReviews: any[]
    createdAt: string
    updatedAt: string
    __v: number
}

interface SearchElementProps {
    Product: Product
    staggerItem: {}
}

declare interface SubCategory {
    name: {
        en: string
        ar: string
    }
    _id: string
    parentCategory: string
    slug: string
}

declare interface Brand {
    name: {
        en: string
        ar: string
    }
    _id: string
    slug: string
}

declare interface Category {
    name: {
        en: string
        ar: string
    }
    _id: string
    slug: string
    image: string
}

// Cart Item type
declare interface CartItem {
    title: string
    image: string
    src: string
    price: number
    productId: any
    quantity: number
    _id:any
}

type ReviewData = {
    comment: string
    rating: number
    createdAt?: string
}

type TotalPrice = {
    data: {
        cartTotalPrice: number
    }
}

// ----------------------------------------Pages----------------------------------------

// ProductDetails

type ProductDetailsProps = {
    params: {
        locale: string
        ['collection-slug']: string
        ['product-slug']: string
    }
}

// --------------------------------------------------------
interface QuickAccessProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    t: (key: string) => string
}
