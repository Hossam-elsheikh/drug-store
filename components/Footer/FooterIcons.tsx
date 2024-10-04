import React from 'react';
import Image from 'next/image';

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
        <div className="sm:flex sm:items-center sm:justify-between p-3">
      
            <div className="flex mt-3 items-center gap-2">
                {Icons.map((icon, i) => (
                    <a href={icon.path} key={i} className="hover:scale-105 transition-transform duration-300">
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
