"use client"
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButtons';

Autoplay.globalOptions = { delay: 7000, stopOnInteraction: false, stopOnMouseEnter :true};

type PharmacyCategory = {
    name: string;
    image: string;
};

type ProductCarouselProps = {
    items: PharmacyCategory[];
};

export default function HeroCarousel({ items }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (<>
        <div className='overflow-hidden relative  rounded-2xl mt-4 m-auto cursor-pointer' ref={emblaRef}>
            <div className='flex  h-[500px] relative'>
                {items?.map((item, i) => (
                    <div key={i} className='relative  flex-[0_0_100%] w-full h-full'>
                        <Image
                            quality={80}
                            src={item.image}
                            alt={item.name}
                            fill
                            objectFit="cover"
                            className="cursor-pointer object-cover"
                        />
                    </div>
                ))}
            </div>
        <div className=' inset-0 flex items-center justify-between px-4 z-10 '>
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
    );
}
