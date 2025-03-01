import { createContext, useState, ReactNode } from "react";

interface CardStateContextType {
  addHC: string[];
  setAddHC: (cards: string[]) => void;
  rmHC: string[];
  setRmHC: (cards: string[]) => void;
  addWC: string[];
  setAddWC: (cards: string[]) => void;
  rmWC: string[];
  setRmWC: (cards: string[]) => void;
}

const CardStateContext = createContext<CardStateContextType | null>(null);

const CardStateProvider = ({ children }: { children: ReactNode }) => {
  const [addHC, setAddHC] = useState<string[]>([]);
  const [rmHC, setRmHC] = useState<string[]>([]);
  const [addWC, setAddWC] = useState<string[]>([]);
  const [rmWC, setRmWC] = useState<string[]>([]);

  return (
    <CardStateContext.Provider value={{ addHC, setAddHC, rmHC, setRmHC, addWC, setAddWC, rmWC, setRmWC }}>
      {children}
    </CardStateContext.Provider>
  );
};

export { CardStateContext, CardStateProvider };