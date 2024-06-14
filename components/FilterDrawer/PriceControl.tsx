'use client'

import React, { useState } from "react"; 
import { Slider } from "../ui/slider"
import { cn } from "@/lib/utils"

export function PriceControl({ onChange }: { onChange: (values: number[]) => void }) {
    const [localValues, setLocalValues] = useState<number[]>([0, 100_000]);

    const handleValueChange = (newValues: number[]) => {
        if (Array.isArray(newValues) && newValues.length === 2) {
            setLocalValues(newValues);
            onChange(newValues); 
        } else {
            console.error("Invalid values received from the Slider component");
        }
    };


    return (
        <div className="grid gap-4 w-full space-y-2 rounded-lg">
            <label className="text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Price
            </label>
            <Slider
                value={localValues}
                minStepsBetweenThumbs={100}
                max={30_000}
                min={0}
                step={1}
                onValueChange={handleValueChange}
                className={cn("w-full")}
            />
            <div className="flex gap-2 flex-wrap ">
                <ol className="flex items-center w-full gap-3 ">
                    {localValues.map((value) => (
                        <li key={value} className="flex items-center shadow-sm  justify-between w-full border px-3 h-10 rounded-md">
                            <span>KWT</span>
                            <span>{value}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}