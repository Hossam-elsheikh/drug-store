"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { Expand, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { instance } from "@/axios/instance";
import { Toaster, toast } from "sonner";
import { Formik, Form } from "formik";
import FormButton from "../formButton/FormButton";
import useAuth from "../../hooks/useAuth";
import { useLocale } from "@/context/LocaleProvider";
import { useTranslations } from "next-intl";
import { AuthFormSchema, initialAuthFormValues } from "@/lib/schema";
interface authFormProps {
	Type: string;
	variant: "full" | "drawer";
}

const AuthForm = ({ Type, variant }: authFormProps) => {
	const f = useTranslations("Form");
	const { setAuth }: any = useAuth();
	const { locale } = useLocale();
	const router = useRouter();
	const [type, setType] = useState(Type);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const validationSchema = useMemo(() => AuthFormSchema(type), [type]);

	const onSubmit = async (values, { setSubmitting }) => {
		try {
			//sign-up logic handling
			if (type === "sign-up") {
				const response = await instance.post(
					"/user",
					JSON.stringify(values),
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
				// console.log(JSON.stringify(response));
				console.log(JSON.stringify(response?.data));
				// const token = response?.data?.token;
				// console.log(token);
				// setAuth({ values, token });
				toast.success("You Sign Up Successfully");
				if (response.status === 201) {
					// setType('sign-in')
					router.push(`/${locale}/sign-in`);
				}
			}
			//sign-in logic handling
			if (type === "sign-in") {
				const response = await instance.post(
					"/user/sign-in",
					JSON.stringify(values),
					{
						headers: { "Content-Type": "application/json" },
						withCredentials: true,
					}
				);
				console.log(JSON.stringify(response?.data));
				const { accessToken, id: userId } = response?.data?.accessToken;
				console.log(accessToken);
				setAuth({ accessToken, userId });
				toast.success("You Sign In Successfully");
				if (response.status === 200) {
					router.push(`/${locale}`);
					window.location.reload();
				}
			}
		} catch (error) {
			toast.error("Error during form submission:", error);
			console.error("Error during form submission:", error);
		} finally {
			// setIsLoading(false);
			setSubmitting(false);
		}
	};

	return (
		<section
			className={` ${
				variant === "drawer"
					? " mt-5 "
					: "shadow-lg bg-[#F1F5F9] max-w-[500px] mx-auto p-5 my-10 rounded-lg"
			}`}
		>
			<header className="flex flex-col gap-5 md:gap-8">
				<div className=" text-center">
					<h1
						className={`pt-10 {variant === 'drawer' ? 'text-[16px] font-semibold' : 'text-[20px] font-semibold '} `}
					>
						{type === "sign-in" ? f("signInAcc") : f("createAcc")}
					</h1>
					<p
						className={
							variant === "drawer"
								? "text-[12.5px] font-normal text-gray-600 pb-5"
								: "text-[14px] font-normal text-gray-600 pb-5"
						}
					>
						{f("enterDetails")}
					</p>
				</div>
			</header>
			<>
				<Formik
					initialValues={initialAuthFormValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting }) => (
						<Form className="space-y-5">
							{type === "sign-up" && (
								<>
									<div className="flex space-x-5">
										<CustomInput
											name="name"
											label={f("name")}
											placeholder={f("placeholderName")}
										/>
										<CustomInput
											name="mobile"
											label={f("mobileNumber")}
											placeholder={f("placeholderNumber")}
										/>
									</div>
									<div className="flex gap-4">
										<CustomInput
											name="addresses[0].state"
											label={f("state")}
											placeholder={f("placeholderState")}
										/>
										<CustomInput
											name="addresses[0].city"
											label={f("city")}
											placeholder={f("cityHolder")}
										/>
										<CustomInput
											name="addresses[0].street"
											label={f("street")}
											placeholder={f("streetHolder")}
										/>
									</div>
								</>
							)}
							<CustomInput
								name="email"
								label={f("email")}
								placeholder={f("emailHolder")}
							/>
							<div className="relative">
								<CustomInput
									name="password"
									label={f("password")}
									placeholder={f("passHolder")}
									type={showPassword ? "text" : "password"}
								/>

								{type === "sign-in" && (
									<Link
										href={"/"}
										className="font-medium text-[12px] text-[#198AB0] hover:text-[#282A3F] "
									>
										{f("forgetPass")}
									</Link>
								)}
							</div>
							{type === "sign-up" && (
								<CustomInput
									name="confirmPassword"
									label={f("confirmPassword")}
									placeholder={f("confirmPassHolder")}
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
								/>
							)}
							<div className="flex flex-col gap-4 pb-5">
								<Button
									type="submit"
									disabled={isSubmitting}
									className="font-semibold bg-[#198AB0] hover:bg-[#282A3F]"
								>
									{isSubmitting ? (
										<Loader2 className=" animate-spin" />
									) : type === "sign-in" ? (
										f("signIn")
									) : (
										f("signUp")
									)}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
				<Toaster richColors position="top-center" closeButton />

				<footer>
					<div className="flex justify-center gap-2">
						<p className="text-14 font-normal flex flex-row text-gray-600">
							{type === "sign-in"
								? f("dontHaveAcc")
								: f("haveAnAcc")}
						</p>
						{variant === "full" && (
							<Link
								href={
									type === "sign-in"
										? `/${locale}/sign-up`
										: `/${locale}/sign-in`
								}
								className="form-link font-semibold text-[#198AB0] hover:text-[#282A3F] "
							>
								{type === "sign-in" ? f("signUp") : f("signIn")}
							</Link>
						)}
						{variant === "drawer" && (
							<FormButton type={type} setType={setType} />
						)}
					</div>
					{variant === "drawer" && (
						<Link
							href={`/${locale}/${type}`}
							className="mt-10 flex gap-1 justify-center font-medium"
						>
							{f("expand")}{" "}
							<Expand className="size-[18px] my-auto" />
						</Link>
					)}
				</footer>
			</>
		</section>
	);
};

export default AuthForm;
