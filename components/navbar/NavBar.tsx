import Link from 'next/link'
import React from 'react'
import DrawerWrapper from '../DrawerWrapper'
// import { useTranslation } from 'next-i18next';

const NavBar = () => {
  // const { t } = useTranslation();

  return (
    <div className='flex gap-2 p-5 border-2 bg-slate-100'>
      <DrawerWrapper/>
      <ul>
        <Link href="/cat1">cat1</Link>
        <Link href="/cat2">cat2</Link>
        <Link href="/cat3">cat3</Link>
        <Link href="/cat4">cat4</Link>
      </ul>
      <div>
      {/* <h1>{t('welcome')}</h1>
      <button>{t('message')}</button> */}
    </div>
    </div>
    
  )
}

export default NavBar