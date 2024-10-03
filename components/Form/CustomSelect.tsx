import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import classNames from 'classnames';

interface CustomSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Allow onChange prop
    disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, label, options, onChange, disabled = false }) => {
    const [field, meta] = useField(name);
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className={classNames('text-sm font-medium mt-0.5', {
                'text-red-500': meta.error && meta.touched,
                'text-gray-700': !meta.error || !meta.touched,
            })} htmlFor={name}>
                {label}
            </label>
            <Field 
                as="select" 
                {...field} 
                id={name} 
                className={classNames('border rounded-md p-2', {
                    'border-red-500': meta.error && meta.touched,
                    'border-gray-300': !meta.error || !meta.touched,
                })} 
                onChange={(e:any) => {
                    field.onChange(e); // Call Formik's onChange
                    if (onChange) onChange(e); // Call the custom onChange if provided
                }} 
                disabled={disabled}
            >
                <option value="" label={`Select ${label}`} />
                {options.map((option) => (
                    <option key={option.value} value={option.value} label={option.label} />
                ))}
            </Field>
            <ErrorMessage component="div" name={name} className="text-xs text-red-500" />
        </div>
    );
};

export default CustomSelect;