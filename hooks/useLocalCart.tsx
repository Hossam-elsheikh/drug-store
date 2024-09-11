import { addToLocalCart } from "@/redux/slices/addToCart";
import { useDispatch, useSelector } from "react-redux";

type DataType = {
    product: Object;
}

export const useLocalCart = () => {
    const localCartSelector = useSelector((state: any) => state.localCart);
    const dispatch = useDispatch();
    const addToLocalCartDispatch = async (product: DataType) => {
        try {
            dispatch(addToLocalCart(product))
            console.log('product added successfully to localStorage',product);
        } catch (error) {
            console.error('error while adding product to local cart', error)
        }
    }
    return { localCartSelector, addToLocalCartDispatch }
}