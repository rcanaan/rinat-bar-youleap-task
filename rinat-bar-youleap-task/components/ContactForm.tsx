'use client';

import { useState } from 'react';

type FormData = {
  fullName: string;
  email: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;
type Status = { type: 'success' | 'error'; text: string } | null;

const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }

  const email = formData.email.trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof FormData;

    setFormData((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));

    if (status) {
      setStatus(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const errors = validateForm(formData);
    setFieldErrors(errors);
    setStatus(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        setStatus({
          type: 'error',
          text: result?.message ?? 'We could not send your message. Please try again.',
        });
        return;
      }

      setFormData(INITIAL_FORM_DATA);
      setFieldErrors({});
      setStatus({ type: 'success', text: result.message ?? 'Thanks! Your message has been sent.' });
    } catch {
      setStatus({
        type: 'error',
        text: 'We could not connect to the server. Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const inputClasses =
    'mt-2 block min-w-0 w-full max-w-full rounded-xl border bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500';

  return (
    <form onSubmit={handleSubmit} noValidate className="min-w-0 space-y-5">
      <div>
        <label htmlFor="fullName" className="text-sm font-semibold text-slate-800">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          disabled={isLoading}
          value={formData.fullName}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
          placeholder="Jane Smith"
          className={`${inputClasses} ${
            fieldErrors.fullName
              ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
          }`}
        />
        {fieldErrors.fullName && (
          <p id="fullName-error" className="mt-1.5 text-sm text-red-600">
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-800">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          disabled={isLoading}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          placeholder="jane@example.com"
          className={`${inputClasses} ${
            fieldErrors.email
              ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
          }`}
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-600">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          disabled={isLoading}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : 'message-hint'}
          placeholder="Tell us how we can help..."
          className={`${inputClasses} resize-y ${
            fieldErrors.message
              ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
              : 'border-slate-300 focus:border-blue-600 focus:ring-blue-200'
          }`}
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-red-600">
            {fieldErrors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-1.5 text-xs text-slate-500">
            Up to 2,000 characters.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:shadow-none"
      >
        {isLoading ? 'Sending...' : 'Send message'}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {status && (
          <p
            role={status.type === 'error' ? 'alert' : 'status'}
            className={`rounded-xl border px-4 py-3 text-sm font-medium ${
              status.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
