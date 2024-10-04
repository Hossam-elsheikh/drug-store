'use client'
import { getWebsiteData } from '@/axios/instance'
import { useQuery } from '@tanstack/react-query'
import { createContext, use, useEffect, useState } from 'react'
const initialState = {
    logo: '',
    websiteName: {
        en: '',
        ar: '',
    },
    websiteDesc: {
        en: '',
        ar: '',
    },
    twitterX: '',
    facebook: '',
    instagram: '',
    linkedIn: '',
    fav: '',
    footer: '',
    businessEmail: '',
    businessNumber: '',
    businessWhatsapp: '',
}
const WebsiteProfileCtx = createContext(initialState)

export const WebProfileProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    const [data, setData] = useState(initialState)

    const profileQuery = useQuery({
        queryKey: ['web profile'],
        queryFn: getWebsiteData,
    })

    useEffect(() => {
        setData({
            ...profileQuery?.data,
            logo: `${imagePath}${profileQuery?.data?.logo}`,
            fav: `${imagePath}${profileQuery?.data?.fav}`,
            footer: `${imagePath}${profileQuery?.data?.footer}`,
        })
    }, [profileQuery, imagePath])

    return (
        <WebsiteProfileCtx.Provider value={{ ...data }}>
            {children}
        </WebsiteProfileCtx.Provider>
    )
}

export default WebsiteProfileCtx
