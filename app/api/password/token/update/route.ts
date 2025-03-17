import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    const { userId } = body;

    await connectMongoDB(); // Ensure MongoDB connection is established

    const emailToken = uuidv4(); // Generating a new UUID for the email token

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        user.emailToken = emailToken;
        await user.save(); // Save the updated user information

        return new NextResponse(JSON.stringify({ message: 'User email token updated.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse(JSON.stringify({ message: "Failed to update email token." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}