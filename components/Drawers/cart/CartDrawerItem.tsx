'use client'
import Counter from "@/components/ItemCard/Counter";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/favoriteProvider";
import useAuth from "@/hooks/useAuth";
import useRemoveItemCart from "@/hooks/removeItemCart";
import { useLocale } from "@/context/LocaleProvider";
import { useDispatch } from "react-redux";
import { localCartDeleteItem } from "@/redux/slices/addToCart";
import { useEffect } from "react";

type Props = {
    cartItem: {
        title: string;
        image: string;
        src: string;
        price: number;
        productId: any;
        quantity: number;
    };
    removeItemCartMutation: any;
    calculateCartMutation: any;
    auth: any;
    mode?: "cart" | "Favorites";
};
export default function CartDrawerItem({ cartItem, mode = "cart", removeItemCartMutation, calculateCartMutation, auth }: Props) {

    const { locale } = useLocale()
    // export default function CartDrawerItem({ details, mode = "cart" }: Props) {
    // const { addToFav, deleteFav } = useContext(FavContext)

    // const {_id, price,name,brand,image,description}=details

    const removeItemCart = () => useRemoveItemCart({ auth, cartItem, removeItemCartMutation, calculateCartMutation })

    const dispatch=useDispatch()
    const removeLocalCartItem = ()=>{
        try{
            const id = cartItem.productId._id;
            dispatch(localCartDeleteItem(id))
            console.log('prd deleted successfully from localstorgae');
        }catch(error){
            console.error('error while delete item from local cart',error);
        }
    }

    return (
        <div className="flex justify-between gap-2 border-b py-4 h-30 shadow my-1 items-center rounded-lg p-2">
            <div className="w-1/3">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cartItem?.productId?.image}`}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt={cartItem?.title}
                />
            </div>
            <div className="px-2">
                <h3 className=" text-sm max-w-22">{cartItem?.productId.name?.[locale]}</h3>
                <p className="font-semibold text-sm">{cartItem?.productId.price} <span className="text-xs font-medium">KWD</span></p>
                <div className="flex items-center justify-between mt-2">
                    {mode === "cart" ?
                        <>
                            <Counter
                                cartItem={cartItem}
                                itemQuantity={cartItem?.quantity}
                                calculateCartMutation={calculateCartMutation}
                            />
                            <button onClick={auth&&auth.userId?removeItemCart:removeLocalCartItem} className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all active:scale-[.95] duration-300 ml-2" >
                                <Trash2 className="text-red-500 w-5 h-5" />
                            </button>
                        </>
                        :
                        <>
                            <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-all active:scale-[.90] duration-300" onMouseDown={() => toggleFavorite(details)}>
                                <Heart className="text-pink-500 w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all active:scale-[.95] duration-300 ml-2" onMouseDown={() => deleteFav(cartItem)}>
                                <Trash2 className="text-red-500 w-5 h-5" />
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}