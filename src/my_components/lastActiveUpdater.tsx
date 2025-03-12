"use client";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";

const db = getFirestore(app)

export default function LastActiveUpdater() {
    useEffect(() => {
        const auth = getAuth();
        const interval = setInterval(async () => {
        const user = auth.currentUser;
        if (user) {
            try {
            const tsRef = doc(db, 'users', user.uid);
            await setDoc(tsRef, { 
                lastActive: serverTimestamp() 
            }, { merge: true });
            } catch (error) {
            console.error("Error updating last active:", error);
            }
        }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return null;
}