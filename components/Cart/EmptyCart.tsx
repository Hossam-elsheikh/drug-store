"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function EmptyCart() {
    const c = useTranslations("CartPage");
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-lg shadow-md"
        >
            <ShoppingCart className="mx-auto h-32 w-32 text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{c('emptyCartTitle')}</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{c('emptyCartDescription')}</p>
            <Link
                href={'/'}
                className="inline-flex items-center justify-center w-48 text-center text-white font-medium py-3 px-6 bg-[#363955] rounded-full hover:bg-[#3a3c57] transition duration-300 group gap-3"
            >
                {c('startShopping')}
                <ArrowRight className=" group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    )
}

export default EmptyCart
