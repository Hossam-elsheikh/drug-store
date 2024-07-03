import { products } from "@/lib/utils";
import CartDrawerItem from "../cart/CartDrawerItem";

export default function WishList() {
    return (
        <div className="h-dvh overflow-auto overflow-x-hidden p-2 pb-20 space-y-2 border-b-2">
            {products.map((prod, i) => (
                <div key={i}  >
                    <CartDrawerItem mode="whishList" details={prod} />
                </div>
            ))}
        </div>
    );
}
