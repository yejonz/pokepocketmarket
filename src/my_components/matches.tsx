'use client'

import { useEffect, useState } from "react"
import { fetchAllUsersData, findBestMatches } from "../../firebase/matchUtils"
import { getAuth } from "firebase/auth";
import MatchDisplay from "./matchDisplay";

interface MatchData { 
    userId: string, 
    friendCode: string,
    userWantsOtherHas: string[],
    userHasOtherWants: string[]
}

export default function Matches() {
    // const [user, setUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<MatchData[]>()

    useEffect(() => {
        const auth = getAuth()
        // // Set initial user state from current authUser
        // const unsubscribe = auth.onAuthStateChanged(authUser => {
        //     setUser(authUser);
        // });
        async function fetchData() {
            try {
                const data = await fetchAllUsersData()
                if (auth.currentUser != null) {
                    // console.log(data[auth.currentUser.uid])
                    const matchesData = findBestMatches(auth.currentUser.uid, data)
                    console.log(matchesData)
                    setMatches(matchesData)
                }
                
            } catch (error) {
                console.error("Failed to fetch user data: ", error);
            }
        }
        fetchData();
        // // Clean up subscription on unmount
        // return () => unsubscribe();
    }, []);

    return (
        <div>
            <ol style={{display: "flex", flexDirection: "column"}}>
                {(matches || []).map((data) => (
                    <li key={data.userId}>
                        <MatchDisplay data={data} />
                    </li>
                ))}
            </ol>
        </div>
    )
}