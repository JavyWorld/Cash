import { useState } from 'react';
import { SectionTitle } from './SectionTitle.jsx';

const defaultForm = {
  clientName: '',
  email: '',
  phone: '',
  eventType: 'Wedding',
  chairs: 0,
  tables: 0,
  addons: '',
  guests: 50,
  notes: '',
};

const eventTypes = ['Wedding', 'Quinceañera', 'Corporate Event', 'Baby Shower', 'Birthday Party', 'Other'];

export function BookingForm({
  selectedDate,
  availableSlots,
  durationHours,
  onDurationChange,
  bufferHours,
  onSubmit,
  submitting,
}) {
  const [formData, setFormData] = useState(defaultForm);
  const [startTime, setStartTime] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedDate || !startTime) return;

    onSubmit({
      ...formData,
      date: selectedDate,
      startTime,
      durationHours,
      chairs: Number(formData.chairs) || 0,
      tables: Number(formData.tables) || 0,
      guests: Number(formData.guests) || 0,
    });
    setFormData(defaultForm);
    setStartTime('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur"
    >
      <SectionTitle
        eyebrow="Reserve"
        title="Design your celebration"
        description="Pick a time that works for you, tell us what you envision, and we will prepare a tailored quote within 24 hours."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Event date</label>
          <input
            type="text"
            value={selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select a date on the calendar'}
            readOnly
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Start time</label>
          <select
            required
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            disabled={!selectedDate || availableSlots.length === 0}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <option value="">{selectedDate ? 'Select a time' : 'Pick a date first'}</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {selectedDate && availableSlots.length === 0 && (
            <p className="text-xs text-rose-200">No availability for this duration. Try another day.</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">
            Event duration ({durationHours} hours)
          </label>
          <input
            type="range"
            min="3"
            max="8"
            value={durationHours}
            onChange={(event) => onDurationChange(Number(event.target.value))}
            className="w-full"
          />
          <p className="text-xs text-slate-400">
            We automatically preserve a {bufferHours}-hour setup and breakdown buffer between bookings.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Guests</label>
            <input
              type="number"
              min="0"
              value={formData.guests}
              onChange={(event) => handleChange('guests', event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-200">Event type</label>
            <select
              value={formData.eventType}
              onChange={(event) => handleChange('eventType', event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Primary contact</label>
          <input
            type="text"
            required
            value={formData.clientName}
            onChange={(event) => handleChange('clientName', event.target.value)}
            placeholder="Full name"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(event) => handleChange('email', event.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            placeholder="(555) 555-5555"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Chairs</label>
          <input
            type="number"
            min="0"
            value={formData.chairs}
            onChange={(event) => handleChange('chairs', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Tables</label>
          <input
            type="number"
            min="0"
            value={formData.tables}
            onChange={(event) => handleChange('tables', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-200">Add-ons</label>
        <textarea
          rows="3"
          value={formData.addons}
          onChange={(event) => handleChange('addons', event.target.value)}
          placeholder="Catering, inflatable castle, lounge furniture, lighting design, etc."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-200">Notes for our designers</label>
        <textarea
          rows="4"
          value={formData.notes}
          onChange={(event) => handleChange('notes', event.target.value)}
          placeholder="Tell us about your theme, color palette, or special requests."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !selectedDate || availableSlots.length === 0}
        className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-brand-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Sending details...' : 'Submit for quote'}
      </button>
    </form>
  );
}
