'use client'

import { Button } from "@/components/ui/button"
import { User } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { CardStateContext } from "../contexts/CardStateContext";

export default function SaveChangesButton() {
    const user = useContext(UserContext)
    const cardState = useContext(CardStateContext)

    // Cooldown for save changes
    let lastUpdate = 0;
    const RATE_LIMIT = 5000;

    // Takes user and code, adds card to user's "haveCards" array
    async function saveChanges(user : User | null) {
      const now = Date.now();
      if (user && (now - lastUpdate > RATE_LIMIT)) {
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
      }
      // display cooldown
      else {

      }
    }

    return <Button onClick={() => saveChanges(user)}> Save Changes </Button>
}