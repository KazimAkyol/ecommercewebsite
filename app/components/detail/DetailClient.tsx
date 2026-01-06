"use client"

import Image from "next/image"
import PageContainer from "../containers/PageContainer"

const DetailClient = ({ product }: { product: any }) => {
    return (
        <div className="my-10">
            <PageContainer>
                <div className="block md:flex">
                    <div className="relative h-100 w-50 flex-1">
                        <Image src={product?.image} fill alt="" />
                    </div>
                    <div className="w-3/4">right</div>
                </div>
            </PageContainer>
        </div>
    )
}

export default DetailClient