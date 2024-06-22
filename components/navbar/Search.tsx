"use client"

import React, { useState, Fragment } from "react"
import { Transition, Popover, PopoverGroup, PopoverPanel } from "@headlessui/react"
import { PhoneCall, Play, Home, Send, MessageCircleMore, Search } from "lucide-react";

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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    input: z.string().min(3, { message: "Minimum 3 characters" }).max(50, { message: "Maximum 50 characters" }),
});

export default function SearchMed() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    const handleSearch = async (value) => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
        setInputValue(value); // Update the input value
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.push(`/en/search/${values.input}`);
        form.reset();
        setIsOpen(false);
    }

    const products = [
        {
            name: "Book a Stay",
            description: "Get a better understanding of where your traffic is coming from.",
            href: "#",
            icon: <Home />
        },
        {
            name: "Book A Flight",
            description: "Speak directly to your customers in a more meaningful way.",
            href: "Flights",
            icon: <Send />
        }, {
            name: "Connect Our Support Team",
            description: "Your customers' data will be safe and secure.",
            href: "#",
            icon: <MessageCircleMore />
        }
    ]

    return (
        <>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                <Popover className="relative">
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="input"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex items-center gap-2 relative">
                                                    <div className="flex w-full max-w-[760px] gap-x-2">
                                                        <div className="relative grow p-px">
                                                            <Search className="absolute left-2 text-gray-400 z-10 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                            <Input
                                                                placeholder="Search any medicine..."
                                                                className="rounded-2.5 pl-[40px] text-4"
                                                                {...field}
                                                                onFocus={() => setIsOpen(true)}
                                                                onBlur={() => setIsOpen(false)}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    handleSearch(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>

                        <Transition
                            as={Fragment}
                            show={isOpen}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in-out duration-300"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((item) => (
                                            <div key={item.name} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-100 hover:duration-700">
                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200 hover:duration-1000">
                                                    {React.cloneElement(item.icon, { color: "#013B94", strokeWidth: 1.8, size: 27 })}
                                                </div>
                                                <div className="flex-auto">
                                                    <a href={item.href} className="block font-semibold text-[#013B94]">{item.name}</a>
                                                    <p className="mt-1 text-[#013B94]">{item.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No results found</p>
                                    )}
                                </div>
                                <div className="grid divide-x divide-gray-900/5 bg-gray-50 hover:duration-700">
                                    <div className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94] hover:bg-gray-200 hover:duration-700">
                                        <a href="#" className="text-[#013B94] ml-1 flex gap-2 items-center">
                                        <Search strokeWidth={1.8} size={27} className="text-[#013B94]" />
                                        Looking For More
                                            {inputValue}
                                        </a>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                </Popover>
            </PopoverGroup>
        </>
    )
}
