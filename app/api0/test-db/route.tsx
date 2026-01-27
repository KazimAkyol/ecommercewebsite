import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/utils/dbConnect';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await dbConnect();

        const dbName = mongoose.connection.name;
        const host = mongoose.connection.host;
        const readyState = mongoose.connection.readyState;

        // ReadyState açıklaması
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };

        // Tüm collection'ları listele
        const connection: mongoose.Connection = mongoose.connection;
        const collections = await connection.listCollections().toArray();

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            data: {
                database: dbName,
                host: host,
                status: states[readyState as keyof typeof states],
                collections: collections.map(c => c.name),
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


// Tarayıcıda Test Edin:

// http:localhost:3000/api/test-db