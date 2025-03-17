import { NextResponse, NextRequest } from "next/server";
import fetch from 'node-fetch';

const PAYMENT_API_URL = process.env.PAYMENT_API_URL!;
const AUTH_TOKEN = process.env.AUTH_TOKEN!;

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();
        const {
            referenceId,
            paymentId
        } = body;
        
    try {

        if (!paymentId) {
            return NextResponse.json({ message: 'Payment ID is required' }, { status: 400 });
        }

        const url = `${PAYMENT_API_URL}/${paymentId}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: AUTH_TOKEN
            }
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            const responseBody = await response.text();
            console.error('Server error response body:', responseBody);
            throw new Error(`Server responded with status: ${response.status} - ${responseBody}`);
        }

        const jsonResponse = await response.json();
        console.log('PAYTECH response: ', jsonResponse);

        return NextResponse.json(jsonResponse, { status: 200 });

    } catch (error: unknown) {
        console.error('Error fetching payment status:', error);

        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            errorMessage = (error as { message: string }).message;
        }

        return NextResponse.json({
            message: 'Error fetching payment status',
            error: errorMessage
        }, { status: 500 });
    }
}