'use client'
import { UserRound, Search, Heart, ShoppingCart } from 'lucide-react'
import React from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import DrawerWrapper from '../Drawers/DrawerWrapper'

const Icons = ({ currentLoc }: { currentLoc: string }) => {
  return (
    <div className='flex items-center gap-2'>
      <LanguageSwitcher classes='hidden md:block' currentLoc={currentLoc} />
      <DrawerWrapper currentLoc={currentLoc} showSec='signInForm' />
      <DrawerWrapper currentLoc={currentLoc} showSec='wishList' />
      <DrawerWrapper currentLoc={currentLoc} showSec='cart' />

    </div>
  )
}

export default Icons