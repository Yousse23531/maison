import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { localStore } from '@/lib/storage';

function toDateOnlyISO(d: Date) {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
}

export default function TodayStatus() {
  const [dates, setDates] = useState<string[]>([]);
  const todayIso = toDateOnlyISO(new Date());

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getCalendarDates();
        setDates(res.dates || []);
      } catch {
        setDates(localStore.confirmedDates());
      }
    };
    load();
  }, []);

  const isBooked = useMemo(() => dates.includes(todayIso), [dates, todayIso]);

  return (
    <div className="rounded-xl bg-white border p-4 flex items-center justify-between">
      <div className="text-sm text-amber-700">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <div className={`text-sm font-semibold ${isBooked ? 'text-red-600' : 'text-green-600'}`}>
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isBooked ? 'bg-red-500' : 'bg-green-500'}`} />
        {isBooked ? 'Occupé' : 'Disponible'}
      </div>
    </div>
  );
}


