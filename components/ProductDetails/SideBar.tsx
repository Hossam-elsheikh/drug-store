import { Headset, PlaneTakeoff, Truck } from "lucide-react";
import Container from "../Container";

const items = [
    {
        title: "TRUSTED SHIPPING",
        description: "Free shipping when you spend EGP 200 and above on express items",
        icon: <Truck />,
    },
    {
        title: "FAST DELIVERY",
        description: "Get your items delivered in 24 hours with our fast delivery service",
        icon: <PlaneTakeoff />,
    },
    {
        title: "24/7 SUPPORT",
        description: "Our support team is available 24/7 to assist you with any queries",
        icon: <Headset />,
    },
];

function SideBar({ dir = "ltr" }) {
    return (
        <Container className="w-full  p-0">
           
            <section 
                className={` flex flex-col md:flex-row gap-2 bg-[#ffffff] rounded-lg  shadow-sm p-2`}
                >
                    {items.map((item, index) => (
                        <div dir={dir}
                            key={index}
                            className={`flex gap-2 bg-[#f0f5f9] rounded-lg p-4 justify-center items-center  hover:bg-[#e4eef6] group duration-300 `}
                        >
                            <div className="flex group-hover:scale-[1.1] duration-300  items-center justify-center p-2 rounded-full bg-[#ffffff] text-gray-800">
                                {item.icon}
                            </div>
                                <h1 className="text-sm font-medium">
                                    {item.title}
                                </h1>
                              
                        </div>
                    ))}
                </section>
           
        </Container>
    );
}

export default SideBar;