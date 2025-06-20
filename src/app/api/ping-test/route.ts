import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allows all origins
    'Access-Control-Allow-Methods': 'GET, OPTIONS', // Allowed HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type', // Allowed request headers
    'Content-Type': 'text/plain', // Set content type for the response
  };

  return new NextResponse('OK', { status: 200, headers });
}

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  return new NextResponse(null, { status: 204, headers });
}