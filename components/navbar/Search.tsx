'use client'
import React from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const fromSchema = z.object({
    input: z.string().min(3, { message: "Minimum 3 characters" }).max(50, { message: "Maximum 50 characters" }),
});


export default function SearchMed() {
    const router = useRouter();

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            input: "",
        },
    });

    function onSubmit(values: z.infer<typeof fromSchema>) {
        router.push(`/en/search/${values.input}`);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center gap-2 relative">
                                    <Search className="absolute left-2 text-gray-400 z-10" />
                                    <Input
                                        placeholder="Search any medicine..."
                                        {...field}
                                        className="pl-10 focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
