import { NextResponse, NextRequest } from "next/server";
import { submitUpscaleForm, UpscaleFormFields } from "@/app/lib/generatorV2/img2upscale";
import { Blob } from 'buffer';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        
        const formData = await req.formData();
        const image = formData.get('image');
        const params = formData.get('params') as string;
        const type_gen = formData.get('type_gen') as string;
        const type_user = formData.get('type_user') as string;
        const id_gen = formData.get('id_gen') as string;

        // Check if the image exists and is an instance of File
        let imageBuffer: Buffer | undefined;
        if (image instanceof Blob && image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        }

        const fields: UpscaleFormFields = {
            ...(imageBuffer && { image: imageBuffer }),
            params,
            type_gen,
            type_user,
            id_gen,
        };

        // console.log("text-instant fields:", fields)
        const response = await submitUpscaleForm(fields);
        // console.log('response API IMAGE', response);
        return NextResponse.json({ message: 'Image processed successfully', ProcessingResponse: response }, { status: 200 });
    } catch (error) {
        console.error('Error processing text:', error);
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}