'use client'
import UserContext from "../../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CardStateProvider } from "../../../../contexts/CardStateContext";
import HCSaveChangesButton from "../../../../firebase/HCsaveChangesButton";
import HaveCards from "../../../../firebase/haveCards";
import HaveCardSearch from "../../../../algolia/haveCardSearch";
import { Card } from "@/components/ui/card";
import HCCounter from "@/my_components/HCCounter";

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
              <HaveCardSearch/>
            </div>
          </div>
          <div className="flex-col w-1/2 m-10">
            <Card className="justify-self-start p-5">
              <h1 className="justify-self-center text-4xl mt-5 font-mono">
                Have Cards
              </h1>
              <p className="justify-self-center text-xs font-mono italic text-gray-500 mb-5">
                Select the cards that you want to trade away
              </p>
              <HaveCards />
              <div className="mt-5">
                <HCCounter />
              </div>
            </Card>
            <div className="flex gap-1 mt-5">
              <HCSaveChangesButton />
            </div>
          </div>
        </div>
      </CardStateProvider>
    </UserContext.Provider>
  )
}

export default Home;