import React from 'react'
import Image from "next/image";
import Link from 'next/link'
const NavBar = () => {
  return (
    <div>
          <ul>
        <Link href="/cat1">cat1</Link>
        <Link href="/cat2">cat2</Link>
        <Link href="/cat3">cat3</Link>
        <Link href="/cat4">cat4</Link>
      </ul>
    </div>
  )
}

export default NavBar