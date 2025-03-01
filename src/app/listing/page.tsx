'use client'
import CardSearch from "../../../algolia/cardSearch";
import UserContext from "../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import CheckUserButton from "../../../firebase/checkUserButton";
import HaveWantCards from "../../../firebase/haveWantCards";
import { Button } from "@/components/ui/button";
import { CardStateProvider } from "../../../contexts/CardStateContext";

const Listing = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser?.uid);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [auth]);
  
  return (
    <UserContext.Provider value={user}>
      <CardStateProvider> {/* Wrap components with the CardStateProvider */}
        <div className="flex-col">
          <CheckUserButton />
          <div style={{ display: "flex", maxWidth: '75%', justifySelf: 'center'}}>
            <CardSearch />
          </div>
          <div>
            <HaveWantCards />
          </div>
          <div>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </CardStateProvider>
    </UserContext.Provider>
  );
};

export default Listing;