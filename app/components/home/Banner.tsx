import Image from "next/image"

const Banner = () => {
    return (
        <div className="h-59.25 bg-black flex items-center">
            <div className="h-34.25 relative w-full">
                <Image src="/hepsi.jpeg" fill alt="" className="object-cover" />
            </div>
        </div>
    )
}

export default Banner