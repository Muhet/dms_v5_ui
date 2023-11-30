import React, { createContext, useContext, useState } from "react";
const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export function DrawerProvider({ children }) {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = () => {
    setDrawerVisible(true);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <DrawerContext.Provider
      value={{ isDrawerVisible, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
