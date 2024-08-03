import AuthContext from "@/context/AuthProvider";
import { useContext } from "react"

const useAuth = () => {
    const { auth }: any = useContext(AuthContext);
    return useContext(AuthContext);
}

export default useAuth;