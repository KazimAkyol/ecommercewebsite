import React from 'react'
import DetailClient from "@/app/components/detail/DetailClient";
import { products } from '@/utils/Products';

type DetailProps = {
    productId?: string
}

const Detail = ({ params }: { params: DetailProps }) => {

    const { productId } = params;

    const product = products.find(product => product.id == productId);

    console.log(product, "product");

    return (
        <div>
            <DetailClient />
        </div>
    )
}

export default Detail