"use client";

import React from 'react';
import Container from '@/components/Container';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutUsContent } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/LocaleProvider';

function AboutInfo() {
    const { dir } = useLocale();
    const a = useTranslations('aboutUs');
    return (
        <Container className='max-w-[1400px]' dir={dir}>
            <section id="about-us" className="py-[100px]" dir={dir}>
                <h1 className="text-4xl font-bold text-center mb-8 border-b-2 p-5">{a('aboutPharmacySolutions')}</h1>

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: '150% 0px -200px 0px' }}
                    className="p-10 mb-8 bg-gray-100 rounded-lg"
                >
                    <h2 className="text-2xl font-semibold mb-4">{a('aboutPharmacySolutions')}</h2>
                    <p className="text-lg">{a('introduction')}</p>
                    <p className="text-lg">{a('location')}</p>
                    <p className="text-lg">{a('productRange')}</p>
                    <p className="text-lg">{a('vision')}</p>
                    <p className="text-lg">{a('mission')}</p>
                </motion.article>

                {aboutUsContent.map((item, index) => (
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: '150% 0px -200px 0px' }}
                        key={index}
                        className={`flex flex-col md:flex-row items-center p-10 mb-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} ${index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'}`}
                        dir={dir}
                    >
                        <motion.div className="flex-1 p-4">
                            <h2 className="text-2xl font-semibold mb-4">{a(item.title)}</h2>
                            <p className="text-lg">{a(item.description)}</p>
                        </motion.div>
                        <div className="flex-1 flex justify-center p-4">
                            <Image src={item.svg} alt={item.title} width={96} height={96} className="w-24 h-24" />
                        </div>
                    </motion.article>
                ))}
            </section>
        </Container>
    )
}

export default AboutInfo
