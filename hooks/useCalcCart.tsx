import CalcCartContext from "@/context/CalcCartProvider";
import { useContext } from "react"

const useCalcCart = ()=>{
    const {calcCart}:any = useContext(CalcCartContext)
    return useContext(CalcCartContext)
}

export default useCalcCart;