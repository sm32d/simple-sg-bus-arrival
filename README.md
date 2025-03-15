# SG Bus Arrival Info

A real-time Singapore bus arrival information application built with Next.js, TypeScript, and Tailwind CSS. This application integrates with LTA's DataMall API to provide accurate bus arrival timings and service information.

## Features

- Real-time bus arrival information
- Support for all Singapore bus stops
- Bus load status indicators
- Wheelchair accessibility information
- Bus type information (Single Deck, Double Deck, Bendy)
- Responsive design with modern UI

## Prerequisites

- Node.js 18.x or later
- LTA DataMall API Key ([Register here](https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html))

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd temp-next
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory and add your LTA DataMall API key:

```env
NEXT_PUBLIC_LTA_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter a valid Singapore bus stop code in the search box
2. View real-time arrival information for all bus services at the stop
3. Check the load status indicators:
   - 🟢 Seats Available
   - 🟡 Standing Available
   - 🔴 Limited Standing
4. Additional information icons:
   - ♿ Wheelchair Accessible Bus
   - 🕰️ Scheduled Arrival (Not Real-time)

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [LTA DataMall API](https://datamall.lta.gov.sg) - Bus arrival data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
