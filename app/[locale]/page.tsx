'use client'
import Container from '@/components/Container'
import CatCarousel from '@/components/Carousels/CatCarousel'
import HeroCarousel from '@/components/HeroSection/HeroCarousel'
import BannerGrid1 from '@/components/Banners/BannerGrid1'
import ProductsCarousel from '@/components/Carousels/ProductsCarousel'
import VerticalBanner from '@/components/Banners/VerticalBanner'
import image from '@/public/image.png'
import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@/context/LocaleProvider'
import { getCategories, getCarouselMedia, getBanners } from '@/axios/instance'
import Loading from '../loading'

function Home() {
    const { locale } = useLocale()
    const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH || ''

    const categoryQuery = useQuery({
        queryKey: ['cats'],
        queryFn: getCategories,
    })
    const mediaQuery = useQuery({
        queryKey: ['carousel'],
        queryFn: getCarouselMedia,
    })
    const bannersQuery = useQuery({
        queryKey: ['banner'],
        queryFn: getBanners,
    })
    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="flex flex-col items-center">
                    <Container className="max-w-[1600px] ">
                        <HeroCarousel items={mediaQuery?.data} />
                    </Container>
                    <Container className="max-w-[1600px] ">
                        <CatCarousel items={categoryQuery?.data} />
                    </Container>
                    {/* <Container className="max-w-[1600px]  items-center">
                        <BannerGrid1 />
                    </Container> */}
                    {categoryQuery?.data
                        ?.slice(0, 5)
                        .map((c: any, i: number) => {
                            return (
                                <>
                                    <Container
                                        key={c._id}
                                        catId={c._id}
                                        slug={c.slug}
                                        className="max-w-[1600px] border-b-2 rounded-none  items-center"
                                        title={c.name[locale]}
                                    >
                                        <ProductsCarousel
                                            mode="full"
                                            catId={c._id}
                                        />
                                    </Container>
                                    <Container className="max-w-[1600px] border-b-2 rounded-none  items-center">
                                        <VerticalBanner
                                            image={
                                                bannersQuery?.data?.length > 0
                                                    ? `${imagePath}${bannersQuery?.data[i]?.image}`
                                                    : image
                                            }
                                        />
                                    </Container>
                                </>
                            )
                        })}
                </div>
            </Suspense>
        </>
    )
}

export default Home
