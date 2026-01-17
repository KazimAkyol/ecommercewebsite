import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index
userSchema.index({ email: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;