'use client'
import { locales } from '@/i18n'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'


function LanguageSwitcher({ currentLoc }: { currentLoc: string }) {

    let router = useRouter()
    const pathName = usePathname()

    const switchLanguage = (newLocale:string) => {
        const newPath = pathName.replace(`/${currentLoc}`,`/${newLocale}`);
        router.replace(newPath)
    }

    const handleChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        switchLanguage(event.target.value)
    }

    return (
        <div>
            <select onChange={handleChange} value={currentLoc}>                
                {locales.map((loc)=>(
                    <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSwitcher