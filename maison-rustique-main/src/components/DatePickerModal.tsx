import { useState } from 'react';

export default function DatePickerModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (isoDate: string) => void }) {
  const [value, setValue] = useState<string>('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-3 text-amber-800">Sélectionner une date</h3>
        <input type="date" value={value} onChange={e => setValue(e.target.value)} className="w-full border rounded px-3 py-2" />
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 rounded border" onClick={onClose}>Annuler</button>
          <button className="px-3 py-2 rounded bg-amber-600 text-white" onClick={() => { if (value) onSelect(value); onClose(); }}>Choisir</button>
        </div>
      </div>
    </div>
  );
}


