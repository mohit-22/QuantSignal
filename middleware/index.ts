import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";

export async function middleware(request: NextRequest) {
    // Allow access to the error page and static assets
    if (request.nextUrl.pathname.startsWith('/mongodb-error') ||
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.includes('favicon') ||
        request.nextUrl.pathname.startsWith('/assets') ||
        request.nextUrl.pathname.startsWith('/sign-in') ||
        request.nextUrl.pathname.startsWith('/sign-up')) {
        return NextResponse.next();
    }

    // Try to connect to database first for all routes except auth pages
    try {
        await connectToDatabase();
    } catch (error: any) {
        // If database connection fails, redirect to error page
        console.error('Database connection failed in middleware:', error?.message);
        return NextResponse.redirect(new URL("/mongodb-error", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
