'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/LocaleProvider';
import { collaborations } from '@/lib/utils';
import Container from '../Container';
import { Instagram } from 'lucide-react';

export default function AboutCollaborations() {
    const { dir } = useLocale();
    const t = useTranslations('collaborations');

    return (
        <Container className="max-w-[1400px]" dir={dir}>
            <section id="collaborations" className="py-24" dir={dir}>
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 border-b-2 pb-4"
                >
                    {t('partnersTitle')}
                </motion.h2>
                <div className="max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-center mb-16 text-gray-600"
                    >
                        {t('partnersDescription')}
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-3">
                        {collaborations.map((collab, index) => (
                            <motion.div
                                key={collab.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className={`flex items-center justify-center h-48 ${collab.key ? 'bg-black' : 'bg-gray-100'}`}>
                                    <Image
                                        src={collab.logo}
                                        alt={`${collab.name} logo`}
                                        width={120}
                                        height={120}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-4 text-center">
                                        {collab.name}
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <a
                                            href={collab.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Website
                                        </a>
                                        {collab.instagram && (
                                            <a
                                                href={collab.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primaryColor hover:underline font-medium"
                                            >
                                                <Instagram size={20} />
                                                Instagram
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Container>
    );
}