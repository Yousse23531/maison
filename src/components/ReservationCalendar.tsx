import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { localStore } from '@/lib/storage';

// Normalize to local date-only (prevents timezone shifting issues)
const toLocalDateOnly = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};


type Props = { showPending?: boolean; showConfirmed?: boolean };

function MonthGrid({ confirmedDates, pendingDates, blockedDates, currentMonth, setCurrentMonth }: { confirmedDates: string[]; pendingDates: string[]; blockedDates: string[]; currentMonth: Date; setCurrentMonth: (d: Date) => void; }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days: Date[] = [];
  const cur = new Date(startDate);
  while (cur <= lastDay || days.length < 42) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  const isConfirmed = (d: Date) => confirmedDates.includes(toLocalDateOnly(d));
  const isPending = (d: Date) => pendingDates.includes(toLocalDateOnly(d));
  const isBlocked = (d: Date) => blockedDates.includes(toLocalDateOnly(d));
  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const dayNames = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <button className="px-2 py-1" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>{'<'}</button>
        <div className="font-semibold text-amber-800">{monthNames[month]} {year}</div>
        <button className="px-2 py-1" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs text-amber-700">
        {dayNames.map(d => <div key={d} className="p-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const other = d.getMonth() !== month;
          const confirmed = isConfirmed(d);
          const pending = isPending(d);
          const blocked = isBlocked(d);
          return (
            <div key={i} className={`p-2 text-center ${other ? 'text-gray-300' : ''}`}>
              {blocked ? (
                <div className="h-8 w-8 mx-auto flex items-center justify-center bg-red-600 text-white">{d.getDate()}</div>
              ) : (
                <div className="h-8 w-8 mx-auto flex items-center justify-center bg-green-500 text-white">{d.getDate()}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReservationCalendarEmbedded(_: Props) {
  const [confirmedDates, setConfirmedDates] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fetchDates = async () => {
    try {
      const res = await api.getCalendarDates();
      setBlockedDates(res.blockedDates || []);
    } catch {
      setBlockedDates([]);
    }
  };
  useEffect(() => {
    fetchDates();
    const handler = () => fetchDates();
    window.addEventListener('calendar-updated', handler);
    return () => window.removeEventListener('calendar-updated', handler);
  }, []);
  return <MonthGrid confirmedDates={[]} pendingDates={[]} blockedDates={blockedDates} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />;
}

export default ReservationCalendarEmbedded;

// Modal calendar used by the client ReservationForm to pick a single date
export function ReservationCalendarModal({ isOpen, onClose, onDateSelect, selectedDate, isCheckIn, showPending, showConfirmed }: { isOpen: boolean; onClose: () => void; onDateSelect: (d: string) => void; selectedDate: string; isCheckIn: boolean; showPending?: boolean; showConfirmed?: boolean; }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [confirmedDates, setConfirmedDates] = useState<string[]>([]);
  const [pendingDates, setPendingDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const res = await api.getCalendarDates();
        setBlockedDates(res.blockedDates || []);
      } catch {
        setBlockedDates([]);
      }
    })();
  }, [isOpen]);
  if (!isOpen) return null;
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days: Date[] = [];
  const cur = new Date(startDate);
  while (cur <= lastDay || days.length < 42) { days.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }
  const isPast = (d: Date) => d < new Date(new Date().toDateString());
  const isBlockedDay = (d: Date) => blockedDates.includes(toLocalDateOnly(d));
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-amber-800">{isCheckIn ? "Date d'arrivée" : 'Date de départ'}</h3>
          <div className="flex gap-2">
            <button className="px-2" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>{'<'}</button>
            <div className="font-semibold text-amber-800">{['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][month]} {year}</div>
            <button className="px-2" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>{'>'}</button>
              </div>
                  </div>
        <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs text-amber-700">
          {['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'].map(d => <div key={d} className="p-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
            const other = d.getMonth() !== month;
            const blockedDay = isBlockedDay(d);
            const selected = selectedDate && toLocalDateOnly(d) === selectedDate;
                  return (
              <button
                key={i}
                disabled={blockedDay || isPast(d)}
                onClick={() => { onDateSelect(toLocalDateOnly(d)); onClose(); }}
                className={`p-0 text-center ${other?'text-gray-300':''} ${selected?'ring-2 ring-amber-600 rounded-none':''}`}
              >
                  <div className={`${
                    blockedDay ? 'bg-red-600 text-white rounded-full h-8 w-8 mx-auto flex items-center justify-center' :
                    'bg-green-500 text-white rounded-full h-8 w-8 mx-auto flex items-center justify-center'
                  }`}>{d.getDate()}</div>
              </button>
                  );
                })}
              </div>
        <div className="mt-3 text-sm text-amber-700">Les dates en vert sont libres, en rouge bloquées et non sélectionnables.</div>
              </div>
            </div>
  );
}
