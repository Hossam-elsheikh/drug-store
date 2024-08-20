import React from 'react'

type DataTypes = {
    method: string;
    methodValue: string;
    methodName: string;
    icon: any;
    isFirst: boolean;
    isLast: boolean;
    setDeliveryMethod: any;
    setPaymentMethod: any;
    methodState: any,
    formErrorPayment: any,
}

function Label({ method, methodValue, methodName, icon, isFirst, isLast, setDeliveryMethod, setPaymentMethod, methodState, formErrorPayment }: DataTypes) {
    // console.log(methodValue);

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
                            : setPaymentMethod(methodValue)
                    }
                    onFocus={formErrorPayment}
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