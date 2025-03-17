import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import Image from '@/app/lib/mongodb/models/image';
import User from "@/app/lib/mongodb/models/user";

interface RequestBody {
    imageLength?: number;
    filterType?: string;
    sortBy?: string;
    userId?: string;
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        // Parse request data
        const { imageLength = 10, filterType = 'all', sortBy = 'newest', userId }: RequestBody = await req.json();
        const limit = imageLength > 0 ? imageLength + 10 : 10;
        const extraLimit = limit + 1; // Fetch an additional image to check for "hasMoreImages"
        let images: any[] = [];

        if (filterType === 'all' && sortBy === 'newest') {
            images = await Image.find({
                type_gen: 'txt2img',
                facelock_type: 'None',
                shared_gallery: true
            })
            .sort({ createdAt: -1 })
            .limit(extraLimit);

        } else if (filterType === 'mostLiked' && sortBy === 'likes') {
            images = await Image.find({
                type_gen: 'txt2img',
                facelock_type: 'None',
                shared_gallery: true
            })
            .sort({ gallery_image_likes: -1 })
            .limit(extraLimit);

        } else if (filterType === 'favorites' && sortBy === 'newest' && userId) {
            const user = await User.findById(userId);

            if (user && user.favorites) {
                images = await Image.find({
                    res_image: { $in: user.favorites },
                    type_gen: 'txt2img',
                    facelock_type: 'None',
                    shared_gallery: true
                })
                .sort({ createdAt: -1 })
                .limit(extraLimit);
            }
        }

        const hasMoreImages = images.length > limit;
        if (hasMoreImages) images.pop(); // Remove the extra image for response

        if (images.length === 0) {
            return NextResponse.json({ message: 'No images found with the specified criteria', hasMoreImages: false }, { status: 404 });
        }

        return NextResponse.json({ message: 'Images found successfully', images, hasMoreImages }, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);

        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

        return NextResponse.json({ message: 'Error fetching images', error: errorMessage }, { status: 500 });
    }
}