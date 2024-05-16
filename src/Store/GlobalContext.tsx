import React, { ReactNode, createContext, useState } from "react";

import { expensesData } from "../db/db.json";

interface initialStateInterface {
  expenses: Expense[];
  wallet: number;
}

const initialState = {
  expenses: expensesData,
  wallet: 4500,
};

interface Expense {
  id?: number;
  title: string;
  price: number;
  category: string;
  date: string;
}

interface GlobalStateContextType {
  globalStore: initialStateInterface;
  updateGlobalStore: React.Dispatch<
    React.SetStateAction<initialStateInterface>
  >;
}

export const GlobalContext = createContext<GlobalStateContextType | null>(null);

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalStore, updateGlobalStore] =
    useState<initialStateInterface>(initialState);

  return (
    <GlobalContext.Provider value={{ globalStore, updateGlobalStore }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Provider;
