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
    methodState: any,

}

function Label({ method, methodValue, methodName, icon, isFirst, isLast, checked, setDeliveryMethod, setShipmentMethod, methodState }: DataTypes) {

    return (
        <label className={
            `flex justify-between px-3 py-5 cursor-pointer 
            ${methodState === methodValue ? "bg-[#eafaff]  border border-[#282a3f] " : null}
            ${isFirst ? "rounded-t-md" : null} 
            ${isLast ? "rounded-b-md" : null}`
        }
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