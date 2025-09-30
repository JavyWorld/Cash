export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            Party rentals, décor & catering in one seamless experience.
          </span>
          <h1 className="font-display text-4xl leading-tight text-white md:text-6xl">
            We craft immersive celebrations that feel effortless and unforgettable.
          </h1>
          <p className="text-lg text-slate-300 md:text-xl">
            Celebration Cash is your all-in-one partner for parties, weddings, corporate events and more.
            From atmospheric styling to gourmet catering and specialty rentals, we curate every detail so you
            can simply enjoy the moment.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#bookings"
              className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-brand-500/30"
            >
              Start a Booking
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur transition hover:text-white"
            >
              See our work
            </a>
          </div>
        </div>
        <div className="relative grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="group rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur transition hover:border-brand-500/60 hover:shadow-glow"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-200">Signature service</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {item === 1 && 'Custom décor design & styling'}
                {item === 2 && 'Full-service catering & staffing'}
                {item === 3 && 'Premium seating, tables & rentals'}
                {item === 4 && 'On-site coordination from setup to strike'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
