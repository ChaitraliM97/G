"use client";

import { useState, useEffect } from 'react';
import { Sun, Moon, BarChart3 } from 'lucide-react';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-card border-b border-primary/10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold text-foreground">GenBI Dashboard</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-primary" /> : <Moon className="h-6 w-6 text-primary" />}
        </button>
      </div>
    </header>
  );
};
