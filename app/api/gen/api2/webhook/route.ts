import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath } from 'url';
import { connectMongoDB } from "@/app/lib/mongodb/mongodb";
import Image from '@/app/lib/mongodb/models/image';
import User from "@/app/lib/mongodb/models/user";
import { promises as fs } from "fs";

const USER_IMAGES_PATH = process.env.USER_IMAGES_PATH!;
const BASE_URL = process.env.BASE_URL!;

// Define the POST handler for the file upload
export async function POST(req: NextRequest) {

    if (req.headers.get("Content-Type")?.includes("multipart/form-data")) {
        try {
            // console.log('multipart/form-data');
            await connectMongoDB();

            // Parse the incoming form data
            const formData = await req.formData();
            // console.log('webhook FormData:', formData);

            // Get the file from the form data and ensure it's treated as a File
            const file = formData.get("res_image");
            const id_gen = formData.get("id_gen");
            const host_gen = formData.get("host_gen");
            const time_gen = formData.get("time_gen");
            const age = formData.get("age");
            const gender = formData.get("gender");
            const ethnicity = formData.get("ethnicity");

            // Check if a file is received and is an instance of File
            if (!file || typeof file === 'string') {
                // If no file is received or if the type is not a File, return a JSON response with an error
                return new NextResponse(JSON.stringify({ message: "No files received or invalid file type, but request processed." }), { status: 200 });
            }

            const imageDoc = await Image.findById(id_gen);
            if (!imageDoc) {
                console.log('No image found with the provided ID', id_gen);
                return new NextResponse(JSON.stringify({ message: "Image ID not found, but request processed." }), { status: 200 });
            }

            const userDoc = await User.findById(imageDoc.userId);
            if (!userDoc) {
                console.log('No user found for the provided image ID', id_gen);
                return new NextResponse(JSON.stringify({ message: "User for image ID not found, but request processed." }), { status: 200 });
            }

            // Define the directory path above the project directory
            const parentDir = `${USER_IMAGES_PATH}${userDoc._id.toString()}`;
            await fs.mkdir(parentDir, { recursive: true });

            const fileExtension = path.extname(file.name);
            const filename = `${id_gen}${fileExtension}`;
            const filePath = path.join(parentDir, filename);

            const buffer = Buffer.from(await file.arrayBuffer());

            await writeFile(
                filePath,
                buffer
            );

            // console.log('File saved to:', filePath);
            const relativePath = path.relative(USER_IMAGES_PATH, filePath).replace(/\\/g, '/');
            // console.log('Relative path:', relativePath);

            // console.log('${BASE_URL}api/image/update', `${BASE_URL}api/image/update`);
            // const updateImageResponse = await fetch(`${BASE_URL}api/image/update`, {
            //     method: 'POST',
            //     body: JSON.stringify({ 
            //         id_gen,
            //         host_gen, 
            //         time_gen, 
            //         age, 
            //         gender, 
            //         ethnicity, 
            //         res_image: relativePath, 
            //     })
            // });

            function fetchWithTimeout(
                url: string,
                options: RequestInit = {},
                timeout: number = 5000
            ): Promise<Response> {
                const controller = new AbortController();
                const signal = controller.signal;
                const timeoutId = setTimeout(() => controller.abort(), timeout);
            
                return fetch(url, { ...options, signal })
                    .finally(() => clearTimeout(timeoutId));
            }

            try {
                const updateImageResponse = await fetchWithTimeout(
                    `${BASE_URL}api/image/update`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            id_gen,
                            host_gen, 
                            time_gen, 
                            age, 
                            gender, 
                            ethnicity, 
                            res_image: relativePath, 
                        }),
                    },
                    10000
                );
            
                if (!updateImageResponse.ok) {
                    throw new Error(`Failed to update image. Status: ${updateImageResponse.status}`);
                }
            
                const updateImageData = await updateImageResponse.json();
                console.log('updateImageData', updateImageData);
            
                if (updateImageData.message !== 'Image updated successfully') {
                    await Image.deleteOne({ _id: id_gen });
                    console.log(`Image with ID ${id_gen} has been deleted.`);
                    throw new Error(updateImageData.message);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        console.error('Request timed out');
                    } else {
                        console.error('An error occurred:', error.message);
                    }
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            }

            // const updateImageResponse = await fetchWithTimeout(
            //     `${BASE_URL}api/image/update`,
            //     {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ 
            //             id_gen,
            //             host_gen, 
            //             time_gen, 
            //             age, 
            //             gender, 
            //             ethnicity, 
            //             res_image: relativePath, 
            //         }),
            //     },
            //     10000 // Timeout in milliseconds (10 seconds)
            // );

        } catch (error) {
            console.error('Failed to process image from FormData request: ', error);
            return new NextResponse(JSON.stringify({ message: "Failed to process FormData image, but request processed." }), { status: 200 });
        }

        return new NextResponse(JSON.stringify({ message: "Received FormData." }), { status: 200 });

    }  else {
        console.log("Received non-FormData request, potential error details or wrong content type.");

        try {
            // Log the error details or handle the JSON data appropriately
            const json = await req.json(); // Safely parse JSON since we know it's not FormData
            // console.log("JSON data received:", json);
            // console.log('json.id_gen', json.id_gen);

            await connectMongoDB();

            let id_gen = json.id_gen;
            if (!id_gen) {
                console.log('No image id_gen present in request');
                return new NextResponse(JSON.stringify({ message: "Image ID not found, but request processed." }), { status: 200 });
            }
            const imageDoc = await Image.findById(id_gen);
            if (!imageDoc) {
                console.log('No image found with the provided ID', id_gen);
                return new NextResponse(JSON.stringify({ message: "Image ID not found, but request processed." }), { status: 200 });
            }
            const userDoc = await User.findById(imageDoc.userId);
            if (!userDoc) {
                console.log('No user found for the provided image ID', id_gen);
                return new NextResponse(JSON.stringify({ message: "User for image ID not found, but request processed." }), { status: 200 });
            }

            // Increment user's credits by image cost
            if (imageDoc.cost) {
                userDoc.credits += imageDoc.cost;
                await userDoc.save();
            }

            // If id_gen and userDoc is found, delete the image
            await Image.deleteOne({ _id: id_gen });
            console.log(`Image with ID ${id_gen} has been deleted.`);
        } catch (error) {
            console.error('Failed to delete image document from database during json error response: ', error);
            return new NextResponse(JSON.stringify({ message: "Failed to process json image data, but request processed." }), { status: 200 });
        }

        return new NextResponse(JSON.stringify({ message: "Received JSON data, not processing as FormData." }), { status: 200 });
    }
}