"use client";

import Image from "next/image";
import imageNotFound from "@/public/404 error with a landscape-cuate.svg";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";

export default function NotFound({ mode }: { mode?: string }) {
	const router = useRouter();
	// const t = useTranslations("NotFound");

	const isDrawerMode = mode === "drawer";

	return (
		<div
			className={`flex flex-col items-center justify-center ${
				isDrawerMode ? "h-full" : "min-h-screen"
			} text-center p-4 bg-gray-50 w-full rounded-lg`}
		>
			<Image
				src={imageNotFound}
				width={isDrawerMode ? 200 : 400}
				height={isDrawerMode ? 200 : 400}
				alt="Not Found Page"
				priority
			/>
			<h1
				className={`mt-4 ${
					isDrawerMode ? "text-xl" : "text-3xl"
				} font-bold text-gray-800`}
			>
				{/* {t("somethingWentWrong")} */} Some thing Went Wrong
			</h1>
			{!isDrawerMode && (
				<button
					className="mt-8 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full
                        shadow-lg transform transition duration-300 ease-in-out hover:bg-blue-600
                        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
                        focus:ring-opacity-50 active:bg-blue-700 active:scale-95"
					onClick={() => router.push("/")}
				>
					{/* {t("backToHome")} */}
					Back To Home
				</button>
			)}
		</div>
	);
}
