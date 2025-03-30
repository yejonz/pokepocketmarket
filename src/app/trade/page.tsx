'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import MatchDisplay from "@/my_components/matchDisplay";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetchAllUsersData, findBestMatches } from "../../../firebase/matchUtils";
import { Timestamp } from "firebase/firestore";
import { Card } from "@/components/ui/card";

interface MatchData { 
  userId: string, 
  friendCode: string,
  discord: string,
  note: string,
  lastActive: Timestamp,
  userWantsOtherHas: string[],
  userHasOtherWants: string[]
}

// Parameters
const matchesPerPage = 2

export default function Home () {
  const [pgnStart, setPgnStart] = useState(0)
  const [matches, setMatches] = useState<MatchData[]>()
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await fetchAllUsersData();
          const matchesData = findBestMatches(user.uid, data);
          setMatches(matchesData);
        } catch (error) {
          console.error("Failed to fetch user data: ", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  function pgnPrev() {
    setPgnStart(pgnStart - matchesPerPage)
    console.log("pgnPrev: " + pgnStart)
  }

  function pgnNext() {
    setPgnStart(pgnStart + matchesPerPage)
    console.log("pgnNext: " + pgnStart)
  }

  // signed in and fetches match data
  if (matches) {
    // trades found
    if (matches.length) {
      return (
        <div>
          <ol className="flex flex-col items-center">
            {(matches?.slice(pgnStart, pgnStart + matchesPerPage) || []).map((data) => (
              <li key={data.userId}>
                <MatchDisplay data={data} />
              </li>
            ))}
          </ol>
          <Pagination>
            <PaginationContent>
              {pgnStart >= (matchesPerPage) && (
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => {
                    e.preventDefault();
                    pgnPrev();
                  }}/>
                </PaginationItem>
              )}
              {pgnStart < ((matches || []).length - matchesPerPage) && (
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => {
                    e.preventDefault();
                    pgnNext();
                  }}/>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )
    }

    return (
      <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">No Trades Found.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Try expanding your search by adding cards to Have Cards or Want Cards under "Listing"</p>
      </Card>
    )
  }

  return (
    <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Please sign in to see your trades</p>
      </Card>
  )
}