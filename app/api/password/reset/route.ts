import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    console.log("Parsed reset password request body:", body);
    const { password, emailToken } = body;

    try {
        await connectMongoDB();

        const user = await User.findOne({ emailToken });
        if (!user) {
            return new Response(JSON.stringify({ message: 'No user found with the provided ID' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        await User.findOneAndUpdate(
            { emailToken },
            { password: hashedPassword, emailToken: null }, // Reset the token after use
            { new: true }
        );

        return new Response(JSON.stringify({ message: 'Password updated successfully, email token reset.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Error updating password:', error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}