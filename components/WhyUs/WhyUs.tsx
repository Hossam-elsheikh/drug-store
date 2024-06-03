import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import contactUs from '@/public/undraw_contact_us_re_4qqt (1).svg'
import medicalCare from '@/public/undraw_medical_care_movn (1).svg'
import medicine from '@/public/undraw_medicine_b-1-ol (1).svg'
import payments from '@/public/undraw_pay_online_re_aqe6.svg'

const reasons = [
    {
        title: 'Contact Us',
        image: contactUs
    },
    {
        title: 'Medical Care',
        image: medicalCare
    },
    {
        title: 'Medicine',
        image: medicine
    },
    {
        title: 'Payments',
        image: payments
    }
];

function WhyUs() {
    return (
        <section className='w-full bg-primaryColor text-white min-h-48 h-auto p-10 shadow-lg'>
            <Container className='max-w-[1200px] bg-white/10 backdrop-blur-md shadow-md rounded-lg p-5'>
                <h1 className="text-4xl font-bold text-center my-8">Why Choose Us?</h1>
                <div className="flex flex-wrap justify-around">
                    {reasons.map((reason, index) => (
                        <div key={index} className="md:max-w-[200px] max-w-[150px] p-4 m-4 text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <Image src={reason.image} alt={reason.title} layout="fill" objectFit="contain" />
                            </div>
                            <h2 className="md:text-2xl text-lg font-semibold">{reason.title}</h2>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default WhyUs
