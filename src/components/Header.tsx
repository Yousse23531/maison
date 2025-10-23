import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        navigate('/login');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const onSecretTap = () => {
    setTapCount((c) => {
      const next = c + 1;
      if (next >= 5) {
        navigate('/login');
        return 0;
      }
      setTimeout(() => setTapCount(0), 3000);
      return next;
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="block p-5" aria-label="Aller à l'accueil" onClick={onSecretTap}>
              <span className="text-2xl font-bold text-amber-800">Maison Rustique</span>
            </Link>
          </div>

          {/* Desktop Navigation (hidden on login and dashboards) */}
          <nav className="hidden md:flex space-x-8 items-center">
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-700 hover:text-amber-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200">
            <nav className="flex flex-col space-y-4">
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}