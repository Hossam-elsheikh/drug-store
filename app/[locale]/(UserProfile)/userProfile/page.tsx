'use client'
import { useTranslations } from 'next-intl';
import UserProfileModal from '@/components/UserProfile/userprofile/UserProfileModal';
import UserProfileInfo from '@/components/UserProfile/userprofile/UserProfileInfo';
import { useContext } from 'react';
import { UserContext } from '@/context/UserProvider';
import UserProfilePassword from '@/components/UserProfile/userprofile/UserProfilePassword';


export default function UserProfile() {
  const t = useTranslations("UserInfoPage");
    const { userInfo, isLoading, isError, error } = useContext(UserContext)

   
    return (<>

            <div className='flex justify-between'>
            <h1 className="text-2xl p-3 md:text-3xl font-base mb-4 md:mb-0">{t('userInfo')}</h1>
            <div className='flex flex-row gap-1'>
            <UserProfileModal userInfo={userInfo}  />
            <UserProfilePassword  />
            </div>
        </div>
                <div>
            <UserProfileInfo userInfo={userInfo} isLoading={isLoading} isError={isError} error={error}/>
                </div>
    </>
    );
}
