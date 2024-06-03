import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";
import { Input } from "../ui/input";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";

interface CustomInputProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder: string;
    schema: ZodType<T, ZodTypeDef, T>;
}

const CustomInput = <T extends FieldValues>({ control, name, label, placeholder, schema }: CustomInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name === "password" ? "password" : "text"}
                                {...field}
                                id={label}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CustomInput;
