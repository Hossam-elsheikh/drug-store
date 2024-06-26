import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { z, ZodType, ZodTypeDef } from "zod";
import { Input } from "../ui/input";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Field, ErrorMessage } from "formik";

interface CustomInputProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, placeholder, type }) => {
    return (
        // <FormField
        // control={control}
        // name={name}
        // render={({ field }) => (
        <div className="flex flex-col gap-1 ">
            <label className="text-[13px] w-full max-w-[280px] font-medium text-gray-700" htmlFor={name}>{label}</label>
            <div className="flex w-full flex-col ">
                {/* <FormControl> */}
                <Field
                    placeholder={placeholder}
                    // type={name === "password" ? "password" : "text"}
                    // {...field}
                    // id={name}
                    name={name}
                    type={type}
                    className="focus:shadow-lg focus:border-[#198AB0] transform-all duration-300 outline-none -translate-y-0.5 flex h-9.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500     disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                />
                {/* </FormControl> */}
                <ErrorMessage component="div" name={name} className="text-[12px]  form-message pt-1 ml-1  text-red-500" />

            </div>
        </div>
    )
}
// />
// );
// };

export default CustomInput;
