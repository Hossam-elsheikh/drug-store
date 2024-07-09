'use client'
import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../public/logowithoutBG.png'


function Loading() {
    return (
        <motion.div className='bg-[#282a3f]/[0.2] h-dvh w-dvh flex justify-center items-center'>
            <section><Image src={logo} width={300} height={300} alt='logo' /> </section>
        </motion.div>
    )
}

export default Loading
