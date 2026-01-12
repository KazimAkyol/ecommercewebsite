"use client"
/* bir Sepet (Cart) Context API yapisi oluturmak icin kullanilan bir React uygulamasinin parcasidir. Context API, bilesenler arasinda veri paylasimini kolaylastiran bir yöntemdir ve bu örnekte sepetle ilgili verilerin tüm bilesenlerde kullanilmasini saglar. */
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
    productCartQty: number; // Sepetteki ürün miktari
    cartPrdcts: CardProductProps[] | null; // Sepetteki ürün listesi
    addToBasket: (product: CardProductProps) => void // Sepete ürün ekleme function
    removeFromCart: (product: CardProductProps) => void // Sepetten ürün silme function
    removeCart: () => void // Sepeti silme function
}

const CartContext = createContext<CartContextProps | null>(null)
/* createContext=> React bilesenleri genellikle birbirlerinden bagimsiz calisir. Ancak bazen, bir bilesen tarafindan yönetilen veriye, cok sayida bilesenin erismesi gerekebilir. Bu tür durumlarda Context API kullanilarak, bir "global state" olusturabilir ve bu veriler, uygulamanin herhangi bir yerinden erisilebilir hale getirilebilir. */

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [productCartQty, setProductCartQty] = useState(0) // Sepetteki ürün miktari
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null) // Sepetteki ürün listesi

    useEffect(() => {
        let getItem: any = localStorage.getItem("cart");
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem);
        setCartPrdcts(getItemParse);
    }, []);
    /* useEffect: Sayfa yüklendiginde, yerel depolama (localStorage) kontrol edilir ve cart adli veiriyi alarak sepetteki ürünleri cartPrdcts state'ine set eder. */

    const removeCart = useCallback(() => {
        setCartPrdcts(null);
        toast.success("Sepet temizlendi");
        localStorage.setItem("cart", JSON.stringify(null));
    }, []);

    /* useCallback: React Hook'larindan biridir ve fonksiyonun bellekte yeniden olusturulmasini önlemek amaciyla kullanilir. */
    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            toast.success("Ürün sepete eklendi");
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        })
    }, [cartPrdcts]);

    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProducts = cartPrdcts.filter(cart => cart.id !== product.id);

            setCartPrdcts(filteredProducts);
            toast.success("Ürün sepetten silindi");
            localStorage.setItem("cart", JSON.stringify(filteredProducts));
        }
    }, [cartPrdcts]);

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart
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