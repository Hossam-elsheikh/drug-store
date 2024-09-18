// SectionTitle.tsx
import React from 'react'

type DataTypes = {
    title: string;
    children: any;
}

function SectionTitle({ title, children }: DataTypes) {
    return (
        <div className='py-4 border-b border-gray-200'>
            <h2 className="text-2xl font-bold text-gray-800 p-2 ">{title}</h2>
            <div className="rounded-md shadow-sm border p-3 space-y-2 border-gray-200">{children}</div>
        </div>
    )
}

export default SectionTitle