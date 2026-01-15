import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Ürün adı gereklidir'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Açıklama gereklidir'],
        },
        price: {
            type: Number,
            required: [true, 'Fiyat gereklidir'],
            min: [0, 'Fiyat 0\'dan küçük olamaz'],
        },
        images: [{
            type: String,
        }],
        category: {
            type: String,
            required: [true, 'Kategori gereklidir'],
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);