'use client'
import CustomInput from '@/components/Form/CustomInput';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authFormProfile } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { DatePickerDemo } from '@/components/ui/date-picker';
import { useTranslations } from 'next-intl';

export default function UserProfile() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const f = useTranslations("Form");

    const formSchema = authFormProfile();
    const t = useTranslations("UserInfoPage");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            dateOfBirth: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            // Update the data
            console.log(data); // Add your update logic here
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl pb-5 font-base mb-5 md:mb-0">{t('userInfo')}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-4">
                        <CustomInput control={form.control} name='firstName' label={f('firstName')} placeholder='Enter your first name' schema={formSchema} />
                        <CustomInput control={form.control} name='lastName' label={f('lastName')} placeholder='Enter your last name' schema={formSchema} />
                    </div>
                    <DatePickerDemo control={form.control} name='dateOfBirth' />
                    <div className="flex gap-4">
                        <CustomInput control={form.control} name='email' label={f('email')} placeholder='Enter your email' schema={formSchema} />
                        <CustomInput control={form.control} name='password' label={f('password')} placeholder='Enter your password' schema={formSchema} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button type="submit" disabled={isLoading} className="w-1/3">
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                                    Loading...
                                </>
                            ) :
                                <>
                                    {f('update')}
                                </>}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
