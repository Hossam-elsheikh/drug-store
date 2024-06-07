import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

interface CustomCheckboxProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    value: string;
    schema?: ZodType<T, ZodTypeDef, T>;
}

const CustomCheckbox = <T extends FieldValues>({
    control,
    name,
    value,
    label,
    schema,
}: CustomCheckboxProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <div className="flex flex-col">
                        <FormControl>
                            <div className="flex items-center space-x-1.5">
                                <Checkbox
                                    checked={field.value?.includes(value)}
                                    onCheckedChange={(checked :any) => {
                                        return checked
                                            ? field.onChange([...field.value, value])
                                            : field.onChange(
                                                field.value?.filter((val:any) => val !== value)
                                            );
                                    }}
                                />
                                <FormLabel className="form-label" htmlFor={label}>
                                    {label}
                                </FormLabel>
                            </div>
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CustomCheckbox;