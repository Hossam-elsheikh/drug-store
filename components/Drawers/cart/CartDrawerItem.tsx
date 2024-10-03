'use client'
import Counter from "@/components/ItemCard/Counter";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { FavoritesContext, useFavorites } from "@/context/favoriteProvider";
import useAuth from "@/hooks/useAuth";
import HookRemoveItemCart from "@/hooks/removeItemCart";
import { useLocale } from "@/context/LocaleProvider";
import { useDispatch } from "react-redux";
import { localCartDeleteItem } from "@/redux/slices/addToCart";
import { useContext, useEffect } from "react";
import { AddToCart, instancePrivate, removeProductFromWishList } from "@/axios/instance";
import { useLocalCart } from "@/hooks/useLocalCart";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
    cartItem: null | {
        title: string;
        image: string;
        src: string;
        price: number;
        productId: any;
        quantity: number;
        stock: number;
    };
    removeItemCartMutation: any | null;
    calculateCartMutation: any | null;
    auth: any | null;
    mode?: "cart" | "Favorites";
    details: any | null;
};
export default function CartDrawerItem({ cartItem, mode = "cart", removeItemCartMutation, calculateCartMutation, details }: Props) {

    const { auth }: any = useAuth()
    const removeItemCart = () => HookRemoveItemCart({ auth, cartItem, removeItemCartMutation, calculateCartMutation })
    
    const { locale } = useLocale()
    const { deleteFavorite } = useContext(FavoritesContext)

    //add to cart handler with API call
    const addToCartMutation = useMutation({
        mutationFn:(product: any) => AddToCart(product, auth),
        onSuccess(data, error, variables) {
            queryClient.invalidateQueries()
            toast.success('product added to cart Successfully!')
        },
        onError(error, variables, context) {
            toast.error("this product is out of stock")
        },
    })
    //add to cart handler with localStorage
    const { addToLocalCartDispatch } = useLocalCart()


    const dispatch = useDispatch()
    const removeLocalCartItem = () => {
        try {
            const id = cartItem?.productId._id;
            dispatch(localCartDeleteItem(id))
            console.log('prd deleted successfully from localstorgae');
        } catch (error) {
            console.error('error while delete item from local cart', error);
        }
    }

    const queryClient = useQueryClient()
    const removeProductFromWishListMutation = useMutation({
        mutationFn: (productId) => removeProductFromWishList(auth.userId, productId),
        onSuccess: () => queryClient.invalidateQueries(),
    })
    const RemoveProductFromWishList = (productId: any) => removeProductFromWishListMutation.mutate(productId)
console.log(details);

    return (
        <div className="flex justify-between gap-2 border-b py-4 h-30 shadow my-1 items-center rounded-lg p-2 hover:shadow-md duration-300">
            <div className=" flex w-32 h-32">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cartItem?.productId?.image || details.image}`}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt={cartItem?.title || details?.name?.[locale]}
                />
            </div>
            <div className="px-2">
                <h3 className=" text-sm max-w-22">{cartItem?.productId.name?.[locale] || details.name?.[locale]}</h3>
                <p className="font-semibold text-sm">{cartItem?.productId.price || details.price} <span className="text-xs font-medium">KWD</span></p>
                <div className="flex items-center justify-between mt-2 self-end">
                    {mode === "cart" ?
                        <>
                            <Counter
                                cartItem={cartItem}
                                itemQuantity={cartItem?.quantity}
                                calculateCartMutation={calculateCartMutation}
                            />
                            <button onClick={auth && auth.userId ? removeItemCart : removeLocalCartItem} className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all active:scale-[.95] duration-300 ml-2" >
                                <Trash2 className="text-red-500 w-5 h-5" />
                            </button>
                        </>
                        :
                        <div className="flex ml-14  ">
                            <button className="p-2 rounded-full bg-[#d9dcff] hover:bg-[#9aa0e6] transition-all active:scale-[.90] duration-300 disabled:bg-gray-300"
                                onClick={() => {
                                    if (details.stock === 0) {
                                        toast.error("This product is out of stock");
                                        return;
                                    }
                                    if (auth && auth.userId) {
                                        addToCartMutation.mutate(details);
                                        removeProductFromWishListMutation.mutate(details._id)
                                    } else {
                                        addToLocalCartDispatch(details);
                                        deleteFavorite(details);
                                    }
                                }}
                                disabled={details.stock === 0}
                            >
                                <ShoppingCart className="text-[#282a3f] w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all active:scale-[.95] duration-300 ml-2"
                                onClick={() => {
                                    if (auth && auth.userId) RemoveProductFromWishList(details._id)
                                    else deleteFavorite(details)
                                }}>
                                <Trash2 className="text-red-500 w-5 h-5" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}