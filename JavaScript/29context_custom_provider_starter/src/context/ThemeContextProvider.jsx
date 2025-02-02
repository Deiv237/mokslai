import { useState } from "react";
import ThemeContext from "./ThemeContext";

function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState("light");

    if (myTheme) {
        document.documentElement.className = myTheme;
    }
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>{children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;