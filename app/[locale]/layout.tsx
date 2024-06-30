import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "../../providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthProvider";
import CustomerReview from "@/components/CustomerReview/CustomerReview";
import { FavProvider } from "@/context/favoriteProvider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--inter",
});
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--roboto",
});
export const metadata: Metadata = {
    title: "Drug Store",
    description: "GYour best online pharmacy",
};

export default async function RootLayout({

    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <body className={`${roboto.variable} ${inter.variable}`}>
                <AuthProvider>

                    <ReactQueryProvider>

                        <NextIntlClientProvider messages={messages}>
                            <FavProvider>

                                <div id="modal-root"></div>
                                <div className="flex h-[100dvh] flex-col justify-between ">
                                    <div>
                                        <NavBar currentLoc={locale} />
                                        {children}
                                    </div>


                                    <Footer />
                                </div>
                            </FavProvider>
                        </NextIntlClientProvider>
                    </ReactQueryProvider>
                </AuthProvider>

            </body>
        </html>
    );
}
