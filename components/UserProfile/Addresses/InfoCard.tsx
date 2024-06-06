import React from 'react';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { LocateIcon, MapPin, Pencil, Trash2 } from 'lucide-react';

// This prop determines the direction of the text
function InfoCard({ dir = 'ltr' }) {

    return (
        <Container dir={dir}  className={`bg-[#ffffff] shadow-md p-5 rounded-lg `}>
            <div className='flex justify-between'>
                <h1 className="flex gap-3 text-lg"> <MapPin className='text-gray-500'/>Address Title</h1>
                <div className='flex gap-2'>
                    <button className='flex items-center gap-1 px-3 py-2 bg-transparent border border-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white hover:border-transparent rounded shadow-md transition duration-300 ease-in-out text-sm active:scale-95'>
                        <Pencil className='w-4 h-4' />
                        Edit
                    </button>
                    <button type="button" className="flex items-center gap-1 px-3 py-2 bg-red-700 text-white hover:bg-red-800 rounded shadow-md transition duration-300 ease-in-out text-sm active:scale-95">
                        <Trash2 className='w-4 h-4' />
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-3 gap-2 text-gray-600 text-lg">
                <h4 className=''>Name</h4>
                <h4 className="col-start-1 row-start-2">Phone</h4>
                <h4 className="col-start-1 row-start-3">Address</h4>
                <div className="col-start-2 row-start-1">My Name is fk</div>
                <div className="col-start-2 row-start-2">my address is this</div>
                <div className="col-start-2 row-start-3">my phone is this</div>
            </div>
        </Container>
    );
}

export default InfoCard;
