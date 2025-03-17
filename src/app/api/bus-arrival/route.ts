import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const busStopCode = searchParams.get('BusStopCode');

  if (!busStopCode) {
    return NextResponse.json(
      { error: 'Bus stop code is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_LTA_API_KEY;
  if (!apiKey) {
    console.error('LTA API key is not configured');
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
      {
        headers: {
          'AccountKey': apiKey,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LTA API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bus arrival data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch bus arrival information' },
      { status: 500 }
    );
  }
}