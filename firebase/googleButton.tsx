'use client'

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { app } from './firebaseConfig';
import { Button } from "@/components/ui/button";

export default function GoogleButton() {
  function handleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    // redirect option only set up for public host, use popup otherwise for development
    if (window.location.host === 'localhost:3000') {
      signInWithPopup(auth, provider);
    } else {
      signInWithRedirect(auth, provider);
    }
  };

  return <Button onClick={handleSignIn}>
    Sign In
  </Button>
}