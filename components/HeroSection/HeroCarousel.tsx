'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButtons'

Autoplay.globalOptions = {
    delay: 7000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
}

type PharmacyCategory = {
    _id: string
    title: string
    image: string
}

type ProductCarouselProps = {
    items: PharmacyCategory[]
}

export default function HeroCarousel({ items }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi)
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH

    return (
        <>
            <div
                className="overflow-hidden relative  rounded-2xl mt-4 m-auto cursor-pointer"
                ref={emblaRef}
            >
                <div className="flex  h-[500px] relative">
                    {items?.map((item) => (
                        <div
                            key={item._id}
                            className="relative  flex-[0_0_100%] w-full h-full"
                        >
                            <Image
                                quality={80}
                                src={`${imagePath}${item.image}`}
                                alt={item.title}
                                fill
                                objectFit="cover"
                                className="cursor-pointer object-cover duration-[2s] transition-all"
                            />
                        </div>
                    ))}
                </div>
                <div className=" inset-0 flex items-center justify-between px-4 z-10 ">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
        </>
    )
}
