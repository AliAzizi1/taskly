import React from "react";


interface ProductProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{}>;
}


async function Product(props: ProductProps) {

    console.log(props)

    const { id } = await props.params;

    return (
        <div>Product {id}</div>
    )
}

export default Product;