'use client'

import { Button } from "@/components/ui/button"
import { User } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { CardStateContext } from "../contexts/CardStateContext";

// Cooldown for save changes
let lastUpdate = 0;
const RATE_LIMIT = 5000;

export default function HCSaveChangesButton() {
    const user = useContext(UserContext)
    const cardState = useContext(CardStateContext)
    const [saveMsg, setSaveMsg] = useState("")

    // Takes user and code, adds card to user's "haveCards" array
    async function saveChanges(user : User | null) {
      const now = Date.now();
      if (!(now - lastUpdate > RATE_LIMIT)) {
        setSaveMsg("Cooldown: " + ((RATE_LIMIT - now + lastUpdate)/1000).toFixed(1) + "s")
      }
      else if ((cardState?.HCcombinedArr?.length || 0) > 40) {
        setSaveMsg("Card limit exceeded.");
      }
      else if (user) {
        lastUpdate = now
        const haveRef = doc(getFirestore(app), "users", "" + user?.uid);

        await updateDoc(haveRef, {
          haveCards: arrayRemove(...cardState?.rmHC || [])
        })
        await updateDoc(haveRef, {
          haveCards: arrayUnion(...cardState?.addHC || [])
        })

        await updateDoc(haveRef, {
          wantCards: arrayRemove(...cardState?.rmWC || [])
        })
        await updateDoc(haveRef, {
          wantCards: arrayUnion(...cardState?.addWC || [])
        })

        setSaveMsg("Saved changes successfully.")
      }
    }

    return (
      <div className="flex">
        <Button onClick={() => saveChanges(user)}> Save Changes </Button>
        <div className="ml-2">
          {saveMsg && 
            <div className={saveMsg == "Saved changes successfully." ? "italic text-green-600" : "italic text-red-600"}>
              {saveMsg}
            </div>}
        </div>
      </div>
    )
}