'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import addImage from '@/public/undraw_add_files_re_v09g.svg';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import UserOrderInfo from '@/components/UserProfile/order/UserOrderInfo';

export default function Orders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAddresses, setFilteredAddresses] = useState<{ id: number; name: string; }[]>([]);

    const t = useTranslations("OrderPage");
    const addresses = [
        { id: 1, name: 'Order 1' },
        { id: 2, name: 'Order 2' },
        { id: 3, name: 'Order 3' },
    ];

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filtered = addresses.filter((address) =>
            address.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAddresses(filtered);
    };

    return (
        <div className="container mx-auto px-4 ">
            <div className='flex flex-col md:flex-row justify-between items-center '>
                <h1 className="text-2xl p-3 md:text-3xl font-base  md:mb-0">{t('orders')}</h1>
                <form onSubmit={handleSearch} className='w-full md:w-auto'>
                    <div className='relative'>
                        <input
                            className='w-full md:w-64 p-2 pr-10 rounded-lg outline-none  focus:outline-none focus:shadow-md duration-200 '
                            placeholder='search in Your Orders'
                            id="search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500'
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </form>
            </div>
            <div>
                {/* {filteredAddresses.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-64'>
                        <div className="w-full max-w-xs mb-4">
                            <Image
                                src={addImage}
                                layout="responsive"
                                width={100}
                                height={100}
                                alt="No items in the wish list"
                            />
                        </div>
                        <h2 className='text-xl text-gray-600'>{t('noItems')}</h2>
                    </div>
                ) : ( */}
                    <div className="grid grid-cols-1  gap-4">
                        {addresses.map((item) => (
                            <div key={item.id} >
                              <UserOrderInfo 
  dir="ltr"
  orderState="shipped"
/>
            
                            </div>
                        ))}
                    </div>
                {/* )} */}
            </div>
        </div>
    );
}