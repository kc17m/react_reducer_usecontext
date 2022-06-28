import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext); //ThemeContext: value prop, e.g. color: blue

  if (context === undefined) {
    /// is undefined if we try to use context outside wrapped component
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
};
