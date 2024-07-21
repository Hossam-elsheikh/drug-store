'use client'
import { locales } from '@/i18n'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, Globe } from 'lucide-react'
import { useLocale } from '@/context/LocaleProvider'

function LanguageSwitcher({ classes }: { classes: string }) {
    const { locale: currentLoc, switchLanguage, dir } = useLocale();

    return (
        <div className={classes}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className=' m-0 p--1 ' >
                        <Globe className='m-0.5' />{currentLoc.toUpperCase()} <ChevronDown className='' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {locales.map((loc) => (
                        <DropdownMenuItem className='cursor-pointer ' key={loc} onClick={() => switchLanguage(loc)}>
                            {loc.toUpperCase()}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default LanguageSwitcher;
