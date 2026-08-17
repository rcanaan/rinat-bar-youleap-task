import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-100/70 to-transparent"
      />

      <section className="relative mx-auto grid min-w-0 w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="min-w-0 max-w-xl text-center lg:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Let&apos;s connect
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Start a conversation with us.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Have a question or an idea you would like to explore? Send us a message and we&apos;ll
            get back to you soon.
          </p>

          <div className="mt-8 flex justify-center gap-6 text-sm text-slate-600 lg:justify-start">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              Quick response
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-blue-500" />
              Direct contact
            </span>
          </div>
        </div>

        <div className="min-w-0 w-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-950">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill in the form below and we&apos;ll be in touch.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
