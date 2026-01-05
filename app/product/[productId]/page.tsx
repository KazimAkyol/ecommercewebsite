// app/product/[productId]/page.tsx
import React from 'react'
import DetailClient from "@/app/components/detail/DetailClient";
import { products } from '@/utils/Products';

type DetailProps = {
    productId?: string
}

const Detail = async ({ params }: { params: Promise<DetailProps> }) => {
    // ✅ params'ı await ile çöz
    const resolvedParams = await params;
    const { productId } = resolvedParams;

    console.log("ProductId from params:", productId); // ✅ Bu terminal'de görünür

    const product = products.find(product => product.id == productId);

    // ✅ Server-side log
    if (product) {
        console.log("Product found:", product); // ✅ Terminal'de görünür
    } else {
        console.log("Product not found for ID:", productId); // ✅ Terminal'de görünür
    }

    return (
        <div>
            {/* ✅ Product'ı DetailClient'a prop olarak geçirin */}
            <DetailClient product={product} />
        </div>
    )
}

export default Detail