'use client'
import UserContext from "../../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CardStateProvider } from "../../../../contexts/CardStateContext";
import WCSaveChangesButton from "../../../../firebase/WCsaveChangesButton";
import WantCards from "../../../../firebase/wantCards";
import WantCardSearch from "../../../../algolia/wantCardSearch";
import { Card } from "@/components/ui/card";
import WCCounter from "@/my_components/WCCounter";

const Home = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser?.uid);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  
  return (
    <UserContext.Provider value={user}>
      <CardStateProvider>
        <div className="flex">
          <div className="w-1/2">
            <div className="justify-self-end m-10">
              <WantCardSearch/>
            </div>
          </div>
          <div className="flex-col w-1/2 m-10">
            <Card className="justify-self-start p-5">
              <h1 className="justify-self-center text-4xl mt-5 font-mono">
                Want Cards
              </h1>
              <p className="justify-self-center text-xs font-mono italic text-gray-500 mb-5">
                Select the cards that you want to trade for
              </p>
              <WantCards />
              <div className="mt-5">
                <WCCounter />
              </div>
            </Card>
            <div className="flex gap-1 mt-5">
              <WCSaveChangesButton />
            </div>
          </div>
        </div>
      </CardStateProvider>
    </UserContext.Provider>
  )
}

export default Home;