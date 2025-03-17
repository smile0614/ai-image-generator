import { NextResponse, NextRequest } from "next/server";
import { submitTextForm, TextFormFields } from "@/app/lib/generatorV2/txt2img";
import { connectMongoDB } from '@/app/lib/mongodb/mongodb';
import User from '@/app/lib/mongodb/models/user';
import { Blob } from 'buffer';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        
        const formData = await req.formData();
        const image = formData.get('image');
        const mask = formData.get('mask');
        const facelock = formData.get('facelock');
        const pose = formData.get('pose');
        const params = formData.get('params') as string;
        const type_gen = formData.get('type_gen') as string;
        const type_user = formData.get('type_user') as string;
        const id_gen = formData.get('id_gen') as string;

        let paramsObj = JSON.parse(params);
        if (paramsObj.weights_interpretator === "Lite") {
            paramsObj.weights_interpretator = "A1111";
            // console.log("paramsObj.weights_interpretator === Lite")
        } else if (paramsObj.weights_interpretator === "Pro") {
            paramsObj.weights_interpretator = "comfy";
            // console.log("paramsObj.weights_interpretator === comfy")
        }

        let updatedParams = JSON.stringify(paramsObj).toString();

        // Check if the image exists and is an instance of File
        let imageBuffer: Buffer | undefined;
        if (image instanceof Blob && image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        }

        // Check if the mask exists and is an instance of File
        let maskBuffer: Buffer | undefined;
        if (mask instanceof Blob && mask.size > 0) {
            const arrayBuffer = await mask.arrayBuffer();
            maskBuffer = Buffer.from(arrayBuffer);
        }

        // Check if the facelock exists and is an instance of File
        let facelockBuffer: Buffer | undefined;
        if (facelock instanceof Blob && facelock.size > 0) {
            const arrayBuffer = await facelock.arrayBuffer();
            facelockBuffer = Buffer.from(arrayBuffer);
        }

        // Check if the pose exists and is an instance of File
        let poseBuffer: Buffer | undefined;
        if (pose instanceof Blob && pose.size > 0) {
            const arrayBuffer = await pose.arrayBuffer();
            poseBuffer = Buffer.from(arrayBuffer);
        }

        const fields: TextFormFields = {
            ...(imageBuffer && { image: imageBuffer }),
            ...(maskBuffer && { mask: maskBuffer }),
            ...(facelockBuffer && { facelock: facelockBuffer }),
            ...(poseBuffer && { pose: poseBuffer }),
            params: updatedParams,
            type_gen,
            type_user,
            id_gen,
        };

        // console.log("text-instant fields:", fields)
        const response = await submitTextForm(fields);
        // console.log('response API IMAGE', response);
        return NextResponse.json({ message: 'Text processed successfully', ProcessingResponse: response }, { status: 200 });
    } catch (error) {
        console.error('Error processing text:', error);
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}