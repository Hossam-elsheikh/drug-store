'use client'
import React, { useState, useMemo, useEffect, useContext } from "react";
import CustomInput from "./CustomInput";
import { Expand, Loader2, Eye, EyeOff } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { instance, userSignUp, transCartToAPI, transLocalWishListToAPI, userSignIn } from "@/axios/instance";
import { Toaster, toast } from "sonner";
import { Formik, Form } from "formik";
import FormButton from "../formButton/FormButton";
import useAuth from "../../hooks/useAuth";
import { useLocale } from "@/context/LocaleProvider";
import { useTranslations } from "next-intl";
import { AuthFormSchema, initialAuthFormValues } from "@/lib/schema";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransLocalCartAPI } from "@/hooks/useTransLocalCartAPI";
import Image from "next/image";
import { useFavorites } from "@/context/favoriteProvider";
import WebsiteProfileCtx from "@/context/WebsiteProfileContext";

interface authFormProps {
    Type: string;
    variant: "full" | "drawer" | "checkout";
}

const AuthForm = ({ Type, variant }: authFormProps) => {
    const { logo } = useContext(WebsiteProfileCtx)

    const f = useTranslations("Form");
    const { auth, setAuth }: any = useAuth();
    const { locale } = useLocale();
    const router = useRouter();
    const [type, setType] = useState(Type);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const pathName: string = usePathname();
    const signInPath = `/${locale}/sign-in`
    const signUpPath = `/${locale}/sign-up`

    // handle the transfer of the local storage cart to the API.
    // This mutation will be triggered after a successful user sign-in.
    const localStorageCart = JSON.parse(localStorage.getItem('products') || '[]')
    const transToAPI_Mutation = useMutation({
        mutationFn: () => transCartToAPI(auth.userId, localStorageCart),
        //on successful response the localStorage will be deleted
        onSuccess: () => localStorage.removeItem('products'),
        onError: (error) => console.log('error while mutation trans to cart api', error),
    })

    // handle the transfer of the local storage wishList to the API.
    // This mutation will be triggered after a successful user sign-in.
    const { favoriteProducts } = useFavorites()
    const transLocalWishListToAPI_Mutation = useMutation({
        mutationFn: () => transLocalWishListToAPI(favoriteProducts, auth.userId),
        onSuccess: () => { localStorage.removeItem('FavoriteItems'); console.log('wishlist products now are removed and moved successfully from local storage to api'); },
        onError: (error) => console.log('error while mutation trans wishlist to api', error),
    })

    const validationSchema = useMemo(() => AuthFormSchema(type), [type]);

    const signUpMutation = useMutation({
        mutationFn: (values) => userSignUp(values),
        onSuccess: () => {
            toast.success("You Signed Up Successfully");
            if (variant != 'checkout') {
                router.push(`/${locale}/sign-in`);
            } else {
                setType("sign-in")
            }
        },
        onError: (error) => {
            console.log("Error signing up", error);
            toast.error("Error signing up. Please try again.");
        },
    })

    const signInMutation = useMutation({
        mutationFn: (values) => userSignIn(values),
        onSuccess: (data) => {
            const { id: userId } = data;
            setAuth({ userId });
            toast.success("You Signed In Successfully");
            // window.location.href = pathName;
            router.push(pathName)
        },
        onError: (error) => {
            console.log("Error signing in", error);
            toast.error("Error signing in. Please try again.");
        },
    })

    const onSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            //sign-up logic handling
            if (type === "sign-up") {
                signUpMutation.mutate(values)
            }

            //sign-in logic handling
            if (type === "sign-in") {
                signInMutation.mutate(values);
            }
        } catch (error) {
            toast.error("Error during form submission:",);
            console.error("Error during form submission:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Ensure that the cart transfer to the API only occurs once after the user successfully signs in.
    useEffect(() => {
        // Check if there are items in the local storage cart and if a valid userId exists.
        // This ensures that the mutation is only triggered after the user has signed in.
        if (localStorageCart?.length > 0 && auth?.userId) {
            transToAPI_Mutation.mutate()
        };
        if (favoriteProducts?.length > 0 && auth?.userId) {
            transLocalWishListToAPI_Mutation.mutate()
        }
        if (auth&&auth.userId && (pathName === signInPath || pathName === signUpPath)) {
            router.push(`/${locale}`)
        }
    }, [auth.userId, router, pathName])
    if (auth&&auth.userId && (pathName === signInPath || pathName === signUpPath)) return null;

    return (
        <>
            <section
                className={`${variant === "drawer" || variant === "checkout" ? ""
                    : "shadow-lg bg-[#F1F5F9] max-w-[500px] mx-auto p-5 my-10 rounded-lg"
                    }`}
            >
                <header className="flex flex-col pt-5 gap-5 md:gap-8">
                    <div className=" text-center">
                        {(variant === 'full') && (
                            <section className="flex justify-center pb-5 ">
                                <Image
                                    src={logo}
                                    alt="logo"
                                    width={150}
                                    height={150}
                                />
                            </section>
                        )}
                        <h1
                            className={`${variant === "drawer"
                                ? "text-[16px] font-semibold"
                                : variant === "checkout"
                                    ? ""
                                    : "text-[20px] font-semibold"
                                }`}
                        >
                            {variant != "checkout" && (type === "sign-in" ? f("signInAcc") : f("createAcc"))}
                        </h1>
                        <p
                            className={
                                variant === "drawer"
                                    ? "text-[12.5px] font-normal text-gray-600 pb-5"
                                    : "text-[14px] font-normal text-gray-600 pb-5"
                            }
                        >
                            {variant != "checkout" && f("enterDetails")}
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
                                        {variant === "checkout" &&
                                            <span className="flex gap-2 w-full ">
                                                <CustomInput
                                                    name="name"
                                                    label={f("name")}
                                                    placeholder={f("placeholderName")}
                                                />
                                                <CustomInput
                                                    name="last name"
                                                    label={"last name"}
                                                    placeholder={"enter your last name"}
                                                />
                                                <CustomInput
                                                    name="mobile"
                                                    label={f("mobileNumber")}
                                                    placeholder={f("placeholderNumber")}
                                                />
                                            </span>
                                        }
                                        {variant != "checkout" &&
                                            <span className="flex gap-2 w-full ">
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
                                            </span>
                                        }

                                        <div className="flex gap-2 w-full">
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
                                            className="font-medium text-[12px] text-primaryColor hover:text-[#363955] underline"
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
                                        className="font-semibold rounded-full bg-primaryColor hover:bg-[#45486e] active:scale-[.99] duration-200 transition-all"
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
                                    className="form-link font-semibold text-primaryColor hover:text-[#363955] "
                                >
                                    {type === "sign-in" ? f("signUp") : f("signIn")}
                                </Link>
                            )}
                            {(variant === "drawer" || variant === "checkout") && (
                                <FormButton type={type} setType={setType} />
                            )}
                        </div>
                        {variant === "drawer" && (
                            <Link
                                href={`/${locale}/${type}`}
                                className="mt-10 flex gap-1 justify-center font-medium underline"
                            >
                                {f("expand")}{" "}
                                <Expand className="size-[18px] my-auto" />
                            </Link>
                        )}
                    </footer>
                </>
            </section>
        </>
    );
}
export default AuthForm;
