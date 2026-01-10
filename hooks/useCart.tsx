"use client"
/* bir Sepet (Cart) Context API yapisi oluturmak icin kullanilan bir React uygulamasinin parcasidir. Context API, bilesenler arasinda veri paylasimini kolaylastiran bir yöntemdir ve bu örnekte sepetle ilgili verilerin tüm bilesenlerde kullanilmasini saglar. */
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useState } from "react";

interface CartContextProps {
    productCartQty: number; // Sepetteki ürün miktari
    cartPrdcts: CardProductProps[] | null; // Sepetteki ürün listesi
    addToBasket: (product: CardProductProps) => void
}

const CartContext = createContext<CartContextProps | null>(null)
/* createContext=> React bilesenleri genellikle birbirlerinden bagimsiz calisir. Ancak bazen, bir bilesen tarafindan yönetilen veriye, cok sayida bilesenin erismesi gerekebilir. Bu tür durumlarda Context API kullanilarak, bir "global state" olusturabilir ve bu veriler, uygulamanin herhangi bir yerinden erisilebilir hale getirilebilir. */

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [productCartQty, setProductCartQty] = useState(0) // Sepetteki ürün miktari
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null) // Sepetteki ürün listesi

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            return updatedCart;
        })
    }, [cartPrdcts]);

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts
    }

    return (
        <CartContext.Provider value={value} {...props} />
    )
}

const UseCart = () => {
    const context = useContext(CartContext);
    if (context == null) {
        throw new Error("Bir hata olustu");
    }
    return context; // tüm sayfalarda kullanilabilir.
}

export default UseCart