import { createContext, useState, ReactNode, Dispatch, SetStateAction, useMemo } from "react";

interface CardStateContextType {
  addHC: string[]
  setAddHC: Dispatch<SetStateAction<string[]>>
  rmHC: string[]
  setRmHC: Dispatch<SetStateAction<string[]>>
  addWC: string[]
  setAddWC: Dispatch<SetStateAction<string[]>>
  rmWC: string[]
  setRmWC: Dispatch<SetStateAction<string[]>>
  haveArr: string[]
  setHaveArr: Dispatch<SetStateAction<string[]>>
  wantArr: string[]
  setWantArr: Dispatch<SetStateAction<string[]>>
  HCcombinedArr: string[]
  WCcombinedArr: string[]
  cardWidth: number
  cardWidthMode: string
  cardsPerRow: number
}

const CardStateContext = createContext<CardStateContextType | null>(null);

const CardStateProvider = ({ children }: { children: ReactNode }) => {
  const [addHC, setAddHC] = useState<string[]>([])
  const [rmHC, setRmHC] = useState<string[]>([])
  const [addWC, setAddWC] = useState<string[]>([])
  const [rmWC, setRmWC] = useState<string[]>([])
  const [haveArr, setHaveArr] = useState<string[]>([])
  const [wantArr, setWantArr] = useState<string[]>([])
  const HCcombinedArr = useMemo(() => [...haveArr, ...addHC], [haveArr, addHC]);
  const WCcombinedArr = useMemo(() => [...wantArr, ...addWC], [wantArr, addWC]);

  // Card Measurement Parameters
  const cardWidth = 9;
  const cardWidthMode = 'rem';
  const cardsPerRow = 5;

  return (
    <CardStateContext.Provider value={{ addHC, setAddHC, rmHC, setRmHC, addWC, setAddWC, rmWC, setRmWC, haveArr, setHaveArr, wantArr, setWantArr, HCcombinedArr, WCcombinedArr, cardWidth, cardWidthMode, cardsPerRow }}>
      {children}
    </CardStateContext.Provider>
  );
};

export { CardStateContext, CardStateProvider };