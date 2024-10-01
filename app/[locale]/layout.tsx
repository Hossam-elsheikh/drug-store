import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import NavBar from '@/components/navbar/NavBar'
import Footer from '@/components/Footer/Footer'
import ReactQueryProvider from '../../providers/ReactQueryProvider'
import { AuthProvider } from '@/context/AuthProvider'
import AuthPersistProvider from '@/providers/AuthPersistProvider'
import { UserProvider } from '@/context/UserProvider'
import { ProductsProvider } from '@/context/ProductsProvider'
import { LocaleProvider } from '@/context/LocaleProvider'
import { FavoritesProvider } from '@/context/favoriteProvider'
import ReduxStoreProvider from '@/redux/provider'
import { Suspense } from 'react'
import Loading from '../loading'
import { ReactLenis } from '@/lib/lenis'
import { Toaster } from 'sonner'
import { WebProfileProvider } from '@/context/WebsiteProfileContext'

const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--inter',
})
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--roboto',
})
export const metadata: Metadata = {
    title: 'Drug Store',
    description: 'GYour best online pharmacy',
}

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode
    params: { locale: 'en' | 'ar' }
}>) {
    const messages = await getMessages()
    return (
        <html lang={locale}>
            <ReactQueryProvider>
                <WebProfileProvider>
                    <ReduxStoreProvider>
                        <LocaleProvider initialLocale={locale}>
                            <NextIntlClientProvider messages={messages}>
                                <AuthProvider>
                                    <AuthPersistProvider>
                                        <ProductsProvider>
                                            <FavoritesProvider>
                                                <UserProvider>
                                                    <body
                                                        className={`${roboto.variable} ${inter.variable}`}
                                                    >
                                                        {/* <div id="modal-root"></div> */}
                                                        <div className="flex h-[100dvh] flex-col justify-between ">
                                                            <div>
                                                                <Suspense
                                                                    fallback={
                                                                        <Loading />
                                                                    }
                                                                >
                                                                    <NavBar />
                                                                    {children}
                                                                    <Toaster
                                                                        richColors
                                                                        position="top-center"
                                                                        closeButton
                                                                    />
                                                                </Suspense>
                                                            </div>
                                                            <Footer />
                                                        </div>
                                                    </body>
                                                </UserProvider>
                                            </FavoritesProvider>
                                        </ProductsProvider>
                                    </AuthPersistProvider>
                                </AuthProvider>
                            </NextIntlClientProvider>
                        </LocaleProvider>
                    </ReduxStoreProvider>
                </WebProfileProvider>
            </ReactQueryProvider>
        </html>
    )
}