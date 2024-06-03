import React from 'react';
import Image from 'next/image'; // Importing the Image component

import faceBook from '@/public/mage--facebook-square.svg';
import Instagram from '@/public/mdi--instagram.svg';
import Twitter from '@/public/hugeicons--new-twitter.svg';

const Icons = [
    { icon: faceBook, path: 'https://www.facebook.com', name: 'Facebook' },
    { icon: Instagram, path: 'https://www.instagram.com', name: 'Instagram' },
    { icon: Twitter, path: 'https://www.twitter.com', name: 'Twitter' }
];

function FooterIcons() {
    return (
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">DevOnion</a>. All Rights Reserved.</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
                {Icons.map((icon, i) => (
                    <a href={icon.path} key={i} className=" hover:scale-[1.1] duration-300 dark:hover:text-white">
                        <div className="relative w-7 h-7">
                            <Image 
                                src={icon.icon}
                                alt={`${icon.name} page`}
                                layout="responsive"
                                width={24}
                                height={24}
                            />
                        </div>
                        <span className="sr-only">{icon.name} page</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default FooterIcons;