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

export default function WantCards() {
    // take in UserContext from parent
    const user = useContext(UserContext)
    const cardState = useContext(CardStateContext)

    // set wantCards once from the firestore
    useEffect(() => {
        if (user) {
          const wantRef = doc(getFirestore(app), "users", user.uid);
          const fetchWantCards = async () => {
            try {
              console.log("Fetching wantCards for user:", user.uid);
              const docSnap = await getDoc(wantRef);
              if (docSnap.exists()) {
                const data = docSnap.data();
                cardState?.setWantArr(data?.wantCards || []);
                console.log("Fetched wantCards:", data?.wantCards || []);
              }
            } catch (error) {
              console.error("Error fetching document:", error);
            }
          };
          fetchWantCards(); // Ensure the function is called here
        }
      }, [user]);

    function removeWantCards (card : string) {
        if (cardState?.addWC.includes(card))
            cardState?.setAddWC(cardState?.addWC.filter((item : string) => item !== card))
        else
          cardState?.setRmWC((prev) => [...prev, card])
        cardState?.setWantArr(cardState?.wantArr.filter((item : string) => item !== card))
        console.log("rmWC: " + cardState?.rmWC)
        console.log("wantArr: " + cardState?.wantArr)
    }
    
    const combinedArr = [...cardState?.wantArr || [], ...cardState?.addWC || []]

    return (
        <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
            {combinedArr.map((card) => (
            <li
                key={card}
                // if card already in addWC, just remove it there
                // if not, add removed card to setRmWC
                // update wantCards either way
                onClick={() => removeWantCards(card)}
                onAuxClick={() => removeWantCards(card)}
            >
                <div style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
                    <ImageFromStorage fileName={card} />
                </div>
            </li>
            ))}
        </ol>
    )
}