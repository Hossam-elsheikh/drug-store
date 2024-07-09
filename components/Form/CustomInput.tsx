import React from "react";
import { Field, ErrorMessage, useField } from "formik";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, placeholder, type = "text" }) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1">
            <label className="text-[13px] w-full max-w-[280px] font-medium text-gray-700" htmlFor={name}>
                {label}
            </label>
            <div className="flex w-full flex-col relative">
                <Field
                    placeholder={placeholder}
                    {...field}
                    type={inputType}
                    className="focus:shadow-lg focus:border-[#198AB0] transform-all duration-300 outline-none -translate-y-0.5 flex h-9.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
                <ErrorMessage
                    component="div"
                    name={name}
                    className="text-[12px] form-message pt-1 ml-1 text-red-500"
                />
            </div>
           
        </div >
    );
};

export default CustomInput;