import React from 'react'

type DataTypes = {
    inputName: string;
    info: string;
    isLast: boolean;
}

function InputName({ inputName, info, isLast }: DataTypes) {
    return (
        <div className={`flex space-x-3 py-3 ${isLast ? "" : "border-b"}`}>
            <p className="font-medium">{inputName}:</p>
            <p>{info}</p>
        </div>
    )
}

export default InputName