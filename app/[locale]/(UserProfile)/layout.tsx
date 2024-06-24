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
        <main className="relative">
            <Container dir="rtl" className='max-w-[1500px] flex my-20 flex-col md:flex-row'>
                <div className="md:w-64 md:flex-shrink-0">
                    <ASidebar path={pathname} />
                </div>
                <div className='bg-[#F8F7F4] flex-grow p-10 rounded-lg shadow-sm min-h-[2000px]'>
                    {children}
                </div>
            </Container>
        </main>
    );
}