import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { CardStateContext } from "../contexts/CardStateContext";
import { app } from "./firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ImageFromStorage from "./imageFromStorage";

// Parameters
const cardWidth = 12;
const cardWidthMode = 'rem';
const cardsPerRow = 5;

export default function HaveCards() {
    // take in UserContext from parent
    const user = useContext(UserContext)
    const cardState = useContext(CardStateContext)

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
          fetchHaveCards(); // Ensure the function is called here
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
    
    const combinedArr = [...cardState?.haveArr || [], ...cardState?.addHC || []]

    return (
        <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
            {combinedArr.map((card) => (
            <li
                key={card}
                // if card already in addHC, just remove it there
                // if not, add removed card to setRmHC
                // update haveCards either way
                onClick={() => removeHaveCards(card)}
                onAuxClick={() => removeHaveCards(card)}
            >
                <div style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
                    <ImageFromStorage fileName={card} />
                </div>
            </li>
            ))}
        </ol>
    )
}