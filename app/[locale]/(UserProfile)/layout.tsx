'use client'

import Container from '@/components/Container'
import ASidebar from '@/components/UserProfile/Aside'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from '@/context/LocaleProvider'
import useAuth from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    const { dir, locale } = useLocale()
    const { auth }: any = useAuth()
    const router = useRouter()

    const userProfilePath = `/${locale}/userProfile`
    const userOrderPath = `/${locale}/orders`
    const userFavoritesPath = `/${locale}/favorites`

    useEffect(() => {
        if (!auth?.userId && pathname === userProfilePath ) {
            router.push('/')
        }
    }, [auth, router, pathname, userProfilePath])

    if (pathname === userProfilePath && !auth?.userId) {
        return null
    }



    return (
        <main >
            <Container
                dir={dir}
                className="max-w-[1500px] flex my-20 gap-4 flex-col md:flex-row"
            >
                <section className="md:w-64 md:flex-shrink-0 hidden md:block">
                    <ASidebar mode="userProfile" path={pathname} />
                </section>
                <section className=" flex-grow p-2 md:p-5 rounded-lg shadow-md md:border">
                    {children}
                </section>
            </Container>
        </main>
    )
}