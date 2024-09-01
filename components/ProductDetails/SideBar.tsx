import React from 'react';
import { Headset, PlaneTakeoff, Truck } from "lucide-react";

const items = [
    {
        title: "Free Shipping",
        description: "On orders over $200",
        icon: <Truck size={24} />,
    },
    {
        title: "Fast Delivery",
        description: "Get it in 24 hours",
        icon: <PlaneTakeoff size={24} />,
    },
    {
        title: "24/7 Support",
        description: "We're here to help",
        icon: <Headset size={24} />,
    },
];

function SideBar({ dir }: { dir: string }) {
    return (
        <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Why Shop With Us</h3>
            <div className="grid grid-cols-1 gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        dir={dir}
                    >
                        <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;