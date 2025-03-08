'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import MatchDisplay from "@/my_components/matchDisplay";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetchAllUsersData, findBestMatches } from "../../../firebase/matchUtils";

interface MatchData { 
  userId: string, 
  friendCode: string,
  discord: string,
  note: string,
  userWantsOtherHas: string[],
  userHasOtherWants: string[]
}
// Parameters
const matchesPerPage = 2

const Home = () => {
  const [pgnStart, setPgnStart] = useState(0)
  const [matches, setMatches] = useState<MatchData[]>()
  
  useEffect(() => {
      const auth = getAuth()
      async function fetchData() {
          try {
              const data = await fetchAllUsersData()
              if (auth.currentUser != null) {
                  const matchesData = findBestMatches(auth.currentUser.uid, data)
                  console.log("matchesData being calculated")
                  setMatches(matchesData)
              }
              
          } catch (error) {
              console.error("Failed to fetch user data: ", error);
          }
      }
      fetchData();
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
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
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

export default Home;