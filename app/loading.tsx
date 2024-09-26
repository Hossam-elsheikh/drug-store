'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useContext } from 'react'
import WebsiteProfileCtx from '@/context/WebsiteProfileContext'

export default function Loading() {
    const [isVisible, setIsVisible] = useState(false)
    const { logo } = useContext(WebsiteProfileCtx)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                        opacity: { duration: 0.5, ease: 'easeInOut' },
                        y: { duration: 0.3, ease: 'easeInOut' },
                    }}
                    className="flex items-center justify-center min-h-screen bg-gray-100"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-300 rounded-full opacity-20 blur-xl" />
                        <motion.div
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 1.7,
                                ease: 'easeInOut',
                                repeat: Infinity,
                            }}
                            className="relative z-10"
                        >
                            <Image
                                src={logo}
                                alt="Logo"
                                width={400}
                                height={400}
                                unoptimized
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
