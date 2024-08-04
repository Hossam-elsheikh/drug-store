import { calcCart } from "@/axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCalcCartMutation = ({ axiosPrivate, auth }: any) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => calcCart({ axiosPrivate, auth }),
        onSuccess: () => queryClient.invalidateQueries(),
    })
}

export default useCalcCartMutation