
import axios from "axios";

enum ApiEndPoints {
	PRODUCT = "/product",
	PRODUCT_SEARCH = "/Product/search",
	USER = "/user",
	ORDERS = "/order",
	CATEGORIES = "/category",
	SUB_CATEGORIES = "subCategory",
	BRANDS = "/brand",
}

const API_URL = process.env.API_URL || "http://localhost:4000";

export const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

export const instancePrivate = axios.create({
	baseURL: API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

const handleApiError = (error: unknown, context: string): never => {
	console.error(`Error in ${context}:`, error);
	throw error;
};

interface ProductSearchParams {
	page?: number;
	search?: string;
}

// ---------------------------------------------------Products----------------------------------------------


export const getProducts = async ({
    page = 1,
    search,
}: ProductSearchParams = {}): Promise<any> => {
    try {
        const endpoint = search
            ? ApiEndPoints.PRODUCT_SEARCH
            : ApiEndPoints.PRODUCT;
        const params = { page, ...(search && { search }) };
        const response = await instance.get(endpoint, { params });
        return response.data;
    } catch (error) {
        handleApiError(error, "getProducts");
    }
};

export const getOneProduct = async (productId: string): Promise<any> => {
	try {
		const response = await instance.get(
			`${ApiEndPoints.PRODUCT}/${productId}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getOneProduct");
	}
};

// ---------------------------------------------------User----------------------------------------------
export const getUser = async (userId: string): Promise<any> => {
	try {
		const response = await instancePrivate.get(
			`${ApiEndPoints.USER}/${userId}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getUser");
	}
};

export const updateUser = async (userId: string, data: any): Promise<any> => {
	try {
		const response = await instancePrivate.patch(
			`${ApiEndPoints.USER}/${userId}`,
			data
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "updateUser");
	}
};
export const deleteUser = async (userId: string): Promise<any> => {
	try {
		const response = await instancePrivate.delete(
			`${ApiEndPoints.USER}/${userId}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error, "deleteUser");
	}
};

export const getUserOrders = async (userId: string): Promise<any> => {
	try {
		const response = await instancePrivate.get(
			`${ApiEndPoints.ORDERS}/${userId}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getUserOrders");
	}
};

// ---------------------------------------------------Categories----------------------------------------------

export const getCategories = async (): Promise<any> => {
	try {
		const response = await instance.get(ApiEndPoints.CATEGORIES);
		return response.data;
	} catch (error) {
		handleApiError(error, "getCategories");
	}
};

export const getOneCategory = async (id: string): Promise<any> => {
	try {
		const response = await instance.get(`${ApiEndPoints.CATEGORIES}/${id}`);
		return response.data;
	} catch (error) {
		handleApiError(error, "getOneCategory");
	}
};

//                           -------------------------SubCategories----------------
export const getSubCategories = async (category: string): Promise<any> => {
	try {
		const response = await instance.get(
			`${ApiEndPoints.SUB_CATEGORIES}/${category}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getSubCategories");
	}
};

export const getOneSubCategory = async (
	subCategoryID: string
): Promise<any> => {
	try {
		const response = await instance.get(
			`${ApiEndPoints.SUB_CATEGORIES}/${subCategoryID}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getOneSubCategory");
	}
};

// ---------------------------------------------------Brands----------------------------------------------

export const getBrands = async (): Promise<any> => {
	try {
		const response = await instance.get(ApiEndPoints.BRANDS);
		return response.data;
	} catch (error) {
		handleApiError(error, "getBrands");
	}
};

export const getOneBrand = async (brandId: string): Promise<any> => {
	try {
		const response = await instance.get(
			`${ApiEndPoints.BRANDS}/${brandId}`
		);
		return response.data;
	} catch (error) {
		handleApiError(error, "getOneBrand");
	}
};
