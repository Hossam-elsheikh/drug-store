

// const calcCartPrice = async (cartItems, setCartTotalPrice) => {
//     try {
//         const totalPrice = await cartItems.data.reduce((accumulator, currentValue) => {
//             return accumulator + (currentValue.productId.price * currentValue.quantity)
//         }, 0)
//         setCartTotalPrice(totalPrice)
//         return totalPrice
//     } catch (error) {
//         console.error('error while calculating the total price', error);
//     }
// }


// export default calcCartPrice

// const calcCartPrice = (cartItems) => {
//     try {
//         const totalPrice = cartItems.reduce((accumulator, currentValue) => {
//             return accumulator + currentValue.productId.price * currentValue.quantity;
//         }, 0);
//         return totalPrice;
//     } catch (error) {
//         console.error("Error while calculating the total price", error);
//         throw error;
//     }
// };

// export default calcCartPrice;