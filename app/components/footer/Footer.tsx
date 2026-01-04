
const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold">turkuaz.com</h2>
                    <p className="text-sm">Tüm haklari saklidir © 2025</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400">Hakkinda</a>
                    <a href="#" className="hover:text-gray-400">Iletisim</a>
                    <a href="#" className="hover:text-gray-400">Gizlilik Politikasi</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer