const mongoose = require('mongoose');
const dotenv = require('dotenv');

// .env dosyasını yükle
dotenv.config({ path: '.env' });

async function testConnection() {
    try {
        console.log('🔄 Connecting to MongoDB...');

        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error('MONGODB_URI not found in .env');
        }

        // Password'ü gizleyerek URI'yi göster
        const maskedUri = uri.replace(/:[^:]*@/, ':****@');
        console.log('📍 URI:', maskedUri);

        await mongoose.connect(uri);

        console.log('✅ Successfully connected to MongoDB!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Ready State:', mongoose.connection.readyState);

        // Collection'ları listele
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📝 Collections:', collections.map(c => c.name));

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:');
        console.error('Error:', error.message);
        process.exit(1);
    }
}

testConnection();