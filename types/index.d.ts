interface FormValues {
    input: string
}

type Product = {
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
    netPrice: number
    sale: number
    sold: number
    image: string
    customerReviews: any[] // If you know the structure of customerReviews, replace `any` with the appropriate type
    createdAt: string // You could use Date type here if you plan to convert these strings into Date objects
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
}
