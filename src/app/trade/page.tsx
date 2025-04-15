'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import MatchDisplay from "@/my_components/matchDisplay";
import { useContext, useEffect, useState } from "react";
import { fetchAllUsersData, findBestMatches } from "../../../firebase/matchUtils";
import { Timestamp } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { UserContext } from "../../../contexts/UserContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
const matchesPerPage = 10

export default function Home () {
  const [pgnStart, setPgnStart] = useState(0)
  const [matches, setMatches] = useState<MatchData[]>()
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("wantedcards")
  
  useEffect(() => {
    const fetchMatches = async () => {
      if (user) {
        try {
          const data = await fetchAllUsersData();
          const matchesData = findBestMatches(user.uid, data, sortBy);
          setMatches(matchesData);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }

      setLoading(false)
    }
  
    fetchMatches();
  }, [user, sortBy]);
  

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
          <Card className="flex flex-col p-5 pr-20 pl-20 w-fit mx-auto items-center">
            <h1 className="text-4xl font-mono m-5">Trades</h1>
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="wantedcards">Wanted Cards</SelectItem>
                  <SelectItem value="mostrecent">Most Recent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Card>
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
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Try expanding your search by adding cards to Have Cards or Want Cards under Listing</p>
      </Card>
    )
  }

  if (!loading) {
    return (
      <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Please sign in to see your trades</p>
      </Card>
    )
  }
}