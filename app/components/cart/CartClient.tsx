"use client"

import UseCart from "@/hooks/useCart"
import PageContainer from "../containers/PageContainer"
import Image from "next/image";
import Button from "../general/Button";

const CartClient = () => {

    const { cartPrdcts } = UseCart();

    console.log(cartPrdcts, "cartPrdcts");

    if (!cartPrdcts || cartPrdcts.length == 0)
        return <div>Sepetinizde ürün bulunmamaktadir...</div>

    return (
        <div className="my-3 md:my-10">
            <PageContainer>
                <div className="flex items-center gap-3 text-center border-b py-3 font-semibold">
                    <div className="w-1/5">Ürün Resmi</div>
                    <div className="w-1/5">Ürün Adi</div>
                    <div className="w-1/5">Ürün Miktari</div>
                    <div className="w-1/5">Ürün Fiyati</div>
                    <div className="w-1/5"></div>
                </div>
                <div>
                    {
                        cartPrdcts.map(cart => (
                            <div className="flex items-center justify-between text-center my-5" key={cart.id}>
                                <div className="w-1/5 items-center justify-center">
                                    <Image src={cart.image} width={100} height={100} alt="" />
                                </div>
                                <div className="w-1/5">{cart.name}</div>
                                <div className="w-1/5">{cart.quantity}</div>
                                <div className="w-1/5  text-orange-600 text-lg">{cart.price} $</div>
                                <div className="w-1/5">
                                    <Button text="Ürünü Sil" small onClick={() => { }} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </PageContainer>
        </div>
    )
}

export default CartClient