import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
    z.object({
        firstName:
            type === "sign-in" ? z.string().optional() : z.string().min(3),
        lastName:
            type === "sign-in" ? z.string().optional() : z.string().min(3),
        address1:
            type === "sign-in" ? z.string().optional() : z.string().max(50),
        city: type === "sign-in" ? z.string().optional() : z.string().max(50),
        state:
            type === "sign-in"
                ? z.string().optional()
                : z.string().min(2).max(2),
        postalCode:
            type === "sign-in"
                ? z.string().optional()
                : z.string().min(3).max(6),
        dateOfBirth:
            type === "sign-in" ? z.string().optional() : z.string().min(3),
        ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
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
    });
export const authFormUserAddress = () =>
    z.object({
        firstName: z.string().min(3, "First name must be at least 3 characters"),
        lastName: z.string().min(3, "Last name must be at least 3 characters"),
        city: z.string().min(3, "least 3 characters").max(10, 'max charcters 10'),
        country: z.string().min(3, "least 3 characters").max(10, 'max charcters 10'),
        street: z.string().max(20, 'max charcters 20'),
        address: z.string().max(20, 'max charcters 20'),
        postalCode: z.string().min(4, 'least 4 Numbers').max(5, 'max Numbers 5')
    });

import cat from '../public/cat.svg'

export const pharmacyCategories = [
    {
        name: "Prescription Medications",
        image : cat
        // image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Over-the-Counter (OTC) Medications",
        image : cat
        // image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Health & Wellness",
        image : cat
        // image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Health & Wellness",
        image : cat
        // image: "https://pharmacypluskw.com/cdn/shop/files/Hair_Logo.jpg?v=1708343650&width=400",
    },
    {
        name: "Personal Care",
        image : cat
        // image: "https://pharmacypluskw.com/cdn/shop/files/Mom_Baby_Logo.jpg?v=1708343484&width=400",
    },
    {
        name: "Baby & Child Care",
        image : cat
        // image: "https://pharmacypluskw.com/cdn/shop/files/Fitness_logo_c4341c93-2031-40d1-aff5-4edd4df3d0e9.jpg?v=1708343130&width=400",
    },
    {
        name: "Health & Wellness",
        image : cat
        // image: "https://pharmacypluskw.com/cdn/shop/files/Hair_Logo.jpg?v=1708343650&width=400",
    },
    {
        name: "Personal Care",
        image : cat
        // image: "https://pharmacypluskw.com/cdn/shop/files/Mom_Baby_Logo.jpg?v=1708343484&width=400",
    },
    {
        name: "Baby & Child Care",
        image : cat
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
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"
      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src:"#"

      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"

      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"
      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src:"#"

      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"

      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"
      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTovlZ5jAfClKY46Gs26IocnlNEwepyCAiTQ&s",
        price: 24,
        src:"#"

      },
    {
        title: "Axe Deodorant Antiperspirant Body spray Aerosol",
        image: "https://freepngimg.com/save/32755-axe-spray-clipart/450x450",
        price: 24,
        src:"#"

      },
]