import { useMemo, useCallback } from 'react';
import { addHours, isAfter, isBefore, isSameDay, parseISO, set, subHours } from 'date-fns';
import { useLocalStorage } from './useLocalStorage.js';

const BUFFER_HOURS = 2;
const DEFAULT_DURATION = 4;
const OPERATING_HOURS = { start: 8, end: 22 }; // 8 AM - 10 PM starting slots

const initialBookings = [
  {
    id: 'bk-1001',
    clientName: 'Mariana López',
    email: 'mariana@example.com',
    phone: '+1 (555) 732-8811',
    eventType: 'Quinceañera',
    date: '2024-08-24',
    startTime: '14:00',
    durationHours: 5,
    chairs: 120,
    tables: 15,
    addons: 'Candy bar, premium lighting, photo booth',
    status: 'Confirmed',
    invoiceUrl: '#',
    bufferHours: BUFFER_HOURS,
  },
  {
    id: 'bk-1002',
    clientName: 'Jacob Smith',
    email: 'jacob@example.com',
    phone: '+1 (555) 110-2244',
    eventType: 'Corporate Summer Party',
    date: '2024-08-28',
    startTime: '10:00',
    durationHours: 6,
    chairs: 75,
    tables: 12,
    addons: 'AV system, branded backdrop',
    status: 'Completed',
    invoiceUrl: '#',
    bufferHours: BUFFER_HOURS,
  },
  {
    id: 'bk-1003',
    clientName: 'Kimberly Nguyen',
    email: 'kimberly@example.com',
    phone: '+1 (555) 444-1199',
    eventType: 'Garden Wedding',
    date: '2024-09-05',
    startTime: '16:00',
    durationHours: 7,
    chairs: 160,
    tables: 20,
    addons: 'Luxury florals, cocktail lounge, catering',
    status: 'Confirmed',
    invoiceUrl: '#',
    bufferHours: BUFFER_HOURS,
  },
];

function parseBookingDate(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  return set(parseISO(`${date}T00:00:00`), { hours, minutes });
}

function isSlotAvailable(bookings, date, startTime, durationHours) {
  const targetStart = parseBookingDate(date, startTime);
  const targetEnd = addHours(targetStart, durationHours);

  return bookings.every((booking) => {
    const bookingStart = parseBookingDate(booking.date, booking.startTime);
    const bookingEnd = addHours(bookingStart, booking.durationHours ?? DEFAULT_DURATION);
    const latestStartAllowed = addHours(bookingEnd, BUFFER_HOURS);
    const earliestEndAllowed = subHours(bookingStart, BUFFER_HOURS);

    const startsTooSoon = isBefore(targetStart, latestStartAllowed);
    const endsTooLate = isAfter(targetEnd, earliestEndAllowed);

    return !(startsTooSoon && endsTooLate);
  });
}

function getTimeslots(durationHours) {
  const slots = [];
  for (let hour = OPERATING_HOURS.start; hour <= OPERATING_HOURS.end - durationHours; hour += 1) {
    const label = `${hour.toString().padStart(2, '0')}:00`;
    slots.push(label);
  }
  return slots;
}

export function useBookings() {
  const [bookings, setBookings] = useLocalStorage('cash-bookings', initialBookings);

  const addBooking = useCallback(
    (newBooking) => {
      setBookings((prev) => [
        ...prev,
        {
          ...newBooking,
          id: `bk-${Date.now()}`,
          status: 'Quote Requested',
          bufferHours: BUFFER_HOURS,
        },
      ]);
    },
    [setBookings]
  );

  const updateBookingStatus = useCallback(
    (bookingId, status) => {
      setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)));
    },
    [setBookings]
  );

  const getBookingsByDate = useCallback(
    (date) => bookings.filter((booking) => isSameDay(parseISO(booking.date), parseISO(date))),
    [bookings]
  );

  const getAvailableSlots = useCallback(
    (date, durationHours = DEFAULT_DURATION) => {
      if (!date) return [];
      const bookingList = bookings.filter((booking) => booking.date === date);
      const slots = getTimeslots(durationHours);
      return slots.filter((startTime) => isSlotAvailable(bookingList, date, startTime, durationHours));
    },
    [bookings]
  );

  const stats = useMemo(() => {
    const now = new Date();
    const summary = {
      upcoming: 0,
      completed: 0,
      pending: 0,
    };

    bookings.forEach((booking) => {
      const bookingDate = parseISO(booking.date);
      if (booking.status === 'Completed' || isBefore(bookingDate, now)) {
        summary.completed += 1;
      } else if (booking.status === 'Quote Requested') {
        summary.pending += 1;
      } else {
        summary.upcoming += 1;
      }
    });

    return summary;
  }, [bookings]);

  return {
    bookings,
    addBooking,
    updateBookingStatus,
    getBookingsByDate,
    getAvailableSlots,
    stats,
    bufferHours: BUFFER_HOURS,
    defaultDuration: DEFAULT_DURATION,
  };
}
