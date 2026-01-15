'use server';

import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import { revalidatePath } from 'next/cache';

export async function getProducts(category?: string) {
    try {
        await connectDB();

        let query = {};
        if (category && category !== 'all') {
            query = { category };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        return { success: true, data: JSON.parse(JSON.stringify(products)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getProductById(id: string) {
    try {
        await connectDB();
        const product = await Product.findById(id);

        if (!product) {
            return { success: false, error: 'Ürün bulunamadı' };
        }

        return { success: true, data: JSON.parse(JSON.stringify(product)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createProduct(formData: FormData) {
    try {
        await connectDB();

        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            stock: Number(formData.get('stock')),
            images: JSON.parse(formData.get('images') as string),
        };

        const product = await Product.create(productData);
        revalidatePath('/products');

        return { success: true, data: JSON.parse(JSON.stringify(product)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}