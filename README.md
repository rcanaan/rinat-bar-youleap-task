# Youleap Contact Landing Page
<img width="938" height="415" alt="image" src="https://github.com/user-attachments/assets/ed71dd9a-6513-488f-b917-1336b9ab46bd" />

A modern, responsive contact landing page built with Next.js and a polished form experience. It includes client-side validation, accessible form states, and a secure API route that saves submissions to Airtable without exposing credentials in the browser.

## Live demo

This project is deployed and available here:

- Production URL: https://youleap-pro.vercel.app/

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Airtable Web API

## Features

- Clean marketing-style landing page with strong headline and CTA layout
- Accessible contact form with validation and friendly UX feedback
- Secure server-side submission handling via Next.js API route
- Airtable integration for storing contact messages
- Responsive layout optimized for desktop and smaller screens

## Local setup

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env.local` and add your Airtable configuration:

```dotenv
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_API_KEY=your_airtable_personal_access_token
```

The personal access token must have access to the selected base and include the `data.records:write` scope. Never commit `.env.local` or a real token.

The Airtable base should contain a table named `Table 1` with these fields:

- `Name` — single-line text
- `Email` — email
- `Message` — multiline text

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Submission flow

The browser posts the form data to `POST /api/submit`. The server validates and normalizes the values, then sends them to Airtable using environment variables stored only on the server. The route returns a sanitized JSON response that the form presents as a success or error message.

## Verification

Run the project checks with:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

The app is currently deployed on Vercel:

- Vercel: https://youleap-pro.vercel.app/
