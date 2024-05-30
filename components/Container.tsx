import { twMerge } from "tailwind-merge";

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
};

const Container = ({ children, className, title }: Props) => {
    return (
        <section className={twMerge("mx-auto max-w-[980px] px-6", className)}>
            {title && (<h1 className='text-lg font-semibold p-3 text-center  rounded-lg'>{title}</h1>)}

            {children}
        </section>
    );
};

export default Container;