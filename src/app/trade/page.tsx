'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import MatchDisplay from "@/my_components/matchDisplay";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetchAllUsersData, findBestMatches } from "../../../firebase/matchUtils";
import { getFirestore, Timestamp } from "firebase/firestore";
import { app } from "../../../firebase/firebaseConfig";

const db = getFirestore(app)

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

  return (
    <div>
      <div>
        <ol className="flex flex-col items-center">
          {(matches?.slice(pgnStart, pgnStart + matchesPerPage) || []).map((data) => (
            <li key={data.userId}>
              <MatchDisplay data={data} />
            </li>
          ))}
        </ol>
      </div>
      <div>
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
    </div>
  );
};