import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/app/lib/db/models';
import dbConnect from '@/app/lib/db/mongodb';
import bcrypt from 'bcryptjs';

// GET - Tüm kullanıcıları getir (Admin only)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const role = searchParams.get('role');

        const skip = (page - 1) * limit;

        let query: any = {};

        if (role) {
            query.role = role;
        }

        const users = await User.find(query)
            .select('-password') // Şifreyi döndürme
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: users,
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

// POST - Yeni kullanıcı oluştur (Register)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, password, role } = body;

        // Validasyon
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Please provide all required fields',
                },
                { status: 400 }
            );
        }

        // Email kontrolü
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User already exists with this email',
                },
                { status: 400 }
            );
        }

        // Şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Kullanıcı oluştur
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || 'user',
        });

        // Şifreyi response'dan çıkar
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json(
            {
                success: true,
                data: userResponse,
                message: 'User created successfully',
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