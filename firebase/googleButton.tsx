'use client'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from './firebaseConfig';
import { Button } from "@/components/ui/button";

export default function GoogleButton() {
  function handleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
      // .then((result) => {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential?.accessToken;
      //   // The signed-in user info.
      //   const user = result.user;
      //   console.log('User signed in:', user);
      //   // IdP data available using getAdditionalUserInfo(result)
      //   // ...
      // })
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // The email of the user's account used.
      //   const email = error.customData?.email;
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      //   console.error('Error during sign-in:', errorCode, errorMessage, email, credential);
      //   // ...
      // });
  };

  return <Button onClick={handleSignIn}>
    Sign In
  </Button>
}