'use client'
import { locales } from '@/i18n'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, Globe } from 'lucide-react'


function LanguageSwitcher({ currentLoc }: { currentLoc: string }) {

    let router = useRouter()
    const pathName = usePathname()

    const switchLanguage = (newLocale: string) => {
        const newPath = pathName.replace(`/${currentLoc}`, `/${newLocale}`);
        router.replace(newPath)
        setDocumentDir(newLocale)
    }

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     switchLanguage(event.target.value)
    // }
    const handleChange = (newLocale: string) => {
        switchLanguage(newLocale)
    }
    const setDocumentDir = (locale: string) => {
        const RTL = 'ar'
        const direction = RTL.includes(locale) ? 'rtl' : 'ltr'
        document.documentElement.setAttribute('dir', direction)
    }

    useEffect(() => {
        setDocumentDir(currentLoc)
    }, [currentLoc])

    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className=' m-0 p--1 ' ><Globe className='m-0.5'/>{currentLoc.toUpperCase()} <ChevronDown className=''/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {locales.map((loc) => (
                        <DropdownMenuItem className='cursor-pointer ' key={loc} onClick={() => handleChange(loc)}>
                            {loc.toUpperCase()}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LanguageSwitcher