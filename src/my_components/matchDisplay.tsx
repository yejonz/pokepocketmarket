'use client'

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { timeAgo } from "./timeAgo";
import ImageFromStorageFade from "./imageFromStorageFade";

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
const cardWidth = 9;
const cardWidthMode = 'rem';
const cardsPerRow = 4;

// Cooldown for send trade
let lastUpdate = 0;
const RATE_LIMIT = 5000;

export default function MatchDisplay({ data }: { data: MatchData }) { 
    const [selectHC, setSelectHC] = useState("")
    const [selectWC, setSelectWC] = useState("")
    const [accVal, setAccVal] = useState("")
    const [triggerWidth, setTriggerWidth] = useState(0)
    const [sendTradeMsg, setSendTradeMsg] = useState("")
    const triggerRef = useRef<HTMLDivElement>(null)
    const auth = getAuth()

    useEffect(() => {
        if (selectHC || selectWC) {
            setAccVal("item")
        } else {
            setAccVal("")
        }
    }, [selectHC, selectWC])

    useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth)
        }
    }, []);

    function selectHaveCard(card: string) {
        if (card === selectHC) {
            setSelectHC("")
        } else {
            setSelectHC(card);
        }  
    }
    function selectWantCard(card: string) {
        if (card === selectWC) {
            setSelectWC("")
        } else {
            setSelectWC(card)
        }  
    }

    async function checkRarities() {
        const docRefHC = doc(db, "cards", selectHC)
        const docRefWC = doc(db, "cards", selectWC)
        const docSnapHC = await getDoc(docRefHC)
        const docSnapWC = await getDoc(docRefWC)
        if (docSnapHC.exists() && docSnapWC.exists()) {
            return docSnapHC.data().Rarity == docSnapWC.data().Rarity
        }
        else {
            return false
        }
    }

    async function validTrade() {
        const curUser = auth.currentUser
        if (curUser != null) {
            // get curUser's friendCode
            const curUserRef = doc(db, 'users', curUser.uid)
            const curUserDataSnap = await getDoc(curUserRef)
            const curUserData = curUserDataSnap.data()

            // set inbox request
            const inboxRef = doc(db, 'requests', data.userId, 'inbox', curUser.uid)
            await setDoc(inboxRef, {
                friendCode: curUserData?.friendCode,
                note: curUserData?.note,
                discord: curUserData?.discord,
                timestamp: serverTimestamp(),
                haveCard: selectHC,
                wantCard: selectWC
            })

            // set sent request
            const sentRef = doc(db, 'requests', curUser.uid, 'sent', data.userId)
            await setDoc(sentRef, {
                friendCode: data.friendCode,
                note: data.note,
                discord: data.discord,
                timestamp: serverTimestamp(),
                haveCard: selectHC,
                wantCard: selectWC
            })

            setSendTradeMsg("Trade sent successfully.")
        }
        else {
            setSendTradeMsg("Could not authenticate user, try again.")
        }
    }

    async function sendTrade() {
        const now = Date.now()
        if (now - lastUpdate > RATE_LIMIT) {
            lastUpdate = now
            // two cards aren't selected
            if (!selectHC || !selectWC) {
                setSendTradeMsg("Two cards were not selected.")
            }
            else {
                const rarityMatch = await checkRarities()
                // rarities don't match
                if (!rarityMatch) {
                    setSendTradeMsg("Both card rarities don't match.")
                }
                // we know we have 2 cards of same rarity, so this trade is valid
                else {
                    validTrade()
                }
            } 
        }
        else {
            setSendTradeMsg("Cooldown: " + ((RATE_LIMIT - now + lastUpdate)/1000).toFixed(1) + "s")
        }
    }

    const preventToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div className="m-4">
            <Accordion type="single" collapsible value={accVal}>
                <AccordionItem value="item">
                    <div ref={triggerRef}>
                        <AccordionTrigger  onClick={preventToggle} className="cursor-default">
                            <Card className="flex">
                                <div style={{ display: "flex", flexWrap: "wrap", width: `${(cardWidth * cardsPerRow) + cardsPerRow}${cardWidthMode}`, padding: "1rem", justifyContent: "flex-start" }}>
                                    {data.userHasOtherWants.map((card) => (
                                        <div key={card} style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px', margin: '.25rem' }}>    
                                            <div onClick={() => selectHaveCard(card)}>
                                                <div className={card === selectHC ? "border-2 border-black" : ""}>
                                                    <ImageFromStorageFade key={card} fileName={card} />
                                                </div>
                                            </div>
                                        </div>    
                                    ))}
                                </div>
                                <div className="content-center">
                                    <ArrowRight className="w-16 h-16" />
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", width: `${(cardWidth * cardsPerRow) + cardsPerRow}${cardWidthMode}`, padding: "1rem", justifyContent: "flex-start" }}>
                                    {data.userWantsOtherHas.map((card) => (
                                        <div key={card} style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px', margin: '.25rem' }}>
                                            <div onClick={() => selectWantCard(card)}>
                                                <div className={card === selectWC ? "border-2 border-black" : ""}>
                                                    <ImageFromStorageFade key={card} fileName={card} />
                                                </div>
                                            </div>
                                        </div>    
                                    ))}
                                </div>
                            </Card>
                        </AccordionTrigger>
                    </div>
                    <AccordionContent style={{ width: triggerWidth }}>
                        <Card className="p-4 flex">
                            <div className="w-1/2 mr-4">
                                <p className="break-words">
                                    <b>Note: </b>{data.note}
                                </p>
                            </div>
                            <ol className="w-1/2 ml-4">
                                <li className="mb-2">
                                    <b>Last Active: </b>{timeAgo(data.lastActive.toDate())} 
                                </li>
                                <li className="mb-2 mt-2">
                                    <b>Friend Code: </b>{data.friendCode}
                                </li>
                                <li className="flex gap-1 mb-2 mt-2">
                                    <b>Discord:</b>{data.discord ? data.discord : <p className="text-gray-400 italic">blank</p>}
                                </li>
                                <li className={sendTradeMsg ? "mt-2" : "mb-9 mt-2"}>
                                    <Button onClick={sendTrade}>
                                        Send Trade
                                    </Button>
                                    {sendTradeMsg && 
                                    <div className={sendTradeMsg == "Trade sent successfully." ? "mt-2 mb-2 italic text-green-600" : "mt-2 mb-2 italic text-red-600"}>
                                            {sendTradeMsg}
                                    </div>}
                                </li>
                            </ol>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}