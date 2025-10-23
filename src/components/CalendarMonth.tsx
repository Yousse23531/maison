import React, { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { api } from '../lib/api';
import { localStore } from '../lib/storage';

export default function CalendarMonth() {
  const [booked, setBooked] = useState([] as string[]);
  const [blocked, setBlocked] = useState([] as string[]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getCalendarDates();
        setBooked(res.confirmedDates || res.dates || []);
        setBlocked(res.blockedDates || []);
      } catch {
        setBooked(localStore.confirmedDates());
      }
    };
    load();
  }, []);

  const toLocalDate = (isoDateOnly: string) => {
    const [y, m, d] = isoDateOnly.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };

  const modifiers = useMemo(() => ({
    booked: booked.map(toLocalDate),
    blocked: blocked.map(toLocalDate),
  }), [booked, blocked]);

  const modifiersClassNames = {
    booked: 'rounded-full bg-emerald-600 text-white',
    blocked: 'rounded-full bg-red-600 text-white'
  } as const;

  return (
    <div className="rounded-xl border bg-white p-4">
      <DayPicker
        mode="single"
        showOutsideDays
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        styles={{ caption: { color: '#dc2626' } }}
      />
      <div className="mt-2 text-sm flex items-center gap-4">
        <span className="flex items-center gap-2 text-emerald-700"><span className="inline-block w-3 h-3 rounded-full bg-emerald-600" /> Dates confirmées</span>
        <span className="flex items-center gap-2 text-red-700"><span className="inline-block w-3 h-3 rounded-full bg-red-600" /> Dates bloquées</span>
      </div>
    </div>
  );
}


