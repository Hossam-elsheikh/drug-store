"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/logowithoutBG.png";

export default function Loading() {
	return (
		<AnimatePresence>
			<motion.div
				key="loading"
				initial={{ opacity: 0, y: 20 }}
				animate={{
					opacity: 1,
					y: 0,
					background: [
						"linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
						"linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
					],
				}}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					opacity: { ease: "easeInOut" },
					y: { ease: "easeInOut" },
					background: {
						duration: 2,
						repeat: Infinity,
						repeatType: "reverse",
					},
				}}
				className="loading-container"
			>
				<motion.div
					className="shine-effect"
					animate={{
						rotate: [0, 360],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<div className="loading-content">
					<motion.div
						animate={{
							opacity: [0.75, 1, 0.75],
						}}
						transition={{
							duration: 0.5,
							ease: "easeInOut",
							times: [0, 0.5, 1],
							repeat: Infinity,
						}}
					>
						<Image
							src={logo}
							alt="Logo"
							width={400}
							height={400}
							unoptimized
							priority
						/>
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
