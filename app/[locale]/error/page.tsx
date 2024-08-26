import { OctagonAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className="justify-center flex text-center py-20 ">
      <div className="space-y-10 ">
        <OctagonAlert className=' mx-auto size-[100px] ' />
        <p className="  font-semibold text-xl px-3">Something Went Wrong</p>
        <p className="px-3"></p>
        <Link href={'/'} className="mx-auto p-3  rounded-md text-white font-medium bg-[#5ac5e7] hover:bg-[#198ab0] transition-all">Return To Home</Link>
      </div>
    </div>
  )
}

export default page