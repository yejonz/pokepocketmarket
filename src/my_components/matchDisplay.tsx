'use client'

import { Card } from "@/components/ui/card";
import ImageFromStorage from "../../firebase/imageFromStorage";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";

const db = getFirestore(app)

interface MatchData { 
    userId: string, 
    friendCode: string,
    discord: string,
    note: string,
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

    async function checkRarities(HC : string, WC : string) {
        const docRefHC = doc(db, "cards", HC)
        const docRefWC = doc(db, "cards", WC)
        const docSnapHC = await getDoc(docRefHC)
        const docSnapWC = await getDoc(docRefWC)
        if (docSnapHC.exists() && docSnapWC.exists()) {
            return docSnapHC.data().Rarity == docSnapWC.data().Rarity
        }
        else {
            return false
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
                const rarityMatch = await checkRarities(selectHC, selectWC)
                // rarities don't match
                if (!rarityMatch) {
                    setSendTradeMsg("Both card rarities don't match.")
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
                                                    <ImageFromStorage key={card} fileName={card} />
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
                                                    <ImageFromStorage key={card} fileName={card} />
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
                            <div className="w-1/2 box-border mr-4">
                                <p className="break-words">
                                    <b>Note: </b>{data.note}
                                </p>
                            </div>
                            <ol className="w-1/2 box-border ml-4">
                                <li className="mb-2">
                                    <b>Friend Code: </b>{data.friendCode}
                                </li>
                                <li className="mb-2 mt-2">
                                    <b>Discord: </b>{data.discord}
                                </li>
                                <li className={sendTradeMsg ? "mt-2" : "mb-9 mt-2"}>
                                    <Button onClick={sendTrade}>
                                        Send Trade
                                    </Button>
                                    {sendTradeMsg && 
                                    <div className="mt-2 mb-2 italic text-red-600">
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