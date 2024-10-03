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
import { toast, Toaster } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserInfo {
    name: string;
    email: string;
    mobile?: string;
    createdAt: string;
}


interface UserProfileModalProps {
    userInfo: UserInfo;
}

export default function UserProfileModal({ userInfo }: any) {
    const router = useRouter();
    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");

    const UserProfileDataInitialValues = {
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        mobile: userInfo?.mobile || "",
    };

    const { auth }: any = useAuth();
    const queryClient = useQueryClient()

    const updateUserMutation = useMutation({
        mutationFn: (updatedValues: any) => updateUser({ userId: auth.userId, data:updatedValues }),
        onSuccess(data) {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries()
        },
        onError(error) {
            console.error("Error updating user profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    });

    const onSubmit = async (values: any, { setSubmitting, setStatus }: { setSubmitting: any, setStatus: any }) => {
        const updatedValues = {
            ...userInfo,
            name: values.name,
            email: values.email,
            mobile: values.mobile,
        };

        console.log("Updating with values:", updatedValues);

        try {
            setSubmitting(true);
            updateUserMutation.mutate(updatedValues);
            setStatus("Profile updated successfully");
        } catch (error) {
            setStatus("Failed to update profile. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300  shadow-sm hover:bg-gray-50 focus:outline-none duration-200" variant="outline">{t("editInfo")}</Button>
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
                                <div className="flex gap-3 w-full">
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
                                    <Toaster richColors position="top-center" closeButton />
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
