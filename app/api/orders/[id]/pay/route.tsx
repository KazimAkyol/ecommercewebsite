import { Order } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Siparişi ödendi olarak işaretle
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();
        const { id, status, email_address } = body;

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

        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id,
            status,
            email_address,
        };

        const updatedOrder = await order.save();

        return NextResponse.json({
            success: true,
            data: updatedOrder,
            message: 'Order marked as paid',
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