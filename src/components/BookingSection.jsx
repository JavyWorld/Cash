import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { BookingCalendar } from './BookingCalendar.jsx';
import { BookingForm } from './BookingForm.jsx';
import { SectionTitle } from './SectionTitle.jsx';
import { useBookings } from '../hooks/useBookings.js';

async function sendBookingEmail(details) {
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  const summary = `New booking request for ${details.date} at ${details.startTime}\n\n` +
    `Name: ${details.clientName}\nEmail: ${details.email}\nPhone: ${details.phone}\nEvent: ${details.eventType}\nGuests: ${details.guests}\n` +
    `Chairs: ${details.chairs}\nTables: ${details.tables}\nAdd-ons: ${details.addons || 'N/A'}\nNotes: ${details.notes || 'N/A'}`;

  if (!serviceId || !templateId || !publicKey) {
    const mailto = `mailto:events@celebrationcash.com?subject=${encodeURIComponent('New booking request')}&body=${encodeURIComponent(summary)}`;
    window.location.href = mailto;
    return { fallback: true };
  }

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      client_name: details.clientName,
      client_email: details.email,
      client_phone: details.phone,
      event_type: details.eventType,
      event_date: details.date,
      event_time: details.startTime,
      duration_hours: details.durationHours,
      guest_count: details.guests,
      chair_count: details.chairs,
      table_count: details.tables,
      addons: details.addons,
      notes: details.notes,
    },
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Email delivery failed');
  }

  return { fallback: false };
}

export function BookingSection() {
  const { bookings, addBooking, getAvailableSlots, bufferHours, defaultDuration } = useBookings();
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState(defaultDuration);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const bookingsForDate = useMemo(
    () => (selectedDate ? bookings.filter((booking) => booking.date === selectedDate) : []),
    [bookings, selectedDate]
  );

  const availableSlots = useMemo(
    () => (selectedDate ? getAvailableSlots(selectedDate, duration) : []),
    [selectedDate, duration, getAvailableSlots]
  );

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setFeedback(null);
    try {
      addBooking(data);
      await sendBookingEmail(data);
      setFeedback({
        type: 'success',
        message: 'Thank you! Your request has been received. Our team will reach out with a personalized quote within 24 hours.',
      });
    } catch (error) {
      console.error(error);
      setFeedback({
        type: 'error',
        message:
          'We saved your request but the email could not be sent automatically. Please contact us at events@celebrationcash.com.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="bookings" className="mx-auto mt-24 max-w-7xl px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Bookings"
            title="Reserve the Celebration Cash experience"
            description="Browse our real-time availability, choose the right window for your event, and share the details we need to design a bespoke celebration."
          />
          <BookingCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            getAvailability={getAvailableSlots}
            durationHours={duration}
          />
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Same-day overview</h4>
            {bookingsForDate.length === 0 ? (
              <p className="mt-4 text-sm text-slate-300">No reservations yet. Pick your ideal time to be first in line!</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {bookingsForDate.map((booking) => (
                  <li key={booking.id} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">
                        {format(parseISO(`${booking.date}T${booking.startTime}`), 'h:mm a')} · {booking.eventType}
                      </p>
                      <span className="text-xs uppercase tracking-[0.2em] text-brand-200">{booking.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">
                      {booking.chairs} chairs · {booking.tables} tables · Duration: {booking.durationHours}h
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {feedback && (
            <div
              className={`flex items-start gap-3 rounded-3xl border p-4 ${
                feedback.type === 'success'
                  ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                  : 'border-rose-400/30 bg-rose-500/10 text-rose-100'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircleIcon className="mt-1 h-5 w-5" />
              ) : (
                <ExclamationCircleIcon className="mt-1 h-5 w-5" />
              )}
              <p className="text-sm leading-relaxed">{feedback.message}</p>
            </div>
          )}
          <BookingForm
            selectedDate={selectedDate}
            availableSlots={availableSlots}
            durationHours={duration}
            onDurationChange={setDuration}
            bufferHours={bufferHours}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      </div>
    </section>
  );
}
