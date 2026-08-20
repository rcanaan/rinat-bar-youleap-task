# Youleap Contact Landing Page
<img width="938" height="415" alt="image" src="https://github.com/user-attachments/assets/ed71dd9a-6513-488f-b917-1336b9ab46bd" />

A responsive landing page with an accessible contact form. Submissions are validated by a Next.js route handler and stored securely in Airtable without exposing credentials to the browser.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Airtable Web API

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

The Personal Access Token must have access to the selected base and include the `data.records:write` scope. Never commit `.env.local` or a real token.

The existing Airtable base must contain a table named `Table 1` with these fields:

- `Name` — single-line text
- `Email` — email
- `Message` — multiline text

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Submission flow

The browser posts the form data to `POST /api/submit`. The server validates and normalizes the values, then sends them to Airtable using server-only environment variables. The route returns a sanitized JSON response that the form presents as an accessible success or error message.

## Verification

Run the project checks with:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
