import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env');

    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log(`✅ Connected to database ${process.env.NODE_ENV}`);
    } catch (err: any) {
        cached.promise = null;

        // Check if it's an Atlas IP whitelist error
        if (err?.message && err.message.includes('Could not connect to any servers in your MongoDB Atlas cluster')) {
            console.error('❌ MongoDB Atlas Connection Failed!');
            console.error('📋 SOLUTION: Whitelist your IP in MongoDB Atlas:');
            console.error('   1. Go to: https://cloud.mongodb.com');
            console.error('   2. Login to your account');
            console.error('   3. Go to: Network Access → IP Access List');
            console.error('   4. Click: Add IP Address');
            console.error('   5. Add: 0.0.0.0/0 (Allow Access from Anywhere) OR your current IP');
            console.error('   6. Click: Confirm');
            console.error('');
            console.error('🔄 After whitelisting, restart the app: npm run dev');
            console.error('');

            throw new Error('MONGODB_ATLAS_IP_NOT_WHITELISTED');
        }

        throw err;
    }

    return cached.conn;
}
