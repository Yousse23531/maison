import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { api, setAuthToken } from '@/lib/api';
import { mapEmailToRoleLocally } from '@/lib/auth';

export default function AdminBlockedDates() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dates, setDates] = useState<string[]>([]);
  const [selected, setSelected] = useState<Date[]>([]);
  const [saving, setSaving] = useState(false);

  // Load selected dates from localStorage on component mount
  useEffect(() => {
    const savedSelected = localStorage.getItem('admin_selected_dates');
    if (savedSelected) {
      try {
        const parsed = JSON.parse(savedSelected);
        const dates = parsed.map((dateStr: string) => new Date(dateStr));
        setSelected(dates);
      } catch (e) {
        console.error('Error loading selected dates from localStorage:', e);
      }
    }
  }, []);

  // Save selected dates to localStorage whenever they change
  useEffect(() => {
    if (selected.length > 0) {
      localStorage.setItem('admin_selected_dates', JSON.stringify(selected.map(d => d.toISOString())));
    } else {
      localStorage.removeItem('admin_selected_dates');
    }
  }, [selected]);

  const toISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const fromISO = (s: string) => {
    const [y,m,d] = s.split('-').map(Number);
    return new Date(y, (m||1)-1, d||1);
  };

  const modifiers = useMemo(() => ({
    blocked: dates.map(fromISO),
  }), [dates]);

  const modifiersClassNames = {
    blocked: 'rounded-full bg-red-600 text-white',
  } as const;

  const isLoggedInAdmin = role === 'ADMIN';

  const loadDates = async () => {
    const res = await api.getBlockedDates();
    setDates(res.dates || []);
  };

  useEffect(() => {
    if (isLoggedInAdmin) {
      loadDates();
    }
  }, [isLoggedInAdmin]);

  const login = async () => {
    try {
      setLoading(true);
      setError('');
      const r = await api.login(email, password);
      setAuthToken(r.token);
      setRole(r.role || mapEmailToRoleLocally(email));
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    const arr = selected.map(toISO);
    if (arr.length === 0) return;
    setSaving(true);
    setError('');
    try {
      await api.addBlockedDates(arr);
      setSelected([]);
      await loadDates();
      window.dispatchEvent(new CustomEvent('calendar-updated'));
      console.log('Added blocked dates:', arr);
    } catch (e) {
      console.error('Error adding blocked dates:', e);
      setError(`Erreur lors de l'ajout: ${e.message || 'Erreur inconnue'}`);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    const arr = selected.map(toISO);
    if (arr.length === 0) return;
    setSaving(true);
    setError('');
    try {
      await api.removeBlockedDates(arr);
      setSelected([]);
      await loadDates();
      window.dispatchEvent(new CustomEvent('calendar-updated'));
      console.log('Removed blocked dates:', arr);
    } catch (e) {
      console.error('Error removing blocked dates:', e);
      setError(`Erreur lors de la suppression: ${e.message || 'Erreur inconnue'}`);
    } finally {
      setSaving(false);
    }
  };


  if (!isLoggedInAdmin) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-amber-800">Admin - Dates bloquées</h1>
        {error && <div className="mb-3 text-red-700">{error}</div>}
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className="w-full border rounded px-3 py-2" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
          <button disabled={loading} onClick={login} className="px-4 py-2 rounded bg-amber-600 text-white disabled:opacity-50">{loading?'Connexion...':'Se connecter'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-amber-800">Admin - Gérer les dates (Libre/Bloqué)</h1>
      {error && (
        <div className={`mb-3 p-3 rounded ${
          error.includes('✅') 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {error}
        </div>
      )}
      <div className="rounded-xl border bg-white p-4">
        <DayPicker
          mode="multiple"
          selected={selected}
          onSelect={(arr) => setSelected(arr || [])}
          showOutsideDays
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
        <div className="mt-3 flex gap-2">
          <button onClick={add} disabled={saving || selected.length === 0} className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-50">
            {saving ? 'Sauvegarde...' : '🔒 Bloquer les dates'}
          </button>
          <button onClick={remove} disabled={saving || selected.length === 0} className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50">
            {saving ? 'Sauvegarde...' : '🔓 Débloquer les dates'}
          </button>
        </div>
        {selected.length > 0 && (
          <div className="mt-2 text-sm text-amber-700">
            {selected.length} date(s) sélectionnée(s): {selected.map(d => toISO(d)).join(', ')}
          </div>
        )}
        <div className="mt-3 text-sm text-amber-700">
          <div className="mb-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <strong>Libre</strong> - Dates disponibles (vert) - sélectionnables
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-2"></span>
            <strong>Bloqué</strong> - Dates bloquées (rouge) - non sélectionnables
          </div>
          <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded">
            <strong>🔒 Bloquer les dates</strong> - Sélectionnez des dates libres et cliquez pour les bloquer
          </div>
          <div className="mb-2 p-2 bg-green-50 border border-green-200 rounded">
            <strong>🔓 Débloquer les dates</strong> - Sélectionnez des dates bloquées et cliquez pour les libérer
          </div>
          <div>
            Les dates bloquées apparaîtront en rouge sur le site client et ne seront pas sélectionnables.
          </div>
        </div>
      </div>
    </div>
  );
}


