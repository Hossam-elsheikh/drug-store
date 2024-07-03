import { instance } from "@/axios/instance"
import useAuth from "./useAuth"

const useRefreshToken = () => {

    const { setAuth }: any = useAuth()

    const refresh = async () => {

        const response = await instance.post('/user/refresh-token', {
            withCredentials: true
        });

        setAuth((prevState: any) => {

            console.log('Previous state: ', JSON.stringify(prevState));
            console.log('New Access state: ', response.data);

            return { ...prevState, accessToken: response.data.accessToken, userId: response.data.userId }
        })
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;