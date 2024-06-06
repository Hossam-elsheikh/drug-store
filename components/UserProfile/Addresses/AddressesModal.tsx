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

export default function AddressesModal() {

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
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                    <DialogDescription>
                        Add Your Address
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex gap-4">
                                <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' schema={formSchema} />
                                <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' schema={formSchema} />
                            </div>
                            <div className="flex gap-4">
                                <CustomInput control={form.control} name='country' label="Country" placeholder='Enter your Country' schema={formSchema} />
                                <CustomInput control={form.control} name='city' label="City" placeholder='Enter your City' schema={formSchema} />
                            </div>
                            <CustomInput control={form.control} name='street' label="Street" placeholder='Enter your street name' schema={formSchema} />
                            <CustomInput control={form.control} name='address' label="Address" placeholder='Enter your specific address' schema={formSchema} />
                            <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' schema={formSchema} />
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading} className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            Loading...
                                        </>
                                    ) : 'Add Address'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
