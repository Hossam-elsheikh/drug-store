'use client'
import { UserRound, Search, Heart, ShoppingCart } from 'lucide-react'
import React from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import DrawerWrapper from '../DrawerWrapper'

const Icons = ({ currentLoc }: { currentLoc: string }) => {
  return (
    <div className='flex items-center gap-3'>
        <LanguageSwitcher  currentLoc={currentLoc} />

      <UserRound className='cursor-pointer' />
      <Heart className='cursor-pointer' />
      <div className='flex items-center bg-secColor p-2 px-4 hover:bg-primaryColor hover:scale-105 cursor-pointer transition rounded-3xl text-white gap-2 '>
    <p className='font-semibold'>My Cart</p>
      <ShoppingCart />
      </div>
      <Search />
      <DrawerWrapper currentLoc={currentLoc} showSec='signInForm' />
      <DrawerWrapper currentLoc={currentLoc} showSec='wishList' />
      <DrawerWrapper currentLoc={currentLoc} showSec='cart' />
    </div>
  )
}

export default Icons