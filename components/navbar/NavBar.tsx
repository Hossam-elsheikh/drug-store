import Link from 'next/link'
import React from 'react'
import DrawerWrapper from '../DrawerWrapper'
import LanguageSwitcher from '../LanguageSwitcher'
import { useTranslations } from 'next-intl'

const NavBar = ({currentLoc}:{currentLoc:string}) => {

  const t = useTranslations("categories")

  return (
    <div className='flex gap-2 p-5 border-2 bg-slate-100'>
      <DrawerWrapper/>
      <ul>
        <Link href="/cat1">{t('home')}</Link>
        <Link href="/cat2">{t('allProducts')}</Link>
        {/* <Link href="/cat3">cat3</Link>
        <Link href="/cat4">cat4</Link> */}
        
        
      </ul>
    <LanguageSwitcher currentLoc={currentLoc}/>
    </div>
    
  )
}

export default NavBar