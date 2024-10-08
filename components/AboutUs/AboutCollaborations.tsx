
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/LocaleProvider';
import { collaborations } from '@/lib/utils';




export default function AboutCollaborations() {




    const { dir } = useLocale();
    const t = useTranslations('collaborations');

    return (
        <section id="collaborations" className="py-[100px]" dir={dir}>
            <h2 className="text-3xl font-bold text-center mb-8 border-b-2 p-5">
                {t('title')}
            </h2>
            <div className="max-w-3xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-lg text-center mb-8"
                >
                    {t('description')}
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {collaborations.map((collab, index) => (
                        <motion.div
                            key={collab.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
                        >
                            <Image
                                src={collab.logo}
                                alt={`${collab.name} logo`}
                                width={120}
                                height={120}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{collab.name}</h3>
                            <div className="flex space-x-4">
                                <a
                                    href={collab.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {t('website')}
                                </a>
                                {collab.instagram && (
                                    <a
                                        href={collab.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-600 hover:underline"
                                    >
                                        Instagram
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
