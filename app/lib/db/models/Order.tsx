import mongoose, { Document, Schema, Model, Types } from 'mongoose';

interface IOrderItem {
    product: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface IShippingAddress {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentResult?: {
        id: string;
        status: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                image: { type: String, required: true },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            id: String,
            status: String,
            email_address: String,
        },
        itemsPrice: {
            type: Number,
            required: true,
        },
        taxPrice: {
            type: Number,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: Date,
    },
    {
        timestamps: true,
    }
);

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ isPaid: 1 });
orderSchema.index({ isDelivered: 1 });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;