/* Heading bilesenine hangi props'larin (özelliklerin) gönderilecegini tanimlayan bir arayüz (interface) */
interface HeadingProps {
    center?: boolean;
    text: string
}

/* React.FC<HeadingProps>: Bu, Heading bileseninin bir functional component oldugunu ve props'larin HeadingProps arayüzüne uygun olmasi gerektigini belirtir */
const Heading: React.FC<HeadingProps> = ({ center, text }) => {
    return (
        <div
            className={`text-slate-500 my-3 md:my-5 px-3 md:px-10 md:text-xl ${center ? "text-center" : "text-start"}`}>
            {text}
        </div>
    )
}

export default Heading