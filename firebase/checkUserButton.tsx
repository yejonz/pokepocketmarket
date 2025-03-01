'use client'

import { getAuth } from "firebase/auth";

export default function CheckUserButton() {
    function checkUser() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
            console.log("checkUser detects user " + user.uid)
        } else {
        // No user is signed in.
            console.log("no user detected")
        }
    }

    return <button onClick={checkUser}>Check User</button>
}

