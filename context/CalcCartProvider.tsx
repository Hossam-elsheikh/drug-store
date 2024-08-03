'use client'

import React, { createContext, useState } from "react"

const CalcCartContext = createContext({})

export const CalcCartProvider = ({ children }: { children: React.ReactNode }) => {

const [calcCart,setCalcCart]=useState(0)

    return (
        <CalcCartContext.Provider value={{calcCart,setCalcCart}}>
            {children}
        </CalcCartContext.Provider>
    )
}

export default CalcCartContext