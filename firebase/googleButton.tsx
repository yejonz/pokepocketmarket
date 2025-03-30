'use client'

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { app } from './firebaseConfig';
import { Button } from "@/components/ui/button";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function GoogleButton() {
  const {user} = useContext(UserContext)

  function handleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    if (window.location.host === 'localhost:3000') {
      // for local development, use popup and redirect to home
      signInWithPopup(auth, provider)
        .then(() => {
          window.location.href = "/";
        });
    } else {
      signInWithRedirect(auth, provider);
    }
  };

  return <Button onClick={handleSignIn}>
    {user ? 'Switch Account' : 'Sign In'}
  </Button>
}