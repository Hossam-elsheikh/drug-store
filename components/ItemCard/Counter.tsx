import React, { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

function Counter() {
    const [Count, setCount] = useState(0)
    return (
        <div className="flex items-center ">
            <button type="button" disabled={Count === 5} onMouseDown={() => setCount(count => count + 1)} className="inline-flex px-[6px] py-1 shrink-0 items-center justify-center text-slate-100 rounded-full   bg-secColor hover:opacity-75 focus:outline-none  active:scale-90 duration-200 ">
                <Plus className='w-5'/>
            </button>
            <input type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={Count} required />
            <button type="button" disabled={Count === 0} onMouseDown={() => setCount(count => count - 1)} className="inline-flex px-[6px] py-1 shrink-0 items-center justify-center rounded-full text-white   bg-gray-500 hover:opacity-75 focus:outline-none disabled:bg-gray-300  active:scale-90 duration-200 ">
                <Minus className='w-5'/>
            </button>
        </div>
    )
}

export default Counter
