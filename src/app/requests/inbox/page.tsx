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
import InboxDisplay from "@/my_components/inboxDisplay";

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
  const [inbox, setInbox] = useState<ReqData[]>()

  async function deleteReq (reqRef : DocumentReference) {
    await deleteDoc(reqRef)
    setInbox(prevInbox => (prevInbox || []).filter(item => item.reqRef.id !== reqRef.id));
  }
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
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
          
          setInbox(inboxData);
        } catch (error) {
          console.error("Failed to fetch inbox data: ", error);
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

  return (
    <div>
      <div>
        <ol className="flex flex-col items-center">
          {(inbox?.slice(pgnStart, pgnStart + reqsPerPage) || []).map((data) => (
            <li key={data.friendCode}>
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
  );
};