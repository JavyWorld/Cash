import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function createMonthGrid(currentMonth) {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
}

export function BookingCalendar({ selectedDate, onSelectDate, getAvailability, durationHours }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const calendarDays = useMemo(() => createMonthGrid(currentMonth), [currentMonth]);

  const handlePrevMonth = () => setCurrentMonth((month) => addMonths(month, -1));
  const handleNextMonth = () => setCurrentMonth((month) => addMonths(month, 1));

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-300">Availability</p>
          <h3 className="font-display text-2xl text-white">{format(currentMonth, 'MMMM yyyy')}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
            aria-label="Next month"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-3 text-sm">
        {calendarDays.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const slots = getAvailability(dateKey, durationHours);
          const isDisabled = isBefore(day, today) && !isSameDay(day, today);
          const isSelected = selectedDate ? isSameDay(day, parseISO(selectedDate)) : false;
          const inMonth = isSameMonth(day, currentMonth);
          const statusClass = !inMonth
            ? 'text-slate-600/40 border-white/5'
            : slots.length === 0
            ? 'border-rose-400/40 text-rose-200/70'
            : 'border-white/10 text-slate-100';

          return (
            <button
              key={dateKey}
              type="button"
              disabled={isDisabled || !inMonth}
              onClick={() => onSelectDate(dateKey)}
              className={`rounded-2xl border px-3 py-3 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                isSelected ? 'bg-brand-500/90 text-white shadow-glow' : 'bg-white/5 hover:bg-white/10'
              } ${statusClass} ${isDisabled ? 'cursor-not-allowed opacity-40' : ''}`}
            >
              <span className="text-lg font-semibold">{format(day, 'd')}</span>
              <div className="mt-1 text-[0.65rem] uppercase tracking-widest">
                {slots.length === 0 ? 'Booked' : `${slots.length} slots`}
              </div>
              {isToday(day) && <span className="mt-1 block text-[0.6rem] text-brand-200">Today</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
