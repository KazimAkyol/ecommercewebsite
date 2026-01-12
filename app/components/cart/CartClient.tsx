"use client"

import UseCart from "@/hooks/useCart"
import PageContainer from "../containers/PageContainer"
import Image from "next/image";
import Button from "../general/Button";
import { CardProductProps } from "../detail/DetailClient";
import Counter from "../general/Counter";

const CartClient = () => {

    const { cartPrdcts, removeFromCart, removeCart, addToBasketIncrease, addToBasketDecrease } = UseCart();

    console.log(cartPrdcts, "cartPrdcts");

    if (!cartPrdcts || cartPrdcts.length == 0) {
        return <div>Sepetinizde ürün bulunmamaktadir...</div>
    }

    let cartPrdctsTotal = cartPrdcts.reduce((acc: any, item: CardProductProps) => acc + item.quantity * item.price, 0);

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
                                <div className="w-1/5 flex justify-center">
                                    <Counter
                                        cardProduct={cart}
                                        increaseFunc={() => addToBasketIncrease(cart)}
                                        decreaseFunc={() => addToBasketDecrease(cart)}
                                    />
                                </div>
                                <div className="w-1/5  text-orange-600 text-lg">{cart.price} $</div>
                                <div className="w-1/5">
                                    <Button
                                        text="Ürünü Sil"
                                        small
                                        onClick={() => removeFromCart(cart)}
                                        className="hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-between my-5 py-5 border-t">
                    <button onClick={() => removeCart()} className="w-1/5 underline text-sm">Sepeti Sil</button>
                    <div className="text-lg md:text-2xl text-orange-600 font-bold">{cartPrdctsTotal} $</div>
                </div>
            </PageContainer>
        </div>
    )
}

export default CartClient