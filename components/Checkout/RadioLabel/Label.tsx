import React from 'react'

type DataTypes = {
    method: string;
    methodValue: string;
    methodName: string;
    icon: any;
    isFirst: boolean;
    isLast: boolean;
    checked: boolean;
    setDeliveryMethod: any;
    setShipmentMethod: any;
}

function Label({ method, methodValue, methodName, icon, isFirst, isLast, checked, setDeliveryMethod, setShipmentMethod }: DataTypes) {

    return (
        <label className={
            `flex justify-between px-3 py-5 cursor-pointer 
            ${checked ? "bg-slate-300 border-2 border-[#282a3f] " : ""}
            ${isFirst ? "rounded-t-md" : ""} 
            ${isLast ? "rounded-b-md" : ""}`}
        >
            <div className="flex space-x-2">
                <input
                    type="radio"
                    name={method}
                    value={methodValue}
                    onChange={() =>
                        methodValue === "ship" || methodValue === "pickup-in-store" ?
                            setDeliveryMethod(methodValue)
                            : setShipmentMethod(methodValue)
                    }
                />
                <p>{methodName}</p>
            </div>
            <div className="flex items-center space-x-2">
                {icon}
            </div>
        </label>
    )
}

export default Label