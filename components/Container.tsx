import { twMerge } from "tailwind-merge";

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
    dir?: string;

};

const Container = ({ children, className, title, dir = 'ltr' }: Props) => {
    return (
        <section dir={dir} className={twMerge(` mx-2 my-5 md:my-9 lg:mx-auto w-full px-2 lg:px-0 lg:w-4/5   max-w-[980px]  ${dir && 'gap-2'}`, className)}>

            {title && (
                <div className="flex justify-between items-center mb-10 ">
                    <h1 className='text-xl w-fit   border-b-4 border-secColor font-semibold'>{title}</h1>
                    <button className="flex w-fit px-4 py-2 rounded-full bg-primaryColor text-slate-100 font-medium  hover:bg-primaryColor transition duration-300">View More</button>
                </div>

            )}
            {children}
        </section>
    );
};

export default Container;
