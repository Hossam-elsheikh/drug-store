import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { Eye, EyeOff } from "lucide-react";
import classNames from 'classnames';
import { useLocale } from "@/context/LocaleProvider";

interface CustomInputProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, label, placeholder, type = "text" }) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);
    const { dir } = useLocale();

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    const inputClass = classNames(
        'focus:shadow-lg focus:border-[#198AB0] transform-all duration-300 outline-none -translate-y-0.5 flex h-9.5 w-full rounded-lg border px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50',
        {
            'border-slate-300 bg-white': !meta.error || !meta.touched,
            'border-red-500 bg-red-50': meta.error && meta.touched,
        }
    );

    return (
        <div className="flex flex-col gap-1 max-w-md">
            <label
                className={classNames('text-[13px] font-medium pb-2', {
                    'text-gray-700': !meta.error || !meta.touched,
                    'text-red-500': meta.error && meta.touched,
                })}
                htmlFor={name}
            >
                {label}
            </label>
            <div className="relative flex w-full flex-col">
                <Field
                    placeholder={placeholder}
                    {...field}
                    type={inputType}
                    className={inputClass}
                    aria-invalid={meta.error && meta.touched ? "true" : "false"}
                    aria-describedby={`${name}-error`}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className={classNames('absolute inset-y-0 flex items-center px-3 py-2', {
                            'right-0': dir === 'ltr',
                            'left-0': dir === 'rtl'
                        })}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            <ErrorMessage
                component="div"
                name={name}
                className="text-[12px] form-message pt-1 ml-1 text-red-500"
                id={`${name}-error`}
            />
        </div>
    );
};

export default CustomInput;
