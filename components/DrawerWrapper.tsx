import React from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from './ui/drawer'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import image from '../public/logo.png'
function DrawerWrapper() {
return (
<div>
<Drawer direction='left'>
    <DrawerTrigger><Menu/></DrawerTrigger>
    <DrawerContent>
        <DrawerHeader>
            <Image
            src={image}
            alt='logo'
            width={200}
            height={200}
            />
        </DrawerHeader>
    </DrawerContent>
</Drawer>
</div>
)
}

export default DrawerWrapper