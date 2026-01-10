"use client"

import UseCart from "@/hooks/useCart"
import PageContainer from "../containers/PageContainer"

const CartClient = () => {

    const { cartPrdcts } = UseCart();

    console.log(cartPrdcts, "cartPrdcts");

    return (
        <div>
            <PageContainer>
                <div>

                </div>
            </PageContainer>

        </div>
    )
}

export default CartClient