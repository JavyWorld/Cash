import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from './SectionTitle.jsx';
import { useBookings } from '../hooks/useBookings.js';

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'quotes', label: 'Quotes in progress' },
  { id: 'past', label: 'Past events' },
];

function categorize(bookings) {
  const now = new Date();
  return bookings.reduce(
    (acc, booking) => {
      const bookingDate = parseISO(booking.date);
      if (booking.status === 'Quote Requested') {
        acc.quotes.push(booking);
      } else if (booking.status === 'Completed' || bookingDate < now) {
        acc.past.push(booking);
      } else {
        acc.upcoming.push(booking);
      }
      return acc;
    },
    { upcoming: [], quotes: [], past: [] }
  );
}

function StatusBadge({ status }) {
  const variants = {
    Confirmed: 'bg-emerald-500/10 text-emerald-200 border-emerald-400/30',
    'Quote Requested': 'bg-amber-500/10 text-amber-100 border-amber-400/30',
    Completed: 'bg-slate-500/10 text-slate-200 border-slate-400/30',
  };
  const classes = variants[status] || 'bg-brand-500/10 text-brand-100 border-brand-400/30';
  return (
    <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${classes}`}>
      {status}
    </span>
  );
}

export function OrdersSection() {
  const { bookings, stats } = useBookings();
  const [activeTab, setActiveTab] = useState('upcoming');

  const categorized = useMemo(() => categorize(bookings), [bookings]);
  const visible = categorized[activeTab];

  return (
    <section id="orders" className="mx-auto mt-24 max-w-7xl px-6">
      <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
        <SectionTitle
          eyebrow="Client portal"
          title="Track your celebrations and invoices"
          description="Access every booking you have with Celebration Cash — from new quotes to confirmed parties and completed events with downloadable invoices."
        />
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Upcoming</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">{stats.upcoming}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Quotes</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">{stats.pending}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Completed</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">{stats.completed}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                activeTab === tab.id
                  ? 'border-brand-500/60 bg-brand-500/10 text-brand-100'
                  : 'border-white/10 bg-slate-950/40 text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {visible.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-6 text-sm text-slate-300">
              Nothing to show here yet. Submit a booking request to see it populate instantly.
            </p>
          ) : (
            visible
              .slice()
              .sort((a, b) => (a.date < b.date ? -1 : 1))
              .map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{booking.eventType}</h3>
                    <StatusBadge status={booking.status} />
                    <div className="ml-auto text-sm text-slate-300">
                      {format(parseISO(booking.date), 'MMMM d, yyyy')} · {booking.startTime}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    {booking.chairs} chairs · {booking.tables} tables · Guests: {booking.guests ?? '—'}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Add-ons: {booking.addons || 'No extra services requested yet.'}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                      Duration {booking.durationHours}h · Buffer {booking.bufferHours ?? 2}h
                    </span>
                    <a
                      href={booking.invoiceUrl && booking.invoiceUrl !== '#' ? booking.invoiceUrl : '#'}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                        booking.invoiceUrl && booking.invoiceUrl !== '#'
                          ? 'border-brand-500/60 bg-brand-500/10 text-brand-100 hover:text-white'
                          : 'pointer-events-none border-white/10 bg-slate-900/60 text-slate-500'
                      }`}
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      Invoice
                    </a>
                  </div>
                </article>
              ))
          )}
        </div>
      </div>
    </section>
  );
}
