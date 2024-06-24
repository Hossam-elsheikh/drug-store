'use client'
import React from 'react';
import Container from '@/components/Container';
import Image from 'next/image';
import { motion } from 'framer-motion';

const aboutUsContent = [
    {
        title: "Emergency Services",
        description: "We provide 24/7 emergency services to ensure the safety and well-being of our clients at all times.",
        svg: "/emergency-svgrepo-com.svg" // Ensure the path is correct
    },
    {
        title: "Visionary Solutions",
        description: "Our vision is to innovate and deliver solutions that drive progress and create a better future.",
        svg: "/eye-svgrepo-com.svg" // Ensure the path is correct
    },
    {
        title: "Commitment to Care",
        description: "We are committed to providing the highest quality care and ensuring the well-being of our clients.",
        svg: "/first-aid-kit-svgrepo-com.svg" // Ensure the path is correct
    },
    {
        title: "Health and Wellness",
        description: "Promoting health and wellness through comprehensive healthcare solutions and services.",
        svg: "/health-care-svgrepo-com.svg" // Ensure the path is correct
    },
    {
        title: "Pharmaceutical Excellence",
        description: "Delivering pharmaceutical products and services with a focus on quality and efficacy.",
        svg: "/pill-svgrepo-com.svg" // Ensure the path is correct
    },
    {
        title: "Supporting Causes",
        description: "We support various causes and initiatives to make a positive impact on society.",
        svg: "/ribbon-svgrepo-com.svg" // Ensure the path is correct
    }
];

function AboutUs() {
    return (
        <Container className='max-w-[1400px]'>
            <section 
               id="about-us" className="py-[100px]">
                <h1 className="text-4xl font-bold text-center mb-8 border-b-2 p-5">About Us</h1>
                {aboutUsContent.map((item, index) => (
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: '150% 0px -200px 0px' }}
                        key={index}
                        className={`flex flex-col md:flex-row items-center p-10 mb-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} ${index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'}`}
                    >
                        <motion.div className="flex-1 p-4">
                            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                            <p className="text-lg">{item.description}</p>
                        </motion.div>
                        <div className="flex-1 flex justify-center p-4">
                            <Image src={item.svg} alt={item.title} width={96} height={96} className="w-24 h-24" />
                        </div>
                    </motion.article>
                ))}
            </section>
        </Container>
    );
}

export default AboutUs;
