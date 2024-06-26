'use client';

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput';
import { Expand, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import logo from '../../public/logo.svg'
import { instance } from '@/axios/instance';
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormButton from '../formButton/FormButton';
import useRefreshToken from '@/hooks/useRefreshToken';
import  useAuth  from '../../hooks/useAuth';
import PersistLogin from './PresistLogin';
import useSignOut from '@/hooks/useSignOut';

interface authFormProps {
    // setSubmitting: boolean;
    // values: string;
    Type: string;
    currentLoc: any,
    variant: "full" | "drawer",
}

const AuthForm = ({ Type, currentLoc, variant }: authFormProps) => {

    const { setAuth }:any = useAuth();

    
    
    const router = useRouter();
    const [type, setType] = useState(Type)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validationSchema = Yup.object().shape({
        name: type === "sign-up" ? Yup.string().required("Name is required").min(3).max(50) : null,
        mobile: type === "sign-up" ? Yup.string().required("Mobile is required").matches(/^[0-9]+$/, "Mobile number is not valid") : null,
        addresses: type === "sign-up" ? Yup.array().of(
            Yup.object().shape({
                state: Yup.string().required("State is required"),
                city: Yup.string().required("City is required"),
                street: Yup.string().required("Street is required"),
            })
        ).required("Addresses is required") : null,
        email: Yup.string().required("Email is required").email("Invalid email"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long")
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmPassword: type === "sign-up" ? Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required("Re-entering password is required") : null,
    });

    const initialValues = {
        name: "",
        age: "",
        mobile: "",
        addresses: [{ state: "", city: "", street: "", block: "" }],
        email: "",
        password: "",
        confirmPassword: "",
    }

    const onSubmit = async (values, { setSubmitting }) => {

        try {
            //sign-up logic handling
            if (type === 'sign-up') {
                const response = await instance.post('/user',
                    JSON.stringify(values), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                // console.log(JSON.stringify(response));
                console.log(JSON.stringify(response?.data));
                // const token = response?.data?.token;
                // console.log(token);
                // setAuth({ values, token });
                if (response.status === 201) {
                    // setType('sign-in')
                    router.push(`/${currentLoc.params.locale}/sign-in`);
                }
            }
            //sign-in logic handling
            if (type === 'sign-in') {
                const response = await instance.post('/user/sign-in',
                    JSON.stringify(values), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                console.log(JSON.stringify(response?.data));
                const accessToken = response?.data?.accessToken;
                console.log(accessToken);
                setAuth({ values, accessToken });
                if (response.status === 200) {
                    // router.push('/');
                }
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        } finally {
            // setIsLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <section
            className={` ${variant === 'drawer' ? ' mt-[-80px] ' : 'shadow-lg bg-[#F1F5F9] max-w-[500px] mx-auto p-5 my-10 rounded-lg'}`}
        >
            <header className='flex flex-col gap-5 md:gap-8'>
                {/* <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src={logo}
                        width={34}
                        height={34}
                        alt="logo"
                    /> */}
                {/* <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">pharmacy plus</h1> */}
                {/* </Link> */}

                <div className=" text-center">
                    <h1 className={variant === 'drawer' ? 'text-[16px] font-semibold' : 'text-[20px] font-semibold '}>
                        {
                            // user
                            //     ? 'Link Account'
                            // :
                            type === 'sign-in'
                                ? 'Sign in with your account'
                                : 'Create Your Account'
                        }
                        {/* <p className="text-16 font-normal text-gray-600">
                            {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                            }
                            </p> */}
                    </h1>
                    <p className={variant === 'drawer' ? "text-[12.5px] font-normal text-gray-600 pb-5" : 'text-[14px] font-normal text-gray-600 pb-5'}>Please enter your details</p>
                </div>
            </header>
            {/* {user ? (
                <div className="flex flex-col gap-4">
                    hello there
                </div>
            ) : ( */}
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex space-x-5">
                                        <CustomInput name='name' label="Name" placeholder='Enter your name' />
                                        <CustomInput name='mobile' label="Mobile" placeholder='Enter your mobile number' />
                                    </div>
                                    {/* <div className="flex gap-4">
                                        <CustomInput name='age' label="Age" placeholder='Enter your age' />
                                    </div> */}
                                    <div className="flex gap-4">
                                        <CustomInput name='addresses[0].state' label="State" placeholder='Enter your state' />
                                        <CustomInput name='addresses[0].city' label="City" placeholder='Enter your city' />
                                        <CustomInput name='addresses[0].street' label="Street" placeholder='Enter your street' />
                                        {/* <CustomInput name='addresses[0].block' label="Block" placeholder='Enter your block' /> */}
                                    </div>
                                    {/* <div className="flex gap-4">
                                    </div> */}
                                </>
                            )}
                            <CustomInput name='email' label="Email" placeholder='Enter your email' />
                            <div className="relative">
                                <CustomInput name='password' label="Password" placeholder='Enter your password' type={showPassword ? "text" : "password"} />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex px-3 py-7 "
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                                {type === 'sign-in' && <Link
                                    href={'/'}
                                    className="font-medium text-[12px] text-[#198AB0] hover:text-[#282A3F] "
                                >
                                    forget your password ?
                                </Link>}
                            </div>
                            {type === 'sign-up' && (
                                <div className='relative'>
                                    <CustomInput
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="Re-enter your password"
                                        type={showConfirmPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center px-3 py-10"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            )}
                            <div className="flex flex-col gap-4 pb-5">
                                <Button type="submit" disabled={isSubmitting} className="form-btn font-semibold bg-[#198AB0] hover:bg-[#282A3F]">
                                    {type === 'sign-in'
                                        ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <footer>
                    <div className='flex justify-center gap-1'>

                        <p className="text-14 font-normal flex flex-row text-gray-600">
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        {variant === "full" && <Link href={type === 'sign-in' ? `/${currentLoc?.params?.locale}/sign-up` : `/${currentLoc?.params?.locale}/sign-in`} className="form-link font-semibold text-[#198AB0] hover:text-[#282A3F] ">
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>}
                        {variant === 'drawer' && <FormButton type={type} setType={setType} />}
                    </div>
                    {variant === 'drawer' &&
                        <Link href={`/en/${type}`} className='mt-10 flex gap-1 justify-center font-medium'>
                            expand window <Expand className='size-[18px] my-auto' />
                        </Link>
                    }
                </footer>
            </>
            {/* )} */}
            
        </section>
    )
}

export default AuthForm