import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.theme) {
      return localStorage.theme;
    }

    // Default fallback if nothing is set
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [theme]);

  return [theme === 'dark', (val) => setTheme(val ? 'dark' : 'light')];
}
