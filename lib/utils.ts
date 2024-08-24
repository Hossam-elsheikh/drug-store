import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const aboutUsContent = [
    {
        title: 'Emergency Services',
        description:
            'We provide 24/7 emergency services to ensure the safety and well-being of our clients at all times.',
        svg: '/emergency-svgrepo-com.svg',
    },
    {
        title: 'Visionary Solutions',
        description:
            'Our vision is to innovate and deliver solutions that drive progress and create a better future.',
        svg: '/eye-svgrepo-com.svg',
    },
    {
        title: 'Commitment to Care',
        description:
            'We are committed to providing the highest quality care and ensuring the well-being of our clients.',
        svg: '/first-aid-kit-svgrepo-com.svg',
    },
    {
        title: 'Health and Wellness',
        description:
            'Promoting health and wellness through comprehensive healthcare solutions and services.',
        svg: '/health-care-svgrepo-com.svg',
    },
    {
        title: 'Pharmaceutical Excellence',
        description:
            'Delivering pharmaceutical products and services with a focus on quality and efficacy.',
        svg: '/pill-svgrepo-com.svg',
    },
    {
        title: 'Supporting Causes',
        description:
            'We support various causes and initiatives to make a positive impact on society.',
        svg: '/ribbon-svgrepo-com.svg',
    },
]



export const pharmacyCat = [
    {
        name: "Prescription Medications",
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Over-the-Counter (OTC) Medications",
        image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Health & Wellness",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];



