"use client";
import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./index";

interface ThemeContextType {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Load mode from localStorage on mount
  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode');
    if (storedMode === 'dark' || storedMode === 'light') {
      setMode(storedMode);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
