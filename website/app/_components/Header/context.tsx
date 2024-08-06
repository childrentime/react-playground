import { useDarkMode } from "@reactuses/core";
import React, { createContext, useContext } from "react";

type ThemeContext = { theme: boolean; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useDarkMode({
    classNameDark: "dark",
    classNameLight: "light",
    defaultValue: false,
  });

  return (
    <ThemeContext.Provider value={{ theme: !!dark, toggleTheme: setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
