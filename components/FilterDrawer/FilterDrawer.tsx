import React, { useState } from 'react';
import CustomCheckbox from '../Form/CustomCheckbox';

const items = [
    { id: "InStock", label: "In Stock" },
    { id: "OutStock", label: "Out Of Stock" },
];

function FilterDrawer() {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (id, checked) => {
        setCheckedItems(prevState => ({ ...prevState, [id]: checked }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Checked Items:', checkedItems);
    };

    return (
        <section className="bg-white relative overflow-hidden overflow-y-auto">
            <div className="w-full mx-auto flex flex-col justify-center py-24 relative p-1">
                <div className="mx-auto w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            <h1>Availability</h1>
                            {items.map((item) => (
                                <CustomCheckbox
                                    key={item.id}
                                    label={item.label}
                                    defaultChecked={false}
                                    onChange={(checked) => handleCheckboxChange(item.id, checked)}
                                />
                            ))}
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FilterDrawer;
