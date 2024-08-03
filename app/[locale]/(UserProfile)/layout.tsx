'use client'
import Container from "@/components/Container";
import ASidebar from "@/components/UserProfile/Aside";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const { dir } = useLocale();

    return (
        <main className="relative">
            <Container dir={dir} className='max-w-[1500px] flex my-20 flex-col md:flex-row'>
                <div className="md:w-64 md:flex-shrink-0">
                    <ASidebar mode='userProfile' path={pathname} />
                </div>
                <div className=' flex-grow p-5 rounded-lg shadow-md border'>
                    {children}
                </div>
            </Container>
        </main>
    );
}