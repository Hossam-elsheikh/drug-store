import React from 'react'
import { Search } from 'lucide-react'

const SearchMed = () => {
  return (
    <div className='flex items-center relative gap-3 '>
    <Search className='absolute left-2'/>
        <input className='px-9 py-2 bg-transparent' type='search' placeholder='search any medicine...'/>
    </div>
  )
}

export default SearchMed