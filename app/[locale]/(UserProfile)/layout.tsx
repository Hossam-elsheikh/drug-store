'use client'
import Container from "@/components/Container";
import ASidebar from "@/components/UserProfile/Aside";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <main >
            <Container dir="rtl" className='max-w-[1500px] flex my-20'>
                <ASidebar path={pathname} />

                <div className='bg-[#F8F7F4] flex-grow p-10 rounded-lg shadow-sm '>
                    {children}
                </div>
            </Container>
        </main>
    );
}