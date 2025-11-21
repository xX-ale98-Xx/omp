'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);

  // Carica tema salvato all'inizio
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md border border-gray-400 text-sm md:text-base transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
