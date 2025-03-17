import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from "@/app/lib/mongodb/models/user";
import { sendVerificationEmail } from "@/app/lib/nodemailer/mail";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        // Connect to the MongoDB database
        await connectMongoDB();

        // Retrieve the user's ID and the social media name from the request body
        const body = await req.json();
        const { userId, social } = body;



        // Check if the social media name is valid
        const validSocials = ["Twitter", "YouTube", "TikTok"];


        if (!validSocials.includes(social)) {
            return NextResponse.json({
                message: 'Social Network not valid',
            }, { status: 500 });
        }

        // Update the user's visitedSocials array by adding the new social media, if not already present
        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'User not found',
            }), { status: 404 });
        }

        console.log('user.visitedSocials', user.visitedSocials)
        if (user.visitedSocials.includes(social)) {
            return new NextResponse(JSON.stringify({
                message: 'Social media already visited',
            }), { status: 409 });
        }

        const updateResult = await User.findByIdAndUpdate(
            userId,
            { $push: { visitedSocials: social } },
            { new: true }
        );

        // Return a success response
        return NextResponse.json({
            message: 'Visited socials updated successfully',
        }, { status: 200 });
    } catch (error) {
        console.error('Database update error:', error);
        // Return an internal server error response
        return NextResponse.json({
            message: 'Internal Server Error',
            error: error,
        }, { status: 500 });
    }
}