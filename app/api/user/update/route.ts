import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
    
      const body = await req.json();
      const { email, name } = body;
      await connectMongoDB();

      console.log("body", email, name)
      const user = await User.findOneAndUpdate({ email }, { name }, { new: true });
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
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
        return NextResponse.json({ message: 'Error updating user', error: errorMessage }, { status: 500 });
    }
}