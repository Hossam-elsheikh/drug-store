import React, { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

function Counter() {
    const [Count, setCount] = useState(0)
    return (
        <div className="flex items-center">
            <button type="button" disabled={Count === 5} onMouseDown={() => setCount(count => count + 1)} className="inline-flex px-2 py-2  shrink-0 items-center justify-center text-[#6bd9ff] rounded-md   bg-secColor hover:opacity-75 focus:outline-none  active:scale-90 duration-200 ">
                <Plus />
            </button>
            <input type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={Count} required />
            <button type="button" disabled={Count === 0} onMouseDown={() => setCount(count => count - 1)} className="inline-flex px-2 py-2 shrink-0 items-center justify-center rounded-md text-red-600    bg-red-200 hover:opacity-75 focus:outline-none  active:scale-90 duration-200 ">
                <Minus />
            </button>
        </div>
    )
}

export default Counter
