import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Lütfen isim girin'],
        },
        email: {
            type: String,
            required: [true, 'Lütfen email girin'],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
            select: false, // Varsayılan olarak sorgularda gelmez
        },
        image: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true, // createdAt ve updatedAt otomatik
    }
);

// Modeli oluştur veya mevcut modeli kullan (hot reload için)
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);