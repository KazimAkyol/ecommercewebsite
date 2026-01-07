import { CardProductProps } from "../detail/DetailClient";

// Typescript'in interface özelligi, Counter bileseninin almasi gereken props'lari tanimlamak icin kullanilir.
interface CounterProps {
    cardProduct: CardProductProps,
    increaseFunc: () => void; // increaseFunc disardan bir parametre almiyor void ile
    decreaseFunc: () => void;
}

// bu class stok sayisini arttirir ve azaltir.
const Counter: React.FC<CounterProps> = ({ cardProduct, increaseFunc, decreaseFunc }) => {

    const buttonStyle = "w-8 h-8 border flex items-center justify-center text-lg rounded-md cursor-pointer"

    return (
        <div className="flex items-center gap-2">
            <div className={buttonStyle} onClick={decreaseFunc}>-</div>
            <div className="text-lg md:text-xl">{cardProduct?.quantity}</div>
            <div className={buttonStyle} onClick={increaseFunc}>+</div>
        </div>
    )
}

export default Counter