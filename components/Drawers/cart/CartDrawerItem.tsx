import Counter from '@/components/ItemCard/Counter'
import Image from 'next/image'
import React from 'react'
import { Trash2 } from 'lucide-react'

type Props= {
    details : {
        title:string,
        image:string,
        src:string,
        price: number
    }
}
export default function CartDrawerItem({details}:Props) {
  return (
    <div className='flex justify-between gap-2 border-b py-4 h-30 shadow my-1  items-center'>
        <div className='w-1/3'>
            <Image src={details.image} width={100} height={100} objectFit='cover' alt={details.title}/>
        </div>
        <div className='px-2'>
            <h3 className='text-sm max-w-22 '>{details.title}</h3>
            <p>{details.price} KWD</p>
            <div className='flex items-center justify-between '>
                <Counter/>
                <Trash2  className='text-red-400 cursor-pointer hover:text-red-500'/>
            </div>
        </div>
    </div>
  )
}
