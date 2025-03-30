import { collection, getDocs, getFirestore, Timestamp } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app)

interface UserData { 
    userId: string, 
    friendCode: string,
    discord: string,
    note: string,
    lastActive: Timestamp,
    haveCards: string[],
    wantCards: string[]
}

export async function fetchAllUsersData() {
    const usersCollection = collection(db, 'users')
    const usersSnapshot = await getDocs(usersCollection)
    const usersData : { [key : string] : UserData } = {}

    usersSnapshot.forEach(doc => {
        usersData[doc.id] = { 
            userId: doc.id, 
            friendCode: doc.data().friendCode,
            discord: doc.data().discord,
            note: doc.data().note,
            lastActive: doc.data().lastActive,
            haveCards: doc.data().haveCards,
            wantCards: doc.data().wantCards
        } as UserData
    })

    return usersData
}

export function findBestMatches(userId: string, allUsersData: { [key : string] : UserData }, sortBy: string) {
    const user = allUsersData[userId]
    const userHaveCards = new Set(user.haveCards)
    const userWantCards = new Set(user.wantCards)
    const results = Object.values(allUsersData)
        .filter(otherUser => otherUser.userId !== userId)
        .map(otherUser => {
            const otherHaveCards = new Set(otherUser.haveCards)
            const otherWantCards = new Set(otherUser.wantCards)
            const userWantsOtherHas = [...userWantCards.intersection(otherHaveCards)]
            const userHasOtherWants = [...otherWantCards.intersection(userHaveCards)]

            return {
                userId: otherUser.userId,
                friendCode: otherUser.friendCode,
                discord: otherUser.discord,
                note: otherUser.note,
                lastActive: otherUser.lastActive,
                userWantsOtherHas: userWantsOtherHas,
                userHasOtherWants: userHasOtherWants
            }
        })
    return results
        // filter out trades where there isn't anything the user wants
        .filter(a => a.userWantsOtherHas.length > 0)
        .sort((a, b) => {
        // first, prioritize trades where there is something the user can trade
        if (!a.userHasOtherWants.length) {
            return 1
        }

        // second, sort by how many wanted cards the other has or most recently active
        if (sortBy == "mostrecent") {
            return b.lastActive.toMillis() - a.lastActive.toMillis()
        }
        // by default, sort by wanted cards
        return b.userWantsOtherHas.length - a.userWantsOtherHas.length
    })
}