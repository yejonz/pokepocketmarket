import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { app } from "./firebaseConfig";
import { arrayRemove, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import ImageFromStorage from "./imageFromStorage";

// Parameters
const cardWidth = 12;
const cardWidthMode = 'vw';
const cardsPerRow = 5;

// // Takes user and code, adds card to user's "haveCards" array
// async function removeHaveCards(user : User | null, code : string) {
//   const now = Date.now();
//   if (user) {
//     const haveRef = doc(getFirestore(app), "users", "" + user?.uid);

//     await updateDoc(haveRef, {
//       haveCards: arrayRemove(code)
//     })
//   }
// }

export default function HaveWantCards(props : any) {
    const [haveArr, setHaveArr] = useState<string[]>([]);
    // take in UserContext from parent
    const user = useContext(UserContext);
    const haveRef = doc(getFirestore(app), "users", "" + user?.uid);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(haveRef, (doc) => {
    //         const data = doc.data();
    //         setHaveArr(data?.haveCards || []); // Update state with haveCards array or empty array if none
    //         console.log(data?.haveCards || []);
    //     });

    //     // Cleanup subscription on unmount
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [user]);

    function removeHaveCards (card : string) {
        if (props.addHC.includes(card))
            props.setAddHC(props.addHC.filter((item : string) => item !== card))
        else
            props.setRmHC((prev:[]) => [...prev, card])
        setHaveArr(haveArr.filter((item : string) => item !== card))
        console.log("haveArr: " + haveArr)
    }

    return (
        <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
            {haveArr.map((card) => (
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