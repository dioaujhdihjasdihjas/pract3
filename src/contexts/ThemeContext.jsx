import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('atelier-theme') || 'light');
  useEffect(() => { localStorage.setItem('atelier-theme', theme); }, [theme]);
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((value) => value === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
