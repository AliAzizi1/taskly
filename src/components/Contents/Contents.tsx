'use client'
import React from "react";
import { usePathname } from "next/navigation";

const Contents = ({children}:any) => {
    const pathName = usePathname()

    return(
        <div style={{paddingBottom: "62px"}} className="gb-white border-1 border-gray-200 shadow-lg rounded p-8 h-screen overflow-auto lg:overflow-hidden">
            {children}
        </div>
    )
}

export default Contents