import {instance} from "@/API/instance"
import useAuth from "./useAuth"

const useRefreshToken = () => {

    const { setAuth }: any = useAuth()

    const refresh = async () => {

        const response = await instance.post('/user/refresh-token', {
            withCredentials: true
        });

        setAuth((prevToken: object) => {

            console.log('Previous Token: ', JSON.stringify(prevToken));

            console.log(response.data);

            return { ...prevToken, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;
