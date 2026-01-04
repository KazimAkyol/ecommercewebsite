"use client"

import { Rating } from "@mui/material"
import Image from "next/image"

const ProductCard = ({ product }: { product: any }) => {
    return (
        <div className="w-60 shadow-lg p-2 rounded-md">
            <div className="relative h-37.5">
                <Image src={product.image} fill alt="" className="object-contain" />
            </div>
            <div className="text-center mt-2">
                <div>{product.name}</div>
                <Rating name="read-only" value={4} readOnly />
                <div className="text-orange-600 font-bold text-lg md:text-xl">${product.price}</div>
            </div>
        </div>
    )
}

export default ProductCard