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
    DialogDescription
} from "@/components/ui/dialog";
import CustomInput from "../../Form/CustomInput";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";

import useAuth from "@/hooks/useAuth";
import { updateUser } from "@/axios/instance";
import { ModalPasswordInitialValues } from "@/lib/schema";
import { ModalPasswordValidationSchema } from './../../../lib/schema';

export default function UserProfilePassword() {
    const router = useRouter();
    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");


    const { auth }:any = useAuth();
    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            await updateUser(auth.userId, { password: values.newPassword });
            setStatus("Password updated successfully");
            router.refresh();
        } catch (error) {
            console.error("Error updating password:", error);
            setStatus("Failed to update password. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{t("editPass")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("editPass")}</DialogTitle>
					<DialogDescription>{f("changePass")}</DialogDescription>
				</DialogHeader>
				<Formik
					initialValues={ModalPasswordInitialValues}
					validationSchema={ModalPasswordValidationSchema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting, status }) => (
						<Form className="space-y-5">
							<CustomInput
								name="newPassword"
								label={f("newPassword")}
								placeholder="Enter new password"
								type="password"
							/>
							<CustomInput
								name="confirmNewPassword"
								label={f("confirmPassword")}
								placeholder="Re-enter new password"
								type="password"
							/>
							{status && (
								<div className="text-sm text-blue-500">
									{status}
								</div>
							)}
							<DialogFooter className="w-full">
								<div className="flex gap-3">
									<button
										type="submit"
										disabled={isSubmitting}
										className="ModalUpdateButton"
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