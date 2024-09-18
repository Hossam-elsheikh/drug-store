'use client'
import { locales } from '@/i18n'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDownIcon, Earth, Globe } from 'lucide-react'
import { useLocale } from '@/context/LocaleProvider'

function LanguageSwitcher({ classes }: { classes: string }) {
    const { locale: currentLoc, switchLanguage, dir } = useLocale();

    return (
        <div className={classes}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className=' focus:outline-none outline-none'>
                    <Button variant='ghost' className='m-0 p-1 rounded-full focus:outline-none outline-none ring-0 focus:ring-0  text-gray-700 gap-2 hover:bg-gray-100 duration-200' >
                        <Earth className='w-6 h-6' />{currentLoc.toUpperCase()}   <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {locales.map((loc: any) => (
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
