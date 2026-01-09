"use client"

import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useState } from "react";

interface CartContextProps {
    productCartQty: number; // Sepetteki ürün miktari
    cardPrdcts: CardProductProps[] | null; // Sepetteki ürün listesi
    addToBasket: (product: CardProductProps) => void
}

const CartContext = createContext<CartContextProps | null>(null)

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [productCartQty, setProductCartQty] = useState(0) // Sepetteki ürün miktari
    const [cardPrdcts, setCardPrdcts] = useState<CardProductProps[] | null>(null) // Sepetteki ürün listesi

    const addToBasket = useCallback((product: CardProductProps) => {
        setCardPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            return updatedCart;
        })
    }, [cardPrdcts]);

    let value = {
        productCartQty,
        addToBasket,
        cardPrdcts
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