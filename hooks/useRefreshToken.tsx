import { instance } from "@/axios/instance";
import useAuth from "./useAuth"

const useRefreshToken = () => {

    const { setAuth }: any = useAuth()

    const refresh = async () => {

        const response = await instance.post('/user/refresh-token');

        setAuth((prevState: any) => {

            console.log('New Access state: ', response.data);

            return { ...prevState, userId: response.data.userId }
        })
        return response.data;
    }
    return refresh
}

export default useRefreshToken;