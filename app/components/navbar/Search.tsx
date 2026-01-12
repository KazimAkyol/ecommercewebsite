
const Search = () => {
    return (
        <div className="hidden md:flex flex-1">
            <input className="py-2 px-3 rounded-xl outline-none flex flex-1" type="text" placeholder="Arama Yap..." />
            <button
                className="ms-1 p-2 bg-orange-800 text-sm rounded-xl border border-transparent cursor-pointer">
                Ara
            </button>
        </div>
    )
}

export default Search