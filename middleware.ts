import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // console.log("Middleware executed. Original URL:", request.nextUrl.pathname);

    const url = request.nextUrl.clone();
    const pathname = url.pathname.toLowerCase();

    // Skip middleware for API routes and static files
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/static/')) {
        return NextResponse.next();
    }

    if (url.pathname !== pathname) {
        url.pathname = pathname;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}