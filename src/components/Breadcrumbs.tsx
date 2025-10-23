import React from 'react';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <div className="text-sm text-amber-700 mb-3">
      {items.map((it, i) => (
        <span key={i}>
          {it.to ? <Link to={it.to} className="hover:text-amber-900">{it.label}</Link> : <span className="text-amber-900 font-medium">{it.label}</span>}
          {i < items.length - 1 && <span className="mx-2 text-amber-400">›</span>}
        </span>
      ))}
    </div>
  );
}


