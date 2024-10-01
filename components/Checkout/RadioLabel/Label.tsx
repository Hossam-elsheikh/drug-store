import { useLocale } from '@/context/LocaleProvider';
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
    methodState: any;
    formErrorPayment: any;

}

function Label({ method, methodValue, methodName, icon, isFirst, isLast, setDeliveryMethod, setPaymentMethod, methodState, formErrorPayment }: DataTypes) {
    const { locale,dir }: any = useLocale();
    
    return (
        <label
            className={`
                flex justify-between items-center p-4 cursor-pointer
                rounded-t-md rounded-b-md group
                transition-all duration-200 ease-in-out border
                ${methodState === methodValue ? 'bg-gray-50 border border-gray-300 text-gray-900 scale-[1.0090] shadow-sm' : 'text-gray-700 hover:bg-gray-100'}  
            `}
        >
            <div className="flex items-center space-x-4 transition-all duration-200">
                <input
                    type="radio"
                    name={method}
                    value={methodValue}
                    onChange={() =>
                        methodValue === "ship" || methodValue === "pickup-in-store"
                            ? setDeliveryMethod(methodValue)
                            : setPaymentMethod(methodValue)
                    }
                    onFocus={formErrorPayment}
                    className={`w-5 h-5 text-gray-600 bg-gray-700 border-gray-300 focus:outline-none accent-[#282a3f] ${locale === "ar" ? 'ml-5' : ''}`}
                    />
                <p className={`text-base font-medium ${methodState === methodValue ? 'text-gray-900' : 'text-gray-700'}`}>{methodName}</p>
            </div>
            <div className="flex items-center space-x-2 transition-colors duration-200 ease-in-out">
                {React.cloneElement(icon, {
                    className: `group-hover:text-gray-700 duration-200 ${methodState === methodValue ? 'text-gray-900' : 'text-gray-400 '}`
                })}
            </div>
        </label>
    )
}

export default Label