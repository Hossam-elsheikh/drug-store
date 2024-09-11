import React from 'react'
import { transCartToAPI } from "@/axios/instance"
import { useMutation } from "@tanstack/react-query"
import useAuth from "./useAuth"


export const useTransLocalCartAPI = (auth:any,localStorageCart:any)=>{

    // handle the transfer of the local storage cart to the API.
	// This mutation will be triggered after a successful user sign-in.
	const transToAPI_Mutation = useMutation({

		mutationFn: () => transCartToAPI(auth.userId, localStorageCart),
		//on successful response the localStorage will be deleted
		onSuccess: () => localStorage.removeItem('products'),
		onError: (error) => console.log('error while mutation trans to cart api', error),
		
	})
    return {transToAPI_Mutation,localStorageCart}
}