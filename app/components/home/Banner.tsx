import Image from "next/image"

const Banner = () => {
    return (
        <div className="h-[237px] bg-black">
            <div className="h-[137px] relative">
                <Image src="/hepsi.jpeg" fill alt="" />
            </div>
        </div>
    )
}

export default Banner