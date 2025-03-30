import { useContext, useEffect } from "react";
import { CardStateContext } from "../contexts/CardStateContext";
import { app } from "./firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ImageFromStorageFade from "@/my_components/imageFromStorageFade";
import { UserContext } from "../contexts/UserContext";

export default function HaveCards() {
    // take in UserContext from parent
    const {user} = useContext(UserContext)
    const cardState = useContext(CardStateContext)
    const cardWidth = cardState?.cardWidth || 9;
    const cardWidthMode = cardState?.cardWidthMode || 'rem';
    const cardsPerRow = cardState?.cardsPerRow || 5;

    // set haveCards once from the firestore
    useEffect(() => {
        if (user) {
          const haveRef = doc(getFirestore(app), "users", user.uid);
          const fetchHaveCards = async () => {
            try {
              console.log("Fetching haveCards for user:", user.uid);
              const docSnap = await getDoc(haveRef);
              if (docSnap.exists()) {
                const data = docSnap.data();
                cardState?.setHaveArr(data?.haveCards || []);
                console.log("Fetched haveCards:", data?.haveCards || []);
              }
            } catch (error) {
              console.error("Error fetching document:", error);
            }
          };
          fetchHaveCards();
        }
      }, [user]);

    function removeHaveCards (card : string) {
        if (cardState?.addHC.includes(card))
            cardState?.setAddHC(cardState?.addHC.filter((item : string) => item !== card))
        else
          cardState?.setRmHC((prev) => [...prev, card])
        cardState?.setHaveArr(cardState?.haveArr.filter((item : string) => item !== card))
        console.log("rmHC: " + cardState?.rmHC)
        console.log("haveArr: " + cardState?.haveArr)
    }
    
    return (
        <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
            {cardState?.HCcombinedArr.map((card) => (
            <li
                key={card}
                // if card already in addHC, just remove it there
                // if not, add removed card to setRmHC
                // update haveCards either way
                onClick={() => removeHaveCards(card)}
                onAuxClick={() => removeHaveCards(card)}
            >
                <div style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
                    <ImageFromStorageFade fileName={card} />
                </div>
            </li>
            ))}
        </ol>
    )
}