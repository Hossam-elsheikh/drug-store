import { useMutation, useQueryClient } from "@tanstack/react-query";
import {cancelItemCart} from "@/axios/instance";

const removeItemMutation = (axiosPrivate:any)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, productId }: any) => cancelItemCart({ axiosPrivate, userId, productId }),
        onSuccess: () => queryClient.invalidateQueries(),
    });
}

export default removeItemMutation;