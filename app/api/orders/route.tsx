import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';

// GET - Tüm siparişleri getir
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const userId = searchParams.get('userId');
        const status = searchParams.get('status');

        const skip = (page - 1) * limit;

        let query: any = {};

        if (userId) {
            query.user = userId;
        }

        if (status === 'paid') {
            query.isPaid = true;
        } else if (status === 'delivered') {
            query.isDelivered = true;
        } else if (status === 'pending') {
            query.isPaid = false;
        }

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Order.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
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

// POST - Yeni sipariş oluştur
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user,
        } = body;

        // Validasyon
        if (!orderItems || orderItems.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'No order items',
                },
                { status: 400 }
            );
        }

        if (!shippingAddress || !paymentMethod) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                },
                { status: 400 }
            );
        }

        const order = await Order.create({
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const populatedOrder = await Order.findById(order._id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price');

        return NextResponse.json(
            {
                success: true,
                data: populatedOrder,
                message: 'Order created successfully',
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