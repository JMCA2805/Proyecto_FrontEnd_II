import { createContext, useContext, useState } from "react";

const DarkMode = createContext();

export const useDark = () => {
  return useContext(DarkMode);
};

export const DarkModeGlobal = ({ children }) => {
  //Modo Oscuro Global
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  return (
    <DarkMode.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </DarkMode.Provider>
  );
};

export default DarkModeGlobal;