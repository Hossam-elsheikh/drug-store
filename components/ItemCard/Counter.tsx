import React, { useState } from 'react'
import { Minus, Plus  } from 'lucide-react'

function Counter() {
    const [Count, setCount] = useState(0)
  return (
    <div className="flex items-center">
          <button type="button" disabled={Count === 5}   onMouseDown={()=>setCount(count=>count+1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none  active:scale-90 duration-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 ">
                            <Plus/>
                        </button>
                        <input type="text" id="counter-input"  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={Count} required />
          <button type="button" disabled={Count === 0} onMouseDown={()=>setCount(count=>count-1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none  active:scale-90 duration-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <Minus/>
                        </button>
                    </div>
  )
}

export default Counter
