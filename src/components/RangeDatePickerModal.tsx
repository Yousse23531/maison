import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { localStore } from '@/lib/storage';

type Range = { start?: string; end?: string };

function toISODateOnly(d: Date) { return d.toISOString().split('T')[0]; }

export default function RangeDatePickerModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (range: Range) => void }) {
  const [booked, setBooked] = useState<string[]>([]);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);

  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const res = await api.getCalendarDates();
        setBooked(res.confirmedDates || res.dates || []);
        setBlocked(res.blockedDates || []);
      } catch {
        setBooked(localStore.confirmedDates());
      }
    })();
  }, [open]);

  if (!open) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days: Date[] = [];
  const cur = new Date(startDate);
  while (cur <= lastDay || days.length < 42) { days.push(new Date(cur)); cur.setDate(cur.getDate() + 1); }

  const isBooked = (d: Date) => booked.includes(toISODateOnly(d)) || blocked.includes(toISODateOnly(d));
  const isBetween = (d: Date) => tempStart && tempEnd && d >= stripTime(tempStart) && d <= stripTime(tempEnd);
  function stripTime(d: Date) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

  const onDayClick = (d: Date) => {
    if (isBooked(d)) return;
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(d); setTempEnd(null); return;
    }
    if (d < tempStart) { setTempStart(d); setTempEnd(null); return; }
    setTempEnd(d);
  };

  const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const dayNames = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-amber-800">
            {!tempStart ? "Sélectionner la date d'arrivée" : !tempEnd ? 'Sélectionner la date de départ' : 'Plage sélectionnée'}
          </h3>
          <div className="flex gap-2">
            <button className="px-2" onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>{'<'}</button>
            <div className="font-semibold text-amber-800">{monthNames[month]} {year}</div>
            <button className="px-2" onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>{'>'}</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1 text-center text-xs text-amber-700">
          {dayNames.map(d => <div key={d} className="p-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            const isOther = d.getMonth() !== month;
            const bookedDay = isBooked(d);
            const inRange = isBetween(d);
            const isStart = tempStart && toISODateOnly(d) === toISODateOnly(tempStart);
            const isEnd = tempEnd && toISODateOnly(d) === toISODateOnly(tempEnd);
            return (
              <button
                key={i}
                onClick={() => onDayClick(d)}
                disabled={bookedDay}
                className={`p-2 text-center rounded relative border ${isOther?'text-gray-300':''} ${bookedDay?'bg-emerald-600 text-white cursor-not-allowed':''} ${inRange?'bg-amber-100':''} ${isStart||isEnd?'bg-amber-600 text-white':''}`}
              >
                {d.getDate()}
                {inRange && <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-amber-300"></span>}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 rounded border" onClick={onClose}>Annuler</button>
          <button disabled={!tempStart || !tempEnd} className="px-3 py-2 rounded bg-amber-600 text-white disabled:opacity-50" onClick={() => {
            if (tempStart && tempEnd) onSelect({ start: toISODateOnly(tempStart), end: toISODateOnly(tempEnd) });
            onClose();
          }}>Choisir</button>
        </div>
      </div>
    </div>
  );
}


