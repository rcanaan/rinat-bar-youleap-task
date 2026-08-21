import { NextResponse } from "next/server";

const AIRTABLE_TABLE_NAME = "Table 1";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Submission = {
  fullName: string;
  email: string;
  message: string;
};

function isSubmission(value: unknown): value is Submission {
  if (!value || typeof value !== "object") {
    return false;
  }

  const submission = value as Record<string, unknown>;

  return (
    typeof submission.fullName === "string" &&
    typeof submission.email === "string" &&
    typeof submission.message === "string"
  );
}

export async function POST(request: Request) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const airtableToken = process.env.AIRTABLE_TOKEN;

  if (!baseId || !airtableToken) {
    console.error("Airtable submission is not configured.");
    return NextResponse.json(
      {
        success: false,
        message: "The form is temporarily unavailable. Please try again later.",
      },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "The submitted data is not valid." },
      { status: 400 },
    );
  }

  if (!isSubmission(body)) {
    return NextResponse.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const fullName = body.fullName.trim();
  const email = body.email.trim().toLowerCase();
  const message = body.message.trim();

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: fullName,
                Email: email,
                Message: message,
              },
            },
          ],
        }),
      },
    );

    if (!airtableResponse.ok) {
      let errorType = "unknown";

      try {
        const airtableError = (await airtableResponse.json()) as {
          error?: { type?: string };
        };
        errorType = airtableError.error?.type ?? errorType;
      } catch {
        // Airtable did not return a JSON error body.
      }

      console.error("Airtable submission failed.", {
        status: airtableResponse.status,
        errorType,
      });

      return NextResponse.json(
        {
          success: false,
          message: "We could not send your message. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch (error) {
    console.error("Airtable request could not be completed.", {
      error: error instanceof Error ? error.name : "unknown",
    });

    return NextResponse.json(
      {
        success: false,
        message: "We could not send your message. Please try again.",
      },
      { status: 502 },
    );
  }
}
