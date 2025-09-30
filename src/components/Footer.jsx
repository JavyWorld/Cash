export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-white">Celebration Cash Party Rentals</p>
          <p>Full-service décor, rentals and catering for unforgettable events.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.25em] text-slate-500">
          <a href="mailto:events@celebrationcash.com" className="hover:text-white">
            events@celebrationcash.com
          </a>
          <a href="tel:+15555550123" className="hover:text-white">
            +1 (555) 555-0123
          </a>
          <a href="#bookings" className="hover:text-white">
            Start a booking
          </a>
        </div>
      </div>
    </footer>
  );
}
