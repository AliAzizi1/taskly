"use client";

import React, { useEffect, useState } from "react";

type Test = {
    id: number;
    name: string;
    age: number;
}

const Product = () => {

  const [state, setState] = useState<number | null>(null);

  const ali = {
    id : 1,
    name : "ali",
    age : 20
  } 

  useEffect(() => {
    setState(ali.id);
  }, [])

  return (
    <div>Product {ali.name} | {state || null}</div>
  )
}

export default Product;