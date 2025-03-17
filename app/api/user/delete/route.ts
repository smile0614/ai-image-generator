import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export async function DELETE (req: NextRequest, res: NextResponse) {
    try {
        const token = await getToken({req});
        console.log('token', token)
        const body = await req.json();
        const { email } = body;
        await connectMongoDB();

        if (token && token.email === email) {
            // Find and delete the user from the database
            const user = await User.findOneAndDelete({ email });
            if (!user) {
                return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
            }

            // Successfully deleted the user
            return new NextResponse(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
        } else {
            // Unauthorized if no session or email does not match
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }
    } catch (error: unknown) {
        console.error('Error deleting user:', error);
        
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            // If it's an Error instance, we can access the message
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            // If it's an object with a message property
            errorMessage = (error as { message: string }).message;
        }
        
        // Return a 500 Internal Server Error response or customize based on the error
        return NextResponse.json({ message: 'Error deleting user', error: errorMessage }, { status: 500 });
    }
}