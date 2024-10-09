'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleProvider';
import { useTranslations } from 'next-intl';

const TermsAndConditions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("terms");
  const {dir} = useLocale()






  return (
    <div className={`max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md `} dir={dir}>
     

      <div
    
       
        className="overflow-hidden"
      >
        <div className="mt-4 text-gray-700">
          <h2 className="text-xl font-bold mb-4">{t('termsAndConditions')}</h2>
          <p className="mb-2 font-medium">{t('welcome')}</p>
          <ol className="list-decimal list-inside space-y-2">
            {[...Array(10)].map((_, index) => (
              <li className='font-medium' key={index}>{t(`term${index + 1}`)}</li>
            ))}
          </ol>
          <p className="mt-4">{t('agreement')}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;