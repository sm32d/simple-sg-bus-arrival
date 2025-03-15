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

  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
      {
        headers: {
          'AccountKey': process.env.NEXT_PUBLIC_LTA_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bus arrival information' },
      { status: 500 }
    );
  }
}