"use client"
import UserContext from "../../../../contexts/UserContext"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { CardStateProvider } from "../../../../contexts/CardStateContext"
import HCSaveChangesButton from "../../../../firebase/HCsaveChangesButton"
import HaveCards from "../../../../firebase/haveCards"
import HaveCardSearch from "../../../../algolia/haveCardSearch"
import { Card } from "@/components/ui/card"
import HCCounter from "@/my_components/HCCounter"

const Home = () => {
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      console.log(currentUser?.uid)
    })

    return () => {
      unsubscribe()
    }
  }, [auth])

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <CardStateProvider>
          <div className="min-w-full overflow-x-auto">
            <div className="flex min-w-max">
              <div className="w-1/2 m-5">
                <Card className="justify-self-end">
                  <h1 className="justify-self-center text-4xl mt-10 font-mono">Cards Database</h1>
                  <p className="justify-self-center text-xs font-mono italic text-gray-500 mb-5">Search cards</p>
                  <HaveCardSearch />
                </Card>
              </div>
              <div className="flex-col w-1/2 m-5">
                <Card className="justify-self-start p-5">
                  <h1 className="justify-self-center text-4xl mt-5 font-mono">Have Cards</h1>
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
          </div>
        </CardStateProvider>
      </UserContext.Provider>
    )
  }

  return (
    <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Please sign in to edit the cards you have</p>
    </Card>
  )
}

export default Home

