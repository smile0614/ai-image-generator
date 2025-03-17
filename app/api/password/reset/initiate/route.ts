import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { NextResponse, NextRequest } from "next/server";
import { sendPasswordResetEmail } from '@/app/lib/nodemailer/mail';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    console.log("Parsed reset password request body:", body);
    const { email } = body;

    try {
        await connectMongoDB();

        const emailToken = uuidv4();
        
        const user = await User.findOneAndUpdate(
            { email },
            { emailToken },
            { new: true }
        );

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (user.authMethod !== 'email') {
            return new Response(JSON.stringify({ message: "Password reset is only available for accounts created with an email and password." }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await sendPasswordResetEmail(user.email, emailToken);
        return new Response(JSON.stringify({ message: 'Password reset email sent' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err: any) {
        console.error("Error updating user or sending email:", err);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}