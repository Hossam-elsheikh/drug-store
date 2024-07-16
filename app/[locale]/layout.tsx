import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "../../providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthProvider";
import AuthPersistProvider from "@/providers/AuthPersistProvider";
import { UserProvider } from "@/context/UserProvider";
import { ProductsProvider } from "@/context/ProductsProvider";
import { LocaleProvider } from "@/context/LocaleProvider";

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
				<LocaleProvider initialLocale={locale}>
					<NextIntlClientProvider messages={messages}>
						<AuthProvider>
							<AuthPersistProvider>
								<ReactQueryProvider>
									<ProductsProvider>
										<UserProvider>
											<div id="modal-root"></div>
											<div className="flex h-[100dvh] flex-col justify-between ">
												<div>
													<NavBar />
													{children}
												</div>
												<Footer />
											</div>
										</UserProvider>
									</ProductsProvider>
								</ReactQueryProvider>
							</AuthPersistProvider>
						</AuthProvider>
					</NextIntlClientProvider>
				</LocaleProvider>
			</body>
		</html>
	);
}
