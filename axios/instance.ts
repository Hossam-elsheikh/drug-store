import axios from "axios";


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

export const getProducts = async () => {
	try {
		const response = await instance.get("/product");
		return response;
	} catch (error) {
		console.error("error getting products", error);
	}
};

export const getUser = async (userId: string) => {
	try {
		const response = await instancePrivate.get(`/user/${userId}`);
		return response;
	} catch (error) {
		console.error("error while getting user", error);
	}
};

export const updateUser = async (userId, data) => {
	try {
		const response = await instancePrivate.patch(`/user/${userId}`, data);
		return response;
	} catch (error) {
		console.error("error while updating user", error);
		throw error;
	}
};
export const deleteUser = async (userId: string) => {
	try {
		const response = await instancePrivate.delete(`/user/${userId}`);

		return response;
	} catch (error) {
		console.error("error while getting user", error);
	}
};

export const getOneProduct = async (productId: string) => {
	try {
		const response = await instance.get(`/product/${productId}`);
		return response;
	} catch (error) {
		console.error("error while getting product", error);
	}
};

export const getCategories = async () => {
	try {
		const response = await instance.get("/categories");
		return response;
	} catch (error) {
		console.error("error while getting categories", error);
	}
};
