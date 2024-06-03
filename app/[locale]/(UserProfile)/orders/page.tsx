'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import addImage from '@/public/undraw_add_files_re_v09g.svg';

export default function Orders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAddresses, setFilteredAddresses] = useState<{ id: number; name: string; }[]>([]);
    const addresses = [
        // Sample address data for demonstration
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
        <>
            <div className='flex justify-between'>
                <h1>Orders</h1>
                <form onSubmit={handleSearch}>
                    <label htmlFor="search">Search In Your Orders</label>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                {filteredAddresses.length === 0 ? (
                    <div className='items-center flex flex-col h-fit w-full'>
                        <div className="w-full max-w-md">
                            <Image
                                src={addImage}
                                layout="responsive"
                                width={100}
                                height={100}
                                alt="No items in the wish list"
                            />
                        </div>
                        <h1 className='text-lg'>No items in the wish list.</h1>
                    </div>
                ) : (
                    filteredAddresses.map((item) => (
                        <div key={item.id}>
                            <div>{item.name}</div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
