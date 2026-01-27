import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/mongodb';
import User from '@/app/lib/db/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email, password } = body;

        // Validasyon
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Please provide email and password',
                },
                { status: 400 }
            );
        }

        // Kullanıcıyı bul
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Şifre kontrolü
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Şifreyi response'dan çıkar
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json({
            success: true,
            data: userResponse,
            message: 'Login successful',
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