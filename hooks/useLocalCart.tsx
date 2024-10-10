import { addToLocalCart, localCartTotalPrice } from "@/redux/slices/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type DataType = {
    product: Object;
}

export const useLocalCart = () => {
    const localCartSelector = useSelector((state: any) => state.localCart);
    const dispatch = useDispatch();
    const LocalCartTotalPrice = dispatch(localCartTotalPrice())
    const addToLocalCartDispatch = async (product: any) => {
        try {
            dispatch(addToLocalCart(product))
            toast.success("product added to cart Successfully!");
            // console.log('product added successfully to localStorage', product);
        } catch (error) {
            // console.error('error while adding product to local cart', error)
            toast.error("error while adding product to cart, try again later");
        }
    }
    return { localCartSelector, addToLocalCartDispatch }
}