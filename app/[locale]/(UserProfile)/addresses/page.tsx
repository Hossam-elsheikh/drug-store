import AddressesModal from '@/components/UserProfile/Addresses/AddressesModal'
import React from 'react'
import addImage from '@/public/undraw_add_files_re_v09g.svg'
import Image from 'next/image';
import { useTranslations } from 'next-intl';


export default function Addresses() {
    const Addresses: any = [];

    const t = useTranslations("AddressPage");
    return (<>
        <div className='flex justify-between'>
            <h1 className="text-2xl md:text-3xl font-base mb-4 md:mb-0"> {t('yourAddresses')}</h1>
            <AddressesModal />
        </div>
        <div>
            {Addresses.length === 0 ? (
                <div className='items-center flex flex-col h-fit w-full'>
                    <div className="w-full max-w-md">
                        <Image src={addImage} layout="responsive" width={100} height={100} alt="No items in the wish list" />
                    </div>
                    <h1 className='text-lg'>No items in the wish list.</h1>
                </div>
            ) : (
                Addresses.map((item, i) => (
                    <div key={i}>
                        <div>hi</div>
                    </div>
                ))
            )}
        </div>
    </>

    )
}

