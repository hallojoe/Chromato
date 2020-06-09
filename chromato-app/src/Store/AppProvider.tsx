import React, { useReducer } from "react";
import { appData } from "./Data/AppModelData";
import { appReducer } from "./Reducers/AppReducer";
import { AppContext } from "./AppContext";

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appData);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

