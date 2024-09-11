import React from "react";
import Image from "next/image";
const VerticalBanner = ({ image }:{image:string}) => {
	return (
		<div className="flex max-h-64">
			<Image
				height={350}
				width={1800}
				src={image}
				alt="banner"
				className=" duration-600 transition-all object-cover rounded-lg"
			/>
		</div>
	);
};

export default VerticalBanner;
