"use client"

import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"
import Autoplay from 'embla-carousel-autoplay';

Autoplay.globalOptions = { delay: 3000, stopOnInteraction:false}



type PharmacyCategory = {
    name: string;
    image: string;
};

type ProductCarouselProps = {
    items: PharmacyCategory[];
};

function ProductCarousel({ items }: ProductCarouselProps) {
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [Autoplay()])

    return (
        <div className='overflow-hidden cursor-pointer' ref={emblaRef}>
            <div className='flex'>
                {items?.map((item, i) => (
                    <div key={i} className='flex-[0_0_100%]  p-2'>
                        <Image
                            quality={80}
                            src={item.image}
                            alt={item.name}
                            // layout="responsive"
                            fill
                            className="cursor-pointer rounded-lg"
                        />
                        {/* <div className='text-center mt-2'> */}
                            <h2 className='font-bold text-lg'>{item.name}</h2>
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCarousel
