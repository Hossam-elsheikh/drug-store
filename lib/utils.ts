import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const getColorClass = (percentage: number) => {
    if (percentage <= 5) return 'bg-indigo-100 text-indigo-800'
    if (percentage <= 10) return 'bg-blue-100 text-blue-800'
    if (percentage <= 15) return 'bg-amber-100 text-amber-800'
    if (percentage <= 20) return 'bg-teal-100 text-teal-800'
    if (percentage <= 25) return 'bg-green-100 text-green-800'
    if (percentage <= 30) return 'bg-lime-100 text-lime-800'
    if (percentage <= 35) return 'bg-yellow-100 text-yellow-800'
    if (percentage <= 40) return 'bg-amber-100 text-amber-800'
    if (percentage <= 45) return 'bg-orange-100 text-orange-800'
    if (percentage <= 50) return 'bg-red-100 text-red-800'
    if (percentage <= 55) return 'bg-rose-100 text-rose-800'
    if (percentage <= 60) return 'bg-pink-100 text-pink-800'
    return 'bg-purple-100 text-purple-800'
}


export const collaborations = [
    {
        name: 'Momeasy',
        logo: 'https://www.momeasy.com/uploads/images/62b190805b01059206302203bf5c2ffb.png',
        website: 'https://www.momeasy.com/',
        instagram: 'https://www.instagram.com/momeasy.kw?igsh=a2lhcWc5ZTVtb2Ft',
    },
    {
        name: 'Firstar',
        logo: '/path/to/firstar-logo.png',
        website: 'https://www.china-firstar.com/',
    },
    {
        name: 'Erba Vita',
        logo: 'https://www.china-firstar.com/wp-content/uploads/2022/04/new-first-aid-kit-logo.png',
        website: 'https://www.erbavita.com/en/',
        instagram: 'https://www.instagram.com/erba_vita?igsh=ZDI3MjNyc3k3dmV4',
    },
    {
        name: 'Vapo Health Care',
        logo: 'http://www.vapohealth.com/uploads/allimg/20231114/1-231114104F2Y4.png',
        website: 'http://www.vapohealth.com/',
    },
]



export const aboutUsContent = [
    {
        title: 'emergencyServices',
        description: 'descriptionEmergencyServices',
        svg: '/emergency-svgrepo-com.svg',
    },
    {
        title: 'visionarySolutions',
        description: 'descriptionVisionarySolutions',
        svg: '/eye-svgrepo-com.svg',
    },
    {
        title: 'commitmentToCare',
        description: 'descriptionCommitmentToCare',
        svg: '/first-aid-kit-svgrepo-com.svg',
    },
    {
        title: 'healthAndWellness',
        description: 'descriptionHealthAndWellness',
        svg: '/health-care-svgrepo-com.svg',
    },
    {
        title: 'pharmaceuticalExcellence',
        description: 'descriptionPharmaceuticalExcellence',
        svg: '/pill-svgrepo-com.svg',
    },
    {
        title: 'supportingCauses',
        description: 'descriptionSupportingCauses',
        svg: '/ribbon-svgrepo-com.svg',
    },
]


export const pharmacyCat = [
    {
        name: 'Prescription Medications',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Over-the-Counter (OTC) Medications',
        image: 'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Health & Wellness',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
]
