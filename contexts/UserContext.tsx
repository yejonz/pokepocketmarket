'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

interface UserContextType {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({user: null, loading: true});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app)
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (!currentUser?.uid) {
        console.log('No user signed in.')
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [auth])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider }