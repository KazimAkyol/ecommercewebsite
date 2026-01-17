import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        images: [{
            type: String,
        }],
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;