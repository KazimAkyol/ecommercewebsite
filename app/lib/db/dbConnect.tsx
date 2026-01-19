import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

// Mongoose ayarları
mongoose.set('strictQuery', true); // Mongoose 7+ için gerekli

async function dbConnect() {
    if (cached.conn) {
        console.log('✅ Using existing MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // Bağlantı havuzu ayarları
            maxPoolSize: 10,
            minPoolSize: 5,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            family: 4, // IPv4 kullan
        };

        cached.promise = mongoose
            .connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                console.log('✅ MongoDB connected successfully');
                console.log(`📍 Database: ${mongoose.connection.name}`);
                console.log(`🌐 Host: ${mongoose.connection.host}`);
                return mongoose;
            })
            .catch((error) => {
                console.error('❌ MongoDB connection error:', error);
                cached.promise = null;
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('❌ Failed to connect to MongoDB:', e);
        throw e;
    }

    return cached.conn;
}

// Bağlantı olaylarını dinle
if (mongoose.connection) {
    mongoose.connection.on('connected', () => {
        console.log('🔌 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('🔌 Mongoose disconnected from MongoDB');
    });

    // Uygulama kapandığında bağlantıyı temiz bir şekilde kapat
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('👋 Mongoose connection closed due to app termination');
        process.exit(0);
    });
}

export default dbConnect;

// Bağlantı durumunu kontrol etmek için yardımcı fonksiyon
export function isConnected(): boolean {
    return mongoose.connection.readyState === 1;
}

// Bağlantıyı kapatmak için yardımcı fonksiyon
export async function dbDisconnect(): Promise<void> {
    if (cached.conn) {
        await mongoose.disconnect();
        cached.conn = null;
        cached.promise = null;
        console.log('👋 MongoDB connection closed');
    }
}