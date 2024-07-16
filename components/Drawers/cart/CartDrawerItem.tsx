'use client'
import Counter from "@/components/ItemCard/Counter";
import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/favoriteProvider";

type Props = {
    details: {
        title: string;
        image: string;
        src: string;
        price: number;
    };
    mode?: "cart" | "Favorites";
};

export default function CartDrawerItem({ details, mode = "cart" }: Props) {
    const { addToFavorites, deleteFavorite } = useFavorites()

    return (
        <div className="flex justify-between gap-2 border-b py-4 h-30 shadow my-1 items-center rounded-lg p-2">
            <div className="w-1/3">
                <Image
                    src={details.image}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt={details.title}
                />
            </div>
            <div className="px-2">
                <h3 className="text-sm max-w-22">{details.title}</h3>
                <p>{details.price} KWD</p>
                <div className="flex items-center justify-between mt-2">
                    {mode === "cart" ? (
                        <Counter />
                    ) : (
                        <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-all active:scale-[.90] duration-300" onMouseDown={() => addToFavorites(details)}>
                            <Heart className="text-pink-500 w-5 h-5" />
                        </button>
                    )}
                    <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all active:scale-[.95] duration-300 ml-2" onMouseDown={() => deleteFavorite(details)}>
                        <Trash2 className="text-red-500 w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}