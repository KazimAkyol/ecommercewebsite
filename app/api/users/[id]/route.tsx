import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/mongodb';
import User from '@/app/lib/db/models/User';
import bcrypt from 'bcryptjs';

// GET - Tek kullanıcı getir
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const user = await User.findById(params.id).select('-password');

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user,
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

// PUT - Kullanıcı güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const body = await request.json();
        const { password, email, ...updateData } = body;

        // Email güncellenmek isteniyorsa, benzersiz olup olmadığını kontrol et
        if (email) {
            const existingUser = await User.findOne({
                email: email.toLowerCase(),
                _id: { $ne: params.id },
            });

            if (existingUser) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Email already in use',
                    },
                    { status: 400 }
                );
            }
            updateData.email = email.toLowerCase();
        }

        // Şifre güncellenmek isteniyorsa, hashle
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(
            params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user,
            message: 'User updated successfully',
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

// DELETE - Kullanıcı sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();

        const user = await User.findByIdAndDelete(params.id);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'User not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {},
            message: 'User deleted successfully',
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