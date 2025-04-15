'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, DocumentReference, getDocs, getFirestore, Timestamp } from "firebase/firestore";
import { app } from "../../../../firebase/firebaseConfig";
import InboxDisplay from "@/my_components/inboxDisplay";
import { Card } from "@/components/ui/card";
import { UserContext } from "../../../../contexts/UserContext";

const db = getFirestore(app)

interface ReqData { 
  friendCode: string, 
  discord: string,
  note: string,
  timestamp: Timestamp,
  haveCard: string,
  wantCard: string,
  reqRef : DocumentReference
}

// Parameters
const reqsPerPage = 10

export default function Home () {
  const [pgnStart, setPgnStart] = useState(0)
  const [inbox, setInbox] = useState<ReqData[]>()
  const {user} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  async function deleteReq (reqRef : DocumentReference) {
    await deleteDoc(reqRef)
    setInbox(prevInbox => (prevInbox || []).filter(item => item.reqRef.id !== reqRef.id));
  }
  
  useEffect(() => {
    const fetchInbox = async () => {
      if (user) {
        const inboxCollection = collection(db, 'requests', user.uid, 'inbox');
        const inboxSnap = await getDocs(inboxCollection);
        const inboxData = [] as ReqData[];
        
        inboxSnap.forEach(doc => {
          if (doc.id !== 'baka') {
            inboxData.push({
              friendCode: doc.data().friendCode, 
              note: doc.data().note,
              discord: doc.data().discord,
              timestamp: doc.data().timestamp,
              haveCard: doc.data().haveCard,
              wantCard: doc.data().wantCard,
              reqRef: doc.ref
            });
          }
        });
        
        setInbox(inboxData.reverse());
      }
      setLoading(false)
    }
    
    fetchInbox()
  })

  function pgnPrev() {
    setPgnStart(pgnStart - reqsPerPage)
    console.log("pgnPrev: " + pgnStart)
  }

  function pgnNext() {
    setPgnStart(pgnStart + reqsPerPage)
    console.log("pgnNext: " + pgnStart)
  }

  if (inbox) {
    if (inbox.length) {
      return (
        <div>
          <div>
            <ol className="flex flex-col items-center">
              {(inbox?.slice(pgnStart, pgnStart + reqsPerPage) || []).map((data, idx) => (
                <li key={idx}>
                  <InboxDisplay data={data} deleteReq={deleteReq}/>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                {pgnStart >= (reqsPerPage) && (
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => {
                      e.preventDefault();
                      pgnPrev();
                    }}/>
                  </PaginationItem>
                )}
                {pgnStart < ((inbox || []).length - reqsPerPage) && (
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
      )
    }

    return (
      <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">Inbox is empty.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">You currently have no trade requests</p>
      </Card>
    )
  }
  
  if (!loading) {
    return (
      <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
          <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
          <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Please sign in to check your inbox</p>
        </Card>
    )
  }
}