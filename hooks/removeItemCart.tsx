
const HookRemoveItemCart = ({auth,cartItem,removeItemCartMutation,calculateCartMutation}:any) => {
    try {
        const userId = auth.userId;
        const productId = cartItem.productId._id;
        removeItemCartMutation.mutate(
            { userId, productId },
            {
                onSuccess: () => {
                    calculateCartMutation.mutate();
                }
            }
        );
    } catch (error) {
        console.error("error while cancelling the order", error);
    }
};

export default HookRemoveItemCart;