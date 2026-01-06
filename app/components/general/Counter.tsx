// Typescript'in interface özelligi, Counter bileseninin almasi gereken props'lari tanimlamak icin kullanilir.
interface CounterProps {
    cardProduct: any,
    increaseFunc: () => void
    decreaseFunc: () => void
}

const Counter: React.FC<CounterProps> = ({ cardProduct, increaseFunc, decreaseFunc }) => {
    return (
        <div>
            <div>-</div>
            <div>0</div>
            <div>+</div>
        </div>
    )
}

export default Counter