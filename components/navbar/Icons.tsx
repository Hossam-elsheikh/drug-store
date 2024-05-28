'use client'
import { UserRound, Search, Heart, ShoppingCart } from 'lucide-react'
import React from 'react'
import DrawerWrapper from '../DrawerWrapper'

const Icons = ({ currentLoc }: { currentLoc: string }) => {
  return (
    <div className='flex items-center gap-3'>
      <Search />
      <DrawerWrapper currentLoc={currentLoc} showSec='signInForm' />
      <DrawerWrapper currentLoc={currentLoc} showSec='wishList' />
      <DrawerWrapper currentLoc={currentLoc} showSec='cart' />
    </div>
  )
}

export default Icons