import Link from 'next/link'
import React from 'react'
import DrawerWrapper from '../DrawerWrapper'
import LanguageSwitcher from '../LanguageSwitcher'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import logo from '@/public/logo.svg'
import Icons from './Icons'
import CategoriesBar from './CategoriesBar'
const NavBar = ({ currentLoc }: { currentLoc: string }) => {



  return (
    <div className='flex flex-col' >

      <div className='flex items-center justify-between gap-4 border-2 px-5 py-3 bg-slate-100'>
        <Image width="140" height="140" alt='logo' src={logo} />

        <Icons currentLoc={currentLoc}/>
      </div>
      <CategoriesBar currentLoc={currentLoc} />
    </div>

  )
}

export default NavBar