import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectToDatabase} from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if(authInstance) return authInstance;

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;

        if(!db) throw new Error('MongoDB connection not found');

        authInstance = betterAuth({
            database: mongodbAdapter(db as any),
            secret: process.env.BETTER_AUTH_SECRET,
            baseURL: process.env.BETTER_AUTH_URL,
            emailAndPassword: {
                enabled: true,
                disableSignUp: false,
                requireEmailVerification: false,
                minPasswordLength: 8,
                maxPasswordLength: 128,
                autoSignIn: true,
            },
            plugins: [nextCookies()],
        });

        return authInstance;
    } catch (error: any) {
        // If database connection fails, create a mock auth instance
        // This allows the app to start even without database
        console.error('Database connection failed, using mock auth:', error?.message);

        // Create a minimal auth instance that throws helpful errors
        const mockAuth = {
            api: {
                signUpEmail: () => { throw new Error('DATABASE_NOT_CONNECTED'); },
                signInEmail: () => { throw new Error('DATABASE_NOT_CONNECTED'); },
                signOut: () => { throw new Error('DATABASE_NOT_CONNECTED'); },
                getSession: () => { throw new Error('DATABASE_NOT_CONNECTED'); },
            }
        };

        authInstance = mockAuth as any;
        return authInstance;
    }
}

export const auth = await getAuth();
