'use client'

import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Control, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerDemoProps {
    control: Control<any>;
    name: string;
}

export function DatePickerDemo({ control, name }: DatePickerDemoProps) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal gap-2",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon size={24} />
                            {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(format(date, "yyyy-MM-dd"))}
                            initialFocus
                            captionLayout='dropdown-buttons'
                            fromYear={1990}
                            toYear={currentYear}
                        />
                    </PopoverContent>
                </Popover>
            )}
        />
    )
}
