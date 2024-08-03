"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import CustomInput from "../../Form/CustomInput";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";

import useAuth from "@/hooks/useAuth";
import { updateUser } from "@/axios/instance";
import { UserProfileDataValidationSchema } from "@/lib/schema";

export default function UserProfileModal({ userInfo }) {
	const router = useRouter();
	const f = useTranslations("Form");
	const t = useTranslations("UserInfoPage");

	const UserProfileDataInitialValues = {
		name: userInfo?.name || "",
		email: userInfo?.email || "",
		mobile: userInfo?.mobile || "",
	};

	const { auth }: any = useAuth();

	const onSubmit = async (values, { setSubmitting, setStatus }) => {
		try {
			const updatedValues = {
				...userInfo,
				name: values.name,
				email: values.email,
				mobile: values.mobile,
			};

			console.log("Updating with values:", updatedValues);

			const response = await updateUser(auth.userId, updatedValues);
			console.log("User profile updated:", response);
			setStatus("Profile updated successfully");
			router.refresh();
		} catch (error) {
			console.error("Error updating user profile:", error);
			setStatus("Failed to update profile. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{t("editInfo")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("editInfo")}</DialogTitle>
					<DialogDescription>{f("changeInfo")}</DialogDescription>
				</DialogHeader>
				<Formik
					initialValues={UserProfileDataInitialValues}
					validationSchema={UserProfileDataValidationSchema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting, status }) => (
						<Form className="space-y-5">
							<CustomInput
								name="name"
								label={f("name")}
								placeholder="Enter your name"
							/>
							<CustomInput
								name="email"
								label={f("email")}
								placeholder="Enter your email"
							/>
							<CustomInput
								name="mobile"
								label={f("mobileNumber")}
								placeholder="Enter your phone number"
							/>

							{status && (
								<div className="text-sm text-blue-500">
									{status}
								</div>
							)}

							<DialogFooter>
								<div className="flex gap-3">
									<button
										type="submit"
										disabled={isSubmitting}
										className="ModalUbdateButton"
									>
										{isSubmitting ? (
											<>
												<Loader2
													size={20}
													className="animate-spin"
												/>{" "}
												&nbsp; Updating...
											</>
										) : (
											f("update")
										)}
									</button>
									<DialogClose className="ModalCloseButton">
										Close
									</DialogClose>
								</div>
							</DialogFooter>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
}
