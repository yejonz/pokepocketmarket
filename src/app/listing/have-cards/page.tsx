'use client'
import UserContext from "../../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CardStateProvider } from "../../../../contexts/CardStateContext";
import SaveChangesButton from "../../../../firebase/saveChangesButton";
import HaveCards from "../../../../firebase/haveCards";
import HaveCardSearch from "../../../../algolia/haveCardSearch";

const Home = () => {
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
          <div style={{ display: "flex", maxWidth: '75%', justifySelf: 'center'}}>
            <HaveCardSearch />
          </div>
          <div>
            <HaveCards />
          </div>
          <div>
            <SaveChangesButton />
          </div>
        </div>
      </CardStateProvider>
    </UserContext.Provider>
  );
};

export default Home;