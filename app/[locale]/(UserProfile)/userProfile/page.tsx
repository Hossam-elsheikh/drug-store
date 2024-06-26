'use client'
import CustomInput from '@/components/Form/CustomInput';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authFormProfile } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { DatePickerDemo } from '@/components/ui/date-picker';
import { useTranslations } from 'next-intl';
import UserProfileModal from '@/components/UserProfile/userprofile/UserProfileModal';
import UserProfileInfo from '@/components/UserProfile/userprofile/UserProfileInfo';

export default function UserProfile() {
  const t = useTranslations("UserInfoPage");
    const userInfo = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        dateOfBirth: "1990-01-01",
        gender: "Male"
    };
    return (<>

            <div className='flex justify-between'>
            <h1 className="text-2xl p-3 md:text-3xl font-base mb-4 md:mb-0">{t('userInfo')}</h1>
                <UserProfileModal/>
        </div>
                <div>
            <UserProfileInfo userInfo={userInfo} />
                </div>
    </>
    );
}
