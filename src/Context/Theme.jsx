import React, { createContext, useState } from 'react'
export const Themecontext = createContext()
const Theme = ({children}) => {
    const [theme, settheme] = useState("day")
    const toggleTheme = () => {
        settheme((prev)=>(prev=== "day"? "night" : "day"))
    }
  return (
    <Themecontext.Provider value={{ theme, toggleTheme }}>
      {children}
    </Themecontext.Provider>
  );
}

export default Theme