import { useState, useEffect } from 'react';
import themesData from '../data/themes.json';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(themesData.defaultTheme);
  const [userOverride, setUserOverride] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has overridden theme
    const savedOverride = localStorage.getItem('themeOverride');
    if (savedOverride) {
      setUserOverride(savedOverride);
      setCurrentTheme(savedOverride);
      return;
    }

    // Determine current theme by date
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const monthDay = `${month}-${day}`;

    const activeTheme = themesData.activeByDate.find(
      (t) => monthDay >= t.from && monthDay <= t.to
    );

    setCurrentTheme(activeTheme ? activeTheme.themeId : themesData.defaultTheme);
  }, []);

  const switchTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    setUserOverride(themeId);
    localStorage.setItem('themeOverride', themeId);
  };

  const resetTheme = () => {
    localStorage.removeItem('themeOverride');
    setUserOverride(null);
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const monthDay = `${month}-${day}`;
    const activeTheme = themesData.activeByDate.find(
      (t) => monthDay >= t.from && monthDay <= t.to
    );
    setCurrentTheme(activeTheme ? activeTheme.themeId : themesData.defaultTheme);
  };

  const theme = themesData.themes[currentTheme as keyof typeof themesData.themes];

  return {
    currentTheme,
    theme,
    switchTheme,
    resetTheme,
    availableThemes: Object.keys(themesData.themes),
  };
};
