import { Order } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Siparişi teslim edildi olarak işaretle
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const order = await Order.findById(params.id);

        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Order not found',
                },
                { status: 404 }
            );
        }

        order.isDelivered = true;
        order.deliveredAt = new Date();

        const updatedOrder = await order.save();

        return NextResponse.json({
            success: true,
            data: updatedOrder,
            message: 'Order marked as delivered',
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