'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from '@/components/ui/form';
import CustomInput from "../../Form/CustomInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authFormUserAddress } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddressesModal() {
    const t = useTranslations("Form");

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormUserAddress();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            street: "",
            address: "",
            postalCode: "",
            phoneNumber:""
        },
    })
    

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            console.log(data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{t('YourAddress')}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('YourAddress')}</DialogTitle>
               
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex gap-4">
                                <CustomInput control={form.control} name='firstName' label={t('firstName')} placeholder='Enter your first name' schema={formSchema} />
                                <CustomInput control={form.control} name='lastName' label={t('lastName')} placeholder='Enter your last name' schema={formSchema} />
                            </div>
                                <CustomInput control={form.control} name='phoneNumber' label={t('phoneNumber')} placeholder='Enter your Phone Number' schema={formSchema} />
                            <div className="flex gap-4">
                                <CustomInput control={form.control} name='country' label={t('country')} placeholder='Enter your Country' schema={formSchema} />
                                <CustomInput control={form.control} name='city' label={t('city')} placeholder='Enter your City' schema={formSchema} />
                            </div>
                            <div className="flex gap-4">

                            <CustomInput control={form.control} name='street' label={t('street')} placeholder='Enter your street name' schema={formSchema} />
                            <CustomInput control={form.control} name='postalCode' label={t('postalCode')} placeholder='Example: 11101' schema={formSchema} />
                            </div>
                            <CustomInput control={form.control} name='address' label={t('address')} placeholder='Enter your specific address' schema={formSchema} />
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading} className="">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            Loading...
                                        </>
                                    ) :<>
                                     {t('addAddress')}
                                     </>}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
