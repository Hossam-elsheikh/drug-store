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
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import { updateUser } from "@/axios/instance";

export default function UserProfilePassword() {
    const router = useRouter();
    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required("New password is required"),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            .required("Please confirm your new password")
    });

    const initialValues = {
        newPassword: "",
        confirmNewPassword: "",
    };

    const { auth } = useAuth();
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
                    initialValues={initialValues}
                    validationSchema={validationSchema}
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
                            {status && <div className="text-sm text-blue-500">{status}</div>}
                            <DialogFooter className='w-full'>
                                <div className='flex gap-3'>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-200 hover:bg-green-400 hover:text-white duration-300 p-2 rounded-lg"
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
                                    <DialogClose className="w-full bg-gray-200 hover:bg-gray-400 duration-300 p-2 rounded-lg inline">Close</DialogClose>
                                </div>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}