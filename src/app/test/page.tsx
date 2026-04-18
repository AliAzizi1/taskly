"use client"
import React, { useEffect, useState } from "react";

const Test = () => {

    const [add, setAdd] = useState<number>(5)

    return(
        <div className="container w-full h-full flex items-center justify-center">
        <button 
        className="px-4 py-2 bg-blue-500 text-white rounded
         btn hover:bg-blue-700 transition active:scale-90 hover:scale-105
          duration-300 cursor-pointer"
           onClick={() => setAdd(prev => prev + 1)}
           >مقدار : {add}</button>
        </div>
    )
} 

export default Test