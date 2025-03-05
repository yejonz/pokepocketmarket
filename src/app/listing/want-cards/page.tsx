'use client'
import UserContext from "../../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CardStateProvider } from "../../../../contexts/CardStateContext";
import SaveChangesButton from "../../../../firebase/saveChangesButton";
import WantCards from "../../../../firebase/wantCards";
import WantCardSearch from "../../../../algolia/wantCardSearch";

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
      <CardStateProvider>
        <div className="flex-col">
          <div style={{ display: "flex", maxWidth: '75%', justifySelf: 'center'}}>
            <WantCardSearch/>
          </div>
          <div>
            <WantCards />
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