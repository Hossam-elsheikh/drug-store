import { MapPin, Phone, Mail, Headset, LineChart } from 'lucide-react';
import React from 'react';
import Container from '../Container';

const Footer = ({ direction = 'ltr' }) => {
    const textAlignClass = direction === 'rtl' ? 'text-right' : 'text-left';

    return (
        <footer className=" bg-gray-100 text-center shadow-lg p-10  h-auto ">
            <Container className={`flex flex-col md:flex-row justify-center p-10 max-w-[1200px] bg-gray-200 rounded-lg  gap-8 ${direction === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
                {footerData.map((section, sectionIndex) => (
                    <div key={sectionIndex} className={`flex flex-col items-center md:items-${direction === 'rtl' ? 'end' : 'start'} ${textAlignClass} max-w-xs`}>
                        <h1 className={`text-2xl mb-6 flex items-center ${textAlignClass}`}>
                            {section.mainTitle}
                        </h1>
                        <div className="flex flex-col gap-4">
                            {section.subObjects.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center">
                                    <div className={`mr-4 ${direction === 'rtl' ? 'ml-4' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="mt-1">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        
            </Container>

        </footer>
    );
};

export default Footer;

export const footerData = [
    {
        mainTitle: "Keep Reaching Us",
        subObjects: [
            {
                icon: <MapPin />,
                content: "1234 Main St, Anytown, USA"
            },
            {
                icon: <Phone />,
                content: "+1 (555) 123-4567"
            },
            {
                icon: <Mail />,
                content: "contact@company.com"
            }
        ]
    },
    {
        mainTitle: "Additional Information",
        subObjects: [
            {
                icon: <Headset />,
                content: "support@company.com"
            },
            {
                icon: <LineChart />,
                content: "jobs@company.com"
            }
        ]
    }
];
