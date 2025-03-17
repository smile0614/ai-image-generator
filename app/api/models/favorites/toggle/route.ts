import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import Image from '@/app/lib/mongodb/models/image';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await connectMongoDB();
        const body = await req.json();
        const { userId, model } = body;
        console.log("Model body", body)

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Initialize favoriteModels if it doesn't exist
        if (!user.favoriteModels) {
            user.favoriteModels = [];
        }

        let favoriteModelsUpdated = false;
        // Toggle image in favoriteModels
        if (user.favoriteModels.includes(model)) {
            console.log("Model in favoriteModels")
            user.favoriteModels = user.favoriteModels.filter((img: string) => img !== model);
            favoriteModelsUpdated = false; // Set to false since it is being removed
        } else {
            // If Model is not in favoriteModels, add it
            console.log("Model not in favoriteModels")
            user.favoriteModels.push(model);
            favoriteModelsUpdated = true; // Set to true since it is being added
        }

        await user.save();

        return NextResponse.json({
            message: 'Favorite models updated successfully',
            favoriteModels: user.favoriteModels
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating user favoriteModels:', error);

        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            errorMessage = (error as { message: string }).message;
        }

        return NextResponse.json({
            message: 'Error updating user favoriteModels',
            error: errorMessage
        }, { status: 500 });
    }
}