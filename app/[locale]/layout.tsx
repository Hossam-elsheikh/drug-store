import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server'
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "../../providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Drug Store",
    description: "GYour best online pharmacy",
};

export default async function RootLayout({
    children,
    params: { locale },
    // showNavBar = true,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
    showNavBar?: boolean;
}>) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            {/* <header>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            </header> */}

            <body className={inter.className}>
                <AuthProvider>
                    <ReactQueryProvider>
                        <NextIntlClientProvider messages={messages}>
                            {/* {showNavBar && <NavBar currentLoc={locale} />} */}
                            <NavBar currentLoc={locale} />
                            {children}
                            <Footer />
                        </NextIntlClientProvider>
                    </ReactQueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
