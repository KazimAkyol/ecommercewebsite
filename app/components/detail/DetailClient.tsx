"use client"

import Image from "next/image"
import PageContainer from "../containers/PageContainer"

const DetailClient = ({ product }: { product: any }) => {
    return (
        <div className="my-10">
            <PageContainer>
                <div className="block md:flex gap-10 justify-center">
                    <div className="relative h-100 w-50 flex-1">
                        <Image src={product?.image} fill alt="" />
                    </div>
                    <div className="w-1/2 space-y-3">
                        <div className="text-xl md:text-2xl">{product?.name}</div>
                        <div className="text-slate-500">{product?.description}</div>
                        <div className="flex items-center gap-2">
                            <div>STOK DURUMU:</div>
                            {
                                product.inStock
                                    ?
                                    <div className="text-green-500">Ürün Stokta Mevcut</div> :
                                    <div className="text-red-500">Ürün Stokta Bulunmamakta</div>
                            }
                        </div>
                        
                    </div>
                </div>
            </PageContainer>
        </div>
    )
}

export default DetailClient