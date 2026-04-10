import { useState } from 'react';

// syncs state with localStorage so it survives refresh
export function useLocalStorage(key, fallback) {
  const [val, setVal] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  });

  function set(v) {
    const next = typeof v === 'function' ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* quota exceeded, ignore */ }
  }

  return [val, set];
}
