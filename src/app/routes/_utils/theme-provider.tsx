import React, {ReactNode, createContext, useContext, useState} from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      console.log("Toggling theme from", currentTheme);
      return currentTheme === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
