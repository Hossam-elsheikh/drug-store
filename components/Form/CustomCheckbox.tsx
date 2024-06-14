"use client";
import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {  ZodType, ZodTypeDef } from "zod";
import { Switch } from "@/components/ui/switch";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

interface CustomSwitchProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    schema?: ZodType<T, ZodTypeDef, T>;
    disabled?: boolean;
}

const CustomSwitch = <T extends FieldValues>({
    control,
    name,
    label,
    disabled = false,
}: CustomSwitchProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                        <FormLabel className="text-sm">{label}</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                            aria-readonly={disabled}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default CustomSwitch;