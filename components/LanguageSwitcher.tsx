'use client'
import { locales } from '@/i18n'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'


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
            {/* <DropdownMenu>
                <DropdownMenuTrigger>
                <Button >Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    
                </DropdownMenuContent>
            </DropdownMenu> */}
            {/* <select onChange={handleChange} value={currentLoc}>                
                {locales.map((loc)=>(
                    <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                ))}
            </select> */}
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button variant='secondary' >{currentLoc.toUpperCase()}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {locales.map((loc) => (
                        <DropdownMenuItem key={loc} onClick={() => handleChange(loc)}>
                            {loc.toUpperCase()}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LanguageSwitcher