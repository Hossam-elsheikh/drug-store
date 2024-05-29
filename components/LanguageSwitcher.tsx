'use client'
import { locales } from '@/i18n'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Globe} from 'lucide-react'


function LanguageSwitcher({ currentLoc }: { currentLoc: string }) {

    let router = useRouter()
    const pathName = usePathname()

    const switchLanguage = (newLocale:string) => {
        const newPath = pathName.replace(`/${currentLoc}`,`/${newLocale}`);
        router.replace(newPath)
        setDocumentDir(newLocale)
    }

    const handleChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        switchLanguage(event.target.value)
    }

    const setDocumentDir = (locale:string)=>{
        const RTL = 'ar'
        const direction = RTL.includes(locale)?'rtl':'ltr'
        document.documentElement.setAttribute('dir',direction)
    }

    useEffect(()=>{
        setDocumentDir(currentLoc)
    },[currentLoc])

    return (
        <div className={`flex items-center gap-1`}>
            <Globe />             
            <select className='bg-transparent outline-none cursor-pointer' onChange={handleChange} value={currentLoc}>   
                {locales.map((loc)=>(
                    <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSwitcher