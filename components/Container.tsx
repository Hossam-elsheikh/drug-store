import { twMerge } from "tailwind-merge";

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
    dir?: string;
};

const Container = ({ children, className, title, dir = 'ltr' }: Props) => {
    return (
        <section dir={dir} className={twMerge(`mx-auto text-center  my-5 rounded-lg max-w-[980px] p-6 ${dir && 'gap-2' }`, className)}>
            {title && (<h1 className='text-xl w-fit  border-b-4 border-secColor mb-4 font-semibold'>{title}</h1>)}
            {children}
        </section>
    );
};

export default Container;
