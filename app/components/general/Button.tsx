
interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = () => {
    return (
        <button onClick={() => { }}>Button</button>
    )
}

export default Button