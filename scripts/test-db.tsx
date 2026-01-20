import dbConnect from "@/app/lib/db/dbConnect";

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB connection...');
        await dbConnect();
        console.log('✅ Connection test successful!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        process.exit(1);
    }
}

testConnection();