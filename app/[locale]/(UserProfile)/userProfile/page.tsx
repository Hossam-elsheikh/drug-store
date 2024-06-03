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

export default function UserProfile() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormProfile();

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
            <h1 className='text-lg mb-4'>User Info</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-4">
                        <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' schema={formSchema} />
                        <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' schema={formSchema} />
                    </div>
                    <DatePickerDemo control={form.control} name='dateOfBirth' />
                    <div className="flex gap-4">
                        <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' schema={formSchema} />
                        <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' schema={formSchema} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button type="submit" disabled={isLoading} className="form-btn">
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                                    Loading...
                                </>
                            ) : 'Update'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
