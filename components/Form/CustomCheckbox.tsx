// CustomCheckbox.tsx
import React, { useState } from 'react';

interface CheckboxProps {
    label: string;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CustomCheckbox = ({
    label,
    defaultChecked = false,
    onChange,
}: CheckboxProps) => {
    const [checked, setChecked] = useState(defaultChecked);

    const handleChange = () => {
        const isChecked = !checked;
        setChecked(isChecked);
        if (onChange) {
            onChange(isChecked);
        }
    };


    return (
        <div className="checkbox">
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                {label}
            </label>
        </div>
    );
};

export default CustomCheckbox;
