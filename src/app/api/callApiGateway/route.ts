import { NextResponse } from 'next/server';

export const maxDuration = 35;

export async function GET() {
    try {
        const response = await fetch(process.env.AWS_API_GATEWAY_ENDPOINT!, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": process.env.AWS_API_GATEWAY_API_KEY! },
        });

        if (!response.ok) {
            console.error(response); // aisehi
            throw new Error("The API network response was not ok");
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error calling API Gateway: ', error);
        return NextResponse.json({ statusCode: 500, body: error.message });
    }
}
