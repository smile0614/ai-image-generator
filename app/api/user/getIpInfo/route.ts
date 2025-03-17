import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    try {
        // const headers = req.headers;
        // console.log('headers', headers)
        const userCountry = req.headers.get('cf-ipcountry') || 'unknown';
        console.log('User Country:', userCountry);   

        return new NextResponse(JSON.stringify({ country: userCountry }), { status: 200 });

    } catch (error) {
        console.error('Error getting ip info:', error);

        return NextResponse.json({
            message: 'Error getting ip info',
            error
        }, { status: 500 });
    }
}