import React from "react";
import Image from "next/image";
const VerticalBanner = ({ image }) => {
    return (
        <div className="flex max-h-64">
            <Image
                height={350}
                width={1800}
                src={image}
                alt="banner"
                className="opacity-0 duration-[2s] transition-all object-cover"
                onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                }
            />
        </div>
    );
};

export default VerticalBanner;
