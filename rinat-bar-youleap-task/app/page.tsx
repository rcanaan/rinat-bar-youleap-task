import ContactForm from '../components/ContactForm';

function ContactIllustration() {
  return (
    <div aria-hidden="true" className="relative mt-9 hidden h-48 w-full max-w-xl lg:block xl:mt-11">
      <svg
        viewBox="0 0 560 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="envelope-front" x1="86" y1="76" x2="240" y2="190">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="envelope-back" x1="104" y1="36" x2="208" y2="156">
            <stop stopColor="#EFF6FF" />
            <stop offset="1" stopColor="#BFDBFE" />
          </linearGradient>
          <filter id="soft-shadow" x="20" y="15" width="280" height="205" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#1E3A8A" floodOpacity="0.16" />
          </filter>
        </defs>

        <path
          d="M244 163C300 206 346 189 381 150C409 119 449 111 496 128"
          stroke="#6684B7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />
        <circle cx="498" cy="128" r="6" fill="#6684B7" />

        <g filter="url(#soft-shadow)" transform="rotate(-7 170 120)">
          <rect x="92" y="40" width="150" height="114" rx="18" fill="url(#envelope-back)" />
          <rect x="72" y="73" width="194" height="118" rx="20" fill="url(#envelope-front)" />
          <path d="M77 88L169 151L260 88" fill="#DBEAFE" />
          <path d="M77 179L151 121C162 112 178 112 189 121L262 179" fill="#3B82F6" />
          <path d="M77 88L157 153C164 159 175 159 182 153L261 88" stroke="#93C5FD" strokeWidth="2" />
        </g>

        <g filter="url(#soft-shadow)">
          <circle cx="255" cy="95" r="31" fill="#2563EB" />
          <path
            d="M241 94.5L269 82L260 108L253.5 99.5L247 104L248.5 96.5L241 94.5Z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fbff]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(circle_at_34%_24%,rgba(219,234,254,0.82),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(239,246,255,0.95),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[25rem] -left-[12%] h-[37rem] w-[82%] rotate-[5deg] rounded-[50%] bg-blue-100/75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[29rem] right-[-18%] h-[38rem] w-[82%] -rotate-[8deg] rounded-[50%] bg-blue-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-[12%] h-48 w-48 rounded-full bg-white/60 blur-3xl"
      />

      <section className="relative mx-auto grid min-h-screen w-full max-w-[1360px] items-center gap-10 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(32rem,36.5rem)] lg:gap-12 lg:px-12 lg:py-10 xl:gap-16 xl:px-16">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="mb-6 inline-flex rounded-full bg-blue-100/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 ring-1 ring-blue-200/60 sm:text-sm">
            Let&apos;s connect
          </p>
          <h1 className="text-[clamp(2.8rem,5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.045em] text-slate-950">
            Start a conversation
            <span className="mt-2 block text-blue-600">with us.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 lg:mx-0">
            Have a question or an idea you would like to explore? Send us a message and we&apos;ll
            get back to you soon.
          </p>

          <ContactIllustration />
        </div>

        <div className="mx-auto w-full max-w-[36.5rem] rounded-[1.75rem] border border-white/90 bg-white/95 p-6 shadow-[0_28px_80px_-24px_rgba(30,64,175,0.22)] backdrop-blur-sm sm:p-8 lg:justify-self-end">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.75rem]">
              Send us a message
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-600">
              Fill in the form below and we&apos;ll be in touch.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
