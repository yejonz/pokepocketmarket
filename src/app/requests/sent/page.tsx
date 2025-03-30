'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, deleteDoc, DocumentReference, getDocs, getFirestore, Timestamp } from "firebase/firestore";
import { app } from "../../../../firebase/firebaseConfig";
import SentDisplay from "@/my_components/sentDisplay";
import { Card } from "@/components/ui/card";

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
const reqsPerPage = 2

export default function Home () {
  const [pgnStart, setPgnStart] = useState(0)
  const [sent, setInbox] = useState<ReqData[]>()

  async function deleteReq (reqRef : DocumentReference) {
    await deleteDoc(reqRef)
    setInbox(prevInbox => (prevInbox || []).filter(item => item.reqRef.id !== reqRef.id));
  }
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const sentCollection = collection(db, 'requests', user.uid, 'sent');
          const sentSnap = await getDocs(sentCollection);
          const sentData = [] as ReqData[];
          
          sentSnap.forEach(doc => {
            if (doc.id !== 'baka') {
              sentData.push({
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
          
          setInbox(sentData);
        } catch (error) {
          console.error("Failed to fetch sent requests: ", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  function pgnPrev() {
    setPgnStart(pgnStart - reqsPerPage)
    console.log("pgnPrev: " + pgnStart)
  }

  function pgnNext() {
    setPgnStart(pgnStart + reqsPerPage)
    console.log("pgnNext: " + pgnStart)
  }

  if (sent) {
    if (sent.length) {
      <div>
        <div>
          <ol className="flex flex-col items-center">
            {(sent?.slice(pgnStart, pgnStart + reqsPerPage) || []).map((data) => (
              <li key={data.friendCode}>
                <SentDisplay data={data} deleteReq={deleteReq}/>
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
              {pgnStart < ((sent || []).length - reqsPerPage) && (
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
    }

    return (
      <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">No sent requests.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">You have not sent any requests</p>
      </Card>
    )
  }

  return (
    <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
        <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
        <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">Please sign in to check your sent requests</p>
      </Card>
  )
}