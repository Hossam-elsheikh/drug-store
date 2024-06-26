import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PersistLogin = (WrappedComponent: React.ComponentType) => {

    const AuthComponent = (props: any) => {

        const [isLoading, setIsLoading] = useState(true)
        const refresh = useRefreshToken()
        const { auth }: any = useAuth()
        const router = useRouter()

        useEffect(() => {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                } catch (error) {
                    console.error(error);
                    router.push('/en/sign-in');

                } finally {
                    setIsLoading(false)
                }
            }
            !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
        }, [])

        useEffect(() => {
            console.log(`isLoading: ${isLoading}`);
            console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
        }, [isLoading])
        
        if (isLoading) return <div>Loading...</div>;
        return <WrappedComponent {...props} />;
    }
    return AuthComponent;   
}

export default PersistLogin;