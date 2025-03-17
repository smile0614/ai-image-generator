import { connectMongoDB } from "@/app/lib/mongodb/mongodb";
import User from "@/app/lib/mongodb/models/user";

import type { NextApiRequest } from 'next';
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log("Parsed request body:", body);
        const { name, password, email, subscription } = body;

        await connectMongoDB();
        await User.create({ name, password, email, subscription });
        console.log("New user created");

        return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating user:', error);
        
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            // If it's an Error instance, we can access the message
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            // If it's an object with a message property
            errorMessage = (error as { message: string }).message;
        }
        
        // Return a 500 Internal Server Error response or customize based on the error
        return NextResponse.json({ message: 'Error creating user', error: errorMessage }, { status: 500 });
    }
}