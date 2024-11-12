import React, { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userData, setuserData] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    userName: "",
  });

  return (
    <AppContext.Provider value={{ userData, setuserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
