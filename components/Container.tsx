import { useLocale } from '@/context/LocaleProvider'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type Props = {
    children: React.ReactNode
    className?: string
    title?: string
    dir?: string
    catId?: string
    slug?: string
}

const Container = ({ children, className, title, catId, slug }: Props) => {
    const { locale, dir } = useLocale()

    return (
        <section
            dir={dir}
            className={twMerge(
                ` mx-2 my-5 md:my-9 lg:mx-auto w-full px-2 lg:px-0 lg:w-4/5   max-w-[980px]  ${
                    dir && 'gap-2'
                }`,
                className
            )}
        >
            {title && (
                <div className="flex justify-between items-center mb-10 ">
                    <h1 className="text-xl w-fit   border-b-4 border-secColor font-semibold">
                        {title}
                    </h1>
                    <Link
                        href={{
                            pathname: `/${locale}/${slug}`,
                            query: { ref: catId, name: title },
                        }}
                        className="flex w-fit px-4 py-2 rounded-full bg-primaryColor text-slate-100 font-medium  hover:bg-secColor transition duration-300"
                    >
                        {locale === 'en' ? 'View More' : 'عرض المزيد'}
                    </Link>
                </div>
            )}
            {children}
        </section>
    )
}

export default Container
