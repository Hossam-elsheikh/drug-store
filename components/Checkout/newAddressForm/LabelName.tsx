import React from 'react'

function LabelName({labelName}:any) {
    return (
        <div>
            <p className="my-auto px-2 font-medium w-[60px] text-center ">
                {labelName}
            </p>
        </div>
    )
}

export default LabelName