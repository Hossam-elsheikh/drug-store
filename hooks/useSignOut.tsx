import { instance } from "@/API/instance";
import useAuth from "./useAuth";

const useSignOut = () => {
    const { setAuth }: any = useAuth()
    const signOut = async () => {
        try {
            const response = await instance.post('/user/sign-out',{}, {
                withCredentials: true,
            })
            setAuth(null)
            console.log(response);
        } catch (error) {
            console.error('Error during sign out:',error);
        }
    }
    return signOut;
}

export default useSignOut;