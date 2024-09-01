import React from 'react';
import { motion } from 'framer-motion';



const QuickAccess = ({ setIsModalOpen, t }: QuickAccessProps) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: 1,
            transition: { duration: 0.3 },
        }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-20 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white px-4 py-2 rounded-full text-primaryColor hover:bg-gray-50  hover:text-gray-900 font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secColor focus:ring-opacity-50"
            >
                {t("quickView")}
            </button>
        </motion.div>
    </motion.div>
);

export default QuickAccess;
