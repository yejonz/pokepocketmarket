import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface CardStateContextType {
  addHC: string[];
  setAddHC: Dispatch<SetStateAction<string[]>>;
  rmHC: string[];
  setRmHC: Dispatch<SetStateAction<string[]>>;
  addWC: string[];
  setAddWC: Dispatch<SetStateAction<string[]>>;
  rmWC: string[];
  setRmWC: Dispatch<SetStateAction<string[]>>;
  haveArr: string[];
  setHaveArr: Dispatch<SetStateAction<string[]>>;
  wantArr: string[];
  setWantArr: Dispatch<SetStateAction<string[]>>;
}

const CardStateContext = createContext<CardStateContextType | null>(null);

const CardStateProvider = ({ children }: { children: ReactNode }) => {
  const [addHC, setAddHC] = useState<string[]>([]);
  const [rmHC, setRmHC] = useState<string[]>([]);
  const [addWC, setAddWC] = useState<string[]>([]);
  const [rmWC, setRmWC] = useState<string[]>([]);
  const [haveArr, setHaveArr] = useState<string[]>([]);
  const [wantArr, setWantArr] = useState<string[]>([]);

  return (
    <CardStateContext.Provider value={{ addHC, setAddHC, rmHC, setRmHC, addWC, setAddWC, rmWC, setRmWC, haveArr, setHaveArr, wantArr, setWantArr }}>
      {children}
    </CardStateContext.Provider>
  );
};

export { CardStateContext, CardStateProvider };