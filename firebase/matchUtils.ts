import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app)

interface UserData { 
    userId: string, 
    friendCode: string,
    discord: string,
    note: string,
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
            haveCards: doc.data().haveCards,
            wantCards: doc.data().wantCards
        } as UserData
    })

    return usersData
}

export function findBestMatches(userId: string, allUsersData: { [key : string] : UserData }) {
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
                userWantsOtherHas: userWantsOtherHas,
                userHasOtherWants: userHasOtherWants
            }
        })
    return results
        .filter(a => a.userWantsOtherHas.length > 0)
        .sort((a, b) => {
        // first, sort by which has ANY userHasCount
        if (!a.userHasOtherWants.length) {
            return 1
        }
        else if (!b.userHasOtherWants.length) {
            return -1
        }
        // second, sort by how many wanted cards the other has
        return b.userWantsOtherHas.length - a.userWantsOtherHas.length
    })
}