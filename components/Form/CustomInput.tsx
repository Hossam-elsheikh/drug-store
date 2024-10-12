import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import classNames from 'classnames';
import { useLocale } from "@/context/LocaleProvider";

interface CustomInputProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    icon?: React.ReactNode;
    helperText?: string;
    disabled?: boolean;
    autoFocus? : boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
    name,
    label,
    placeholder,
    type = "text",
    icon,
    autoFocus = false,
    helperText,
    disabled = false,
}) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);
    const { dir } = useLocale();

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    const inputClass = classNames(
        'focus:shadow-lg focus:border-[#198AB0] transition-all duration-300 outline-none -translate-y-0.5 flex h-10 w-full rounded-lg border px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
        {
            'border-slate-300 bg-white': !meta.error || !meta.touched,
            'border-red-500 bg-red-50': meta.error && meta.touched,
            'pr-20': type === "password" && dir === "ltr", // Increased right padding for both icons
            'pl-20': type === "password" && dir === "rtl", // Increased right padding for both icons
            'pl-10': icon,
        }
    );

    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                className={classNames(' text-sm font-medium pb-1', {
                    'text-gray-700': !meta.error || !meta.touched,
                    'text-red-500': meta.error && meta.touched,
                })}
                htmlFor={name}
            >
                {label}
            </label>
            <div className="relative flex flex-col">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {icon}
                    </span>
                )}
                <Field
                    placeholder={placeholder}
                    {...field}
                    type={inputType}
                    className={inputClass}
                    aria-invalid={meta.error && meta.touched ? "true" : "false"}
                    aria-describedby={`${name}-error`}
                    disabled={disabled}
                    autoFocus={autoFocus}
                />
                <div className={classNames('absolute inset-y-0 flex items-center gap-1', {
                    'right-3': dir === 'ltr',
                    'left-3': dir === 'rtl'
                })}>
                    {meta.error && meta.touched && (
                        <AlertCircle size={18} className="text-red-500" />
                    )}
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
            </div>
            <ErrorMessage
                component="div"
                name={name}
                className="text-xs pt-1 ml-1 text-red-500"
                id={`${name}-error`}
            />
            {helperText && !meta.error && (
                <p className="text-xs pt-1 ml-1 text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

export default CustomInput;