import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';

async function seedDatabase() {
    try {
        await connectDB();

        // Örnek ürünler
        const products = [
            {
                name: 'Laptop',
                description: 'Yüksek performanslı laptop',
                price: 15000,
                category: 'electronics',
                stock: 10,
                images: ['/laptop.jpg'],
                featured: true,
            },
            {
                name: 'Telefon',
                description: 'Akıllı telefon',
                price: 8000,
                category: 'electronics',
                stock: 25,
                images: ['/phone.jpg'],
            },
        ];

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log('✅ Veritabanı başarıyla seed edildi');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed hatası:', error);
        process.exit(1);
    }
}

seedDatabase();