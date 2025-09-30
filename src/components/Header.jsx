import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Bookings', href: '#bookings' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Orders', href: '#orders' },
  { name: 'About', href: '#about' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold shadow-glow">
            CC
          </span>
          <span className="font-display text-xl text-white">Celebration Cash Rentals</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-100 md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative transition hover:text-white"
            >
              {item.name}
              <span className="absolute inset-x-0 -bottom-2 h-px scale-x-0 bg-brand-500 transition-all duration-200 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#bookings"
            className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30"
          >
            Book Now
          </a>
        </nav>
        <button
          type="button"
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-900/80 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-100">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full px-4 py-2 transition hover:bg-white/5"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#bookings"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
