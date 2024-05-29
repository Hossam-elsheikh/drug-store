import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const authFormSchema = (type: string) => z.object({
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
})


export const pharmacyCategories = [
    {
        name: "Prescription Medications",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Over-the-Counter (OTC) Medications",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Health & Wellness",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Personal Care",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Baby & Child Care",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Home Health Care",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Beauty",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Household Essentials",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    },
    {
        name: "Pet Care",
        image: "https://t3.ftcdn.net/jpg/01/02/12/28/240_F_102122850_fj76MXJcEDP4OzO2y918KarKygSeFmZk.jpg",
    }
];

export const pharmacyCat = [
    {
        name: "Health & Wellness",
        image: "https://pharmacypluskw.com/cdn/shop/files/Hair_Logo.jpg?v=1708343650&width=400",
    },
    {
        name: "Personal Care",
        image: "https://pharmacypluskw.com/cdn/shop/files/Mom_Baby_Logo.jpg?v=1708343484&width=400",
    },
    {
        name: "Baby & Child Care",
        image: "https://pharmacypluskw.com/cdn/shop/files/Fitness_logo_c4341c93-2031-40d1-aff5-4edd4df3d0e9.jpg?v=1708343130&width=400",
    }
    
]