import NavBar from "@/components/navbar/NavBar";
import Link from 'next/link'
export default function Home({params:{lng}}) {
  return (
    <div>
      <NavBar />
    <Link href={`/${lng}`}></Link>
    </div>
  );
}
