import { pharmacyCat } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
const BannerGrid1 = () => {
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <div className='cols-1 flex  rounded-xl overflow-hidden relative'>
      <Image src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={700} height={700} className='object-cover hover:scale-110 duration-300 transition cursor-pointer hover:opacity-75 rounded-xl'/>
      <h2 className='absolute p-3 bg-gradient-to-b from-slate-600 to-transparent min-w-full text-white font-semibold text-xl '>{pharmacyCat[0].name}</h2>
        <button className='bg-white text-sm shadow-lg text-primaryColor font-semibold absolute bottom-5 right-5 p-3 px-4 hover:scale-105 transition rounded-3xl'>Know more</button>
      </div>
      <div className='cols-1 flex  rounded-xl overflow-hidden relative'>
      <Image src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={700} height={700} className='object-cover hover:scale-110 duration-300 transition cursor-pointer hover:opacity-75 rounded-xl'/>
      <h2 className='absolute p-3 bg-gradient-to-b from-slate-600 to-transparent min-w-full text-white font-semibold text-xl '>{pharmacyCat[0].name}</h2>
        <button className='bg-white text-sm shadow-lg text-primaryColor font-semibold absolute bottom-5 right-5 p-3 px-4 hover:scale-105 transition rounded-3xl'>Know more</button>
      </div>
      <div className='cols-1 flex  rounded-xl overflow-hidden relative'>
      <Image src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={700} height={700} className='object-cover hover:scale-110 duration-300 transition cursor-pointer hover:opacity-75 rounded-xl'/>
      <h2 className='absolute p-3 bg-gradient-to-b from-slate-600 to-transparent min-w-full text-white font-semibold text-xl '>{pharmacyCat[0].name}</h2>
        <button className='bg-white text-sm shadow-lg text-primaryColor font-semibold absolute bottom-5 right-5 p-3 px-4 hover:scale-105 transition rounded-3xl'>Know more</button>
      </div>
      
    </div>
  )
}

export default BannerGrid1
