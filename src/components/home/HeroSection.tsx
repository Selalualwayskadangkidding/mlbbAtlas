import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[560px] overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/atlas-hero.webp"
          alt=""
          width={1200}
          height={675}
          priority
          className="absolute left-[-170px] top-6 h-[470px] w-[820px] max-w-none object-cover opacity-45 mix-blend-multiply sm:left-[-120px] sm:h-[560px] sm:w-[980px] lg:left-[-80px] lg:top-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.18),rgba(248,250,252,0.88)_52%,#f8fafc_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-slate-50" />
      </div>
      <div className="relative z-10 ml-auto max-w-3xl text-right">
        <p className="ml-auto mb-7 inline-flex items-center rounded-md border border-blue-200 bg-white/75 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-atlas-accent shadow-sm">
          Season 14 live
        </p>
        <h1 className="text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
          MLBB Competitive <span className="text-atlas-accent">Hub</span>
        </h1>
        <p className="ml-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Track MPL standings, schedules, statistics, and season history across
          every region. The premier destination for Mobile Legends: Bang Bang
          competitive data.
        </p>
        <div className="mt-9 flex flex-wrap justify-end gap-4">
          <a
            className="rounded-md bg-gradient-to-r from-atlas-accentMuted to-atlas-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_18px_44px_rgba(37,99,235,0.24)] transition hover:brightness-110"
            href="#regions"
          >
            Explore Regions
          </a>
          <a
            className="rounded-md border border-slate-300 bg-white/70 px-7 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:border-atlas-accent"
            href="#matches"
          >
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
}
