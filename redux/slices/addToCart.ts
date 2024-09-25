import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const localCartSlice = createSlice({
    name: "localCart",
    initialState: {
        localCartProducts: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('products') || '[]') : [],
        localCartTotal: 0,
    },

    reducers: {
        addToLocalCart: (state, action) => {
            let quantity = 1;
            // const productId ={_id: action.payload._id}
            const productId = action.payload    
            const existingProduct = state.localCartProducts.find((prd: any) => prd.productId._id === productId._id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.localCartProducts.push({ productId, quantity });
            }
            localStorage.setItem('products', JSON.stringify(state.localCartProducts));
        },
        localCartItemQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const product = state.localCartProducts.find((prd: any) => prd.productId._id === _id);
            product.quantity = quantity;
            localStorage.setItem('products', JSON.stringify(state.localCartProducts));
        },
        localCartDeleteItem: (state, action) => {
            state.localCartProducts = state.localCartProducts.filter((prd: any) => prd.productId._id != action.payload);            
            localStorage.setItem('products',JSON.stringify(state.localCartProducts));
        },
        localCartTotalPrice: (state) => {
            const total = state.localCartProducts.reduce((accu: any, currentValue: any) => {
                const product = currentValue.productId;
                return accu + product.price * currentValue.quantity;
            }, 0);
            state.localCartTotal = total;
        }
    }
})

export const { addToLocalCart, localCartItemQuantity, localCartDeleteItem, localCartTotalPrice } = localCartSlice.actions;
export default localCartSlice.reducer;