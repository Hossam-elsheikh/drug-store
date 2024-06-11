import React from 'react'

type AboutProps = {
    details?: string;
}

function About({ details }: AboutProps) {
    return (
        <section className="p-4 md:p-6 mt-6 md:mt-10 text-wrap ">
            <h1 className="text-lg font-semibold border-b-2">About this item</h1>
            <p className="mt-4 text-base font-normal leading-7 text-gray-800">
                {details ? details : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis commodi sit maiores corporis veniam voluptatem excepturi sint molestias debitis nesciunt dolore, hic soluta eveniet, delectus, aperiam earum magni illum dolores!"}
            </p>
        </section>
    )
}

export default About
