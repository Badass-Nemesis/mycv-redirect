import { NextResponse } from 'next/server';
import axios from 'axios'; // switching to axios because normal fetch doesn't have timeout feature

export const maxDuration = 35;

export async function GET() {
    const timeout = 45000; // 45 seconds

    try {
        const response = await axios.post(
            process.env.AWS_API_GATEWAY_ENDPOINT!,
            null, // putting request body null since I'm not sending any data
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.AWS_API_GATEWAY_API_KEY!
                },
                timeout: timeout, // this timeout is for total connection + response
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error calling API Gateway: ', error);

        if (error.code === 'ECONNABORTED') { // what is this language?
            return NextResponse.json(
                { statusCode: 504, body: 'Request timed out' },
                { status: 504 } // putting status just because of NextResponse
            );
        }

        return NextResponse.json(
            { statusCode: 500, body: error.message },
            { status: 500 } // putting status just becaues of NextResponse
        );
    }
}