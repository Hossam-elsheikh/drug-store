import React from 'react'

type DataTypes = {
    title: string;
    children: any
}

function SectionTitle({ title, children }: DataTypes) {
    return (
        <div className='py-3'>
            <p className="text-xl font-medium pb-3">{title}</p>
            <div className="rounded-md border ">{children}</div>
        </div>
    )
}

export default SectionTitle