"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Form } from "@/components/ui/form";
import CustomInput from "../../Form/CustomInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { useRouter } from "next/navigation";
import { authFormProfile } from "@/lib/utils";

export default function UserProfileModal() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const f = useTranslations("Form");
    const t = useTranslations("UserInfoPage");

    const formSchema = authFormProfile();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            dateOfBirth: "",
            phoneNumber: "",
            gender: undefined,
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{t("editInfo")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("editInfo")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="flex gap-2">
                                <CustomInput
                                    control={form.control}
                                    name="firstName"
                                    label={f("firstName")}
                                    placeholder="Enter your first name"
                                    schema={formSchema}
                                />
                                <CustomInput
                                    control={form.control}
                                    name="lastName"
                                    label={f("lastName")}
                                    placeholder="Enter your last name"
                                    schema={formSchema}
                                />
                            </div>

                            <RadioGroup {...form.register("gender")}>
                                <div className="flex gap-5">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="male"
                                            id="male"
                                        />
                                        <Label htmlFor="male">
                                            {f("male")}
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="female"
                                            id="female"
                                        />
                                        <Label htmlFor="female">
                                            {f("female")}
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>
                            <div className="flex gap-2">
                                <CustomInput
                                    control={form.control}
                                    name="email"
                                    label={f("email")}
                                    placeholder="Enter your email"
                                    schema={formSchema}
                                />
                                <CustomInput
                                    control={form.control}
                                    name="password"
                                    label={f("password")}
                                    placeholder="Enter your password"
                                    schema={formSchema}
                                />
                            </div>
                            <CustomInput
                                control={form.control}
                                name="phoneNumber"
                                label={f("phoneNumber")}
                                placeholder="Enter your phone number"
                                schema={formSchema}
                            />
                            <div className="flex flex-col">
                                <label className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    {f("dateOfBirth")}
                                </label>
                                <DatePickerDemo
                                    control={form.control}
                                    name="dateOfBirth"
                                />
                            </div>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-1/3"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2
                                                size={20}
                                                className="animate-spin"
                                            />{" "}
                                            &nbsp; Loading...
                                        </>
                                    ) : (
                                        f("update")
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}