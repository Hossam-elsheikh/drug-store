'use client'
import { getWebsiteData } from "@/axios/instance";
import { useQuery } from "@tanstack/react-query";
import {  createContext, use, useEffect, useState } from "react";

const WebsiteProfileCtx = createContext({
    logo:'',
    name:{
        en:'',
        ar:''
    }
})

export const WebProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [logo,setLogo] = useState('')
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    const [name,setName] = useState({
        en:'',
        ar:''
    })
    
    const profileQuery = useQuery({
        queryKey:['web profile'],
        queryFn: getWebsiteData
    })   

    useEffect(()=>{
        setLogo(`${imagePath}${profileQuery?.data?.logo}`)
        setName(profileQuery?.data?.name)
    },[profileQuery,imagePath])

    return (
        <WebsiteProfileCtx.Provider value={{ logo,name }}>
            {children}
        </WebsiteProfileCtx.Provider>
    )
}

export default WebsiteProfileCtx