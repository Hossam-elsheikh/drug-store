import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}



export const authFormSchema = (type: string) =>
    z.object({
        email: z.string().email(),
        password: z.string().min(8).refine(
            (str) => {
                const hasLowercase = /[a-z]/.test(str);
                const hasUppercase = /[A-Z]/.test(str);
                const hasNumber = /\d/.test(str);
                const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\ ]/.test(str);
                return true;
            },
            { message: "Password must be complex" }
        ),
        name: type === "sign-in" ? z.string().optional() : z.string().min(3),
        age: type === "sign-in" ? z.number().optional() : z.number(),
        mobile: type === "sign-in" ? z.number().optional() : z.number().min(10),
        addresses: type === "sign-in" ? z.string().optional() : z.array(
            z.object({
                street: z.string().max(50),
                city: z.string().max(50),
                state: z.string().min(2).max(2),
                block: z.string().min(3).max(6),
            })
        ),
    });

export const authFormProfile = () =>
    z.object({
        firstName: z.string().min(3, "First name must be at least 3 characters"),
        lastName: z.string().min(3, "Last name must be at least 3 characters"),
        dateOfBirth: z.string().regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Date of birth must be in YYYY-MM-DD format"
        ),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        phoneNumber: z.string().min(8, "Phone Number must be at least 8 Numbers"),
        gender: z.enum(['male', 'female']).optional(),
    });
export const authFormUserAddress = () =>
    z.object({
        firstName: z.string().min(3, "First name must be at least 3 characters"),
        lastName: z.string().min(3, "Last name must be at least 3 characters"),
        city: z.string().min(3, "least 3 characters").max(10, 'max charcters 10'),
        country: z.string().min(3, "least 3 characters").max(10, 'max charcters 10'),
        street: z.string().max(20, 'max charcters 20'),
        address: z.string().max(20, 'max charcters 20'),
        postalCode: z.string().min(4, 'least 4 Numbers').max(5, 'max Numbers 5'),
            phoneNumber: z.string().min(8, "Phone Number must be at least 8 Numbers"),
    });

import cat1 from '../public/rect1.svg'
import cat2 from '../public/rect2.svg'
import cat3 from '../public/rect3.png'

export const pharmacyCategories = [
    {
        name: "Prescription Medications",
        image: cat1
        // image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Over-the-Counter (OTC) Medications",
        image: cat2
        // image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Health & Wellness",
        image: cat3
        // image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Health & Wellness",
        image: cat1
        // image: "https://pharmacypluskw.com/cdn/shop/files/Hair_Logo.jpg?v=1708343650&width=400",
    },
    {
        name: "Personal Care",
        image: cat2
        // image: "https://pharmacypluskw.com/cdn/shop/files/Mom_Baby_Logo.jpg?v=1708343484&width=400",
    },
    {
        name: "Baby & Child Care",
        image: cat3
        // image: "https://pharmacypluskw.com/cdn/shop/files/Fitness_logo_c4341c93-2031-40d1-aff5-4edd4df3d0e9.jpg?v=1708343130&width=400",
    },
    {
        name: "Health & Wellness",
        image: cat1
        // image: "https://pharmacypluskw.com/cdn/shop/files/Hair_Logo.jpg?v=1708343650&width=400",
    },
    {
        name: "Personal Care",
        image: cat2
        // image: "https://pharmacypluskw.com/cdn/shop/files/Mom_Baby_Logo.jpg?v=1708343484&width=400",
    },
    {
        name: "Baby & Child Care",
        image: cat3
        // image: "https://pharmacypluskw.com/cdn/shop/files/Fitness_logo_c4341c93-2031-40d1-aff5-4edd4df3d0e9.jpg?v=1708343130&width=400",
    },
];

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



export const products = [
    {
        id: 1,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
    {
        id: 2,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src: "#"
    },
    {
        id: 3,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
    {
        id: 4,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
    {
        id: 5,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src: "#"
    },
    {
        id: 6,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
    {
        id: 7,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
    {
        id: 8,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src: "#"
    },
    {
        id: 9,
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src: "#"
    },
]