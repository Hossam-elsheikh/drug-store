import { instancePrivate } from "@/axios/instance"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"
import { useEffect } from "react"

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth }: any = useAuth()

    useEffect(() => {

        const requestIntercept = instancePrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer  ${auth?.accessToken}`
                }
                if (auth?.userId) {
                    config.headers['id'] = auth.userId;
                }
                return config;
                
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = instancePrivate.interceptors.response.use(
            response => response,
            //if the request failed cuz of expired access token
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    prevRequest.headers['id'] = auth.userId;

                    return instancePrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            instancePrivate.interceptors.request.eject(requestIntercept)
            instancePrivate.interceptors.response.eject(responseIntercept)
        }
    }, [auth, refresh])

    return instancePrivate
}

export default useAxiosPrivate