import React from 'react'
import Image from 'next/image'
const VerticalBanner = ({image}) => {
  return (
    <div className='flex max-h-44'>
        <Image height={300} width={1800} className='object-cover' src={image} alt='banner'/>
    </div>
  )
}

export default VerticalBanner