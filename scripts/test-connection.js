const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

async function testConnection() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        console.log('📍 URI:', process.env.MONGODB_URI?.replace(/:[^:]*@/, ':****@')); // Password'ü gizle

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ Successfully connected to MongoDB!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('📝 Collections:', await mongoose.connection.db.listCollections().toArray());

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();