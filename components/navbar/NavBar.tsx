'use client'
import React, { useState } from "react";
import Icons from "./Icons";
import CategoriesBar from "./CategoriesBar";
import SearchMed from "./Search";
import LogoAndSearch from "./LogoAndSearch";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const NavBar = () => {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = scrollY.getPrevious()
        if (prev !== undefined && latest > prev && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.nav
            variants={{
                visible: { opacity: 1, },
                hidden: { opacity: 0, }
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col sticky top-0 z-50"
        >
            <section className="flex items-center justify-between gap-6 border-2 px-5 py-2 bg-white">
                <LogoAndSearch />
                <div className="flex items-center gap-5">
                    <Icons />
                </div>
            </section>

            <section className="block sm:hidden">
                <SearchMed />
            </section>
            <CategoriesBar />
        </motion.nav>
    );
};

export default NavBar;