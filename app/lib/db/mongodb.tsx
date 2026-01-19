import mongoose from 'mongoose';

class Database {
    private static instance: Database;
    private connection: typeof mongoose | null = null;
    private connectionPromise: Promise<typeof mongoose> | null = null;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(): Promise<typeof mongoose> {
        if (this.connection) {
            return this.connection;
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        try {
            this.connectionPromise = mongoose.connect(MONGODB_URI, {
                bufferCommands: false,
                maxPoolSize: 10,
            });

            this.connection = await this.connectionPromise;

            console.log('✅ MongoDB connected successfully');
            console.log(`📍 Database: ${this.connection.connection.name}`);

            this.setupEventListeners();

            return this.connection;
        } catch (error) {
            this.connectionPromise = null;
            console.error('❌ MongoDB connection failed:', error);
            throw error;
        }
    }

    private setupEventListeners(): void {
        mongoose.connection.on('connected', () => {
            console.log('🔌 Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('🔌 Mongoose disconnected');
        });
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
            this.connectionPromise = null;
            console.log('👋 MongoDB disconnected');
        }
    }

    public isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }
}

const dbConnect = async () => {
    const db = Database.getInstance();
    return db.connect();
};

export default dbConnect;
export const isConnected = () => Database.getInstance().isConnected();
export const dbDisconnect = () => Database.getInstance().disconnect();