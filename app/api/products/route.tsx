import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';


// GET - Tüm ürünleri getir
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        let query: any = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .limit(50);

        return NextResponse.json({
            success: true,
            data: products,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// POST - Yeni ürün ekle
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json(
            {
                success: true,
                data: product,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 400 }
        );
    }
}