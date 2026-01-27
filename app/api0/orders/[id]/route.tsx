import { Order } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';


// GET - Tek sipariş getir
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const order = await Order.findById(params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price image');

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order,
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

// PUT - Sipariş güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();

        const order = await Order.findByIdAndUpdate(
            params.id,
            body,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate('user', 'name email')
            .populate('orderItems.product', 'name price');

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: order,
            message: 'Order updated successfully',
        });
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

// DELETE - Sipariş sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const order = await Order.findByIdAndDelete(params.id);

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {},
            message: 'Order deleted successfully',
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