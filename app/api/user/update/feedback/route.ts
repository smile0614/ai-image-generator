import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from "@/app/lib/mongodb/models/user";

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        // Connect to the MongoDB database
        await connectMongoDB();

        // Retrieve the feedback data from the request body
        const body = await req.json();
        const { 
            userId, 
            rating, 
            // feedback1, 
            // feedback2 
        } = body;

        // Validate the feedback data
        // if (!rating || !feedback1 || !feedback2) {
        if (!rating) {
            return new NextResponse(JSON.stringify({
                message: 'Incomplete feedback data provided',
            }), { status: 400 });
        }

         // Check if feedback has already been submitted by this user
         const existingUser = await User.findById(userId);
         if (existingUser && existingUser.feedbackSubmitted) {
             return new NextResponse(JSON.stringify({
                 message: 'Feedback already submitted',
             }), { status: 409 }); // 409 Conflict
         }

        // Find the user and update the feedback fields
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    feedbackSubmitted: true,
                    feedbackRating: rating,
                    // feedback1: feedback1,
                    // feedback2: feedback2,
                    feedbackSubmittedTime: new Date(),
                }
            },
            { new: true }
        );

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'User not found',
            }), { status: 404 });
        }

        // Return a success response
        return new NextResponse(JSON.stringify({
            message: 'Feedback submitted successfully',
        }), { status: 200 });
    } catch (error) {
        console.error('Database update error:', error);
        return new NextResponse(JSON.stringify({
            message: 'Internal Server Error',
            error: error,
        }), { status: 500 });
    }
};