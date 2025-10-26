import { useEffect, useState } from 'react';

// Normalize to local date-only (prevents timezone shifting issues)
const toLocalDateOnly = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Modal calendar used by the client ReservationForm to pick a single date
export function ReservationCalendarModal({ isOpen, onClose, onDateSelect, selectedDate, isCheckIn, showPending, showConfirmed }: { isOpen: boolean; onClose: () => void; onDateSelect: (d: string) => void; selectedDate: string; isCheckIn: boolean; showPending?: boolean; showConfirmed?: boolean; }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    // No API calls - just empty blocked dates for now
    setBlockedDates([]);
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
  const isToday = (d: Date) => {
    const today = new Date();
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  };
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
            const past = isPast(d);
            const today = isToday(d);
                  return (
              <button
                key={i}
                disabled={blockedDay || past}
                onClick={() => { onDateSelect(toLocalDateOnly(d)); onClose(); }}
                className={`p-0 text-center rounded-lg transition-colors duration-200 h-10 w-10 flex items-center justify-center
                  ${other ? 'text-gray-300' : 'text-gray-800'}
                  ${selected ? 'ring-2 ring-amber-600' : ''}
                  ${blockedDay ? 'bg-red-200 text-red-500 cursor-not-allowed' : ''}
                  ${past && !blockedDay ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : ''}
                  ${!past && !blockedDay ? 'hover:bg-amber-100' : ''}
                  ${today && !past && !blockedDay ? 'bg-green-500 text-white font-bold' : ''}`}
              >
                  {d.getDate()}
              </button>
                  );
                })}
              </div>
        <div className="mt-3 text-sm text-amber-700">Sélectionnez votre date de {isCheckIn ? 'arrivée' : 'départ'}.</div>
              </div>
            </div>
  );
}
