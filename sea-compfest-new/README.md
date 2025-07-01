# SEA Catering - Next.js Application

This is the SEA Catering web application built with [Next.js](https://nextjs.org) using the App Router pattern, migrated from a Vite React + JSX + TailwindCSS structure.

## Features

- **Modern Next.js App Router**: Utilizes the latest Next.js App Router for better performance and developer experience
- **TailwindCSS Integration**: Custom design system with utility-first CSS framework
- **Meal Plans & Subscriptions**: Browse meal plans and create subscriptions
- **Testimonials System**: View and submit customer testimonials
- **Responsive Design**: Mobile-first responsive design
- **API Routes**: Built-in Next.js API routes for subscriptions and testimonials

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   ├── menu/              # Menu page
│   ├── subscription/      # Subscription page
│   ├── contact/           # Contact page
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   └── globals.css        # Global styles with TailwindCSS
├── components/            # Reusable React components
├── sections/              # Page sections (Hero, Service, Review)
├── constants/             # Application constants and data
├── services/              # API service functions
└── assets/                # Static assets (images, icons, fonts)
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Deploy

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_BASE_URL=/api
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - JavaScript library for building user interfaces
- **TailwindCSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## Migration Notes

This project was successfully migrated from Vite React to Next.js with the following key changes:
- Converted from React Router to Next.js App Router
- Updated import paths and asset management
- Converted Express API routes to Next.js API route handlers
- Added proper "use client" directives for client-side components
- Updated environment variable format for Next.js

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
