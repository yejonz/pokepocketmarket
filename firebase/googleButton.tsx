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
    
    // Always set redirect URL to home page
    provider.setCustomParameters({
      redirect_uri: window.location.origin + "/"
    });

    if (window.location.host === 'localhost:3000') {
      // For local development, still use popup but redirect manually
      signInWithPopup(auth, provider)
        .then(() => {
          window.location.href = "/";  // Redirect after successful popup login
        });
    } else {
      // For production, use redirect with explicit home page URL
      signInWithRedirect(auth, provider);
    }
  };

  return <Button onClick={handleSignIn}>
    {user ? 'Switch Account' : 'Sign In'}
  </Button>
}