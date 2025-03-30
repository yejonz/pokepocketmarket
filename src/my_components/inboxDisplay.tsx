import { Card } from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";
import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import { timeAgo } from "./timeAgo";
import { Button } from "@/components/ui/button";
import ImageFromStorageFade from "./imageFromStorageFade";

interface ReqData { 
  friendCode: string, 
  discord: string,
  note: string,
  timestamp: Timestamp,
  haveCard: string,
  wantCard: string,
  reqRef: DocumentReference
}

export default function InboxDisplay({ data, deleteReq }: { data: ReqData, 
  deleteReq: (docRef: DocumentReference<DocumentData, DocumentData>) => void }) { 
    return (
        <div className="m-4">
          <Card className="flex p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 opacity-70 transition-all hover:bg-destructive hover:text-destructive-foreground hover:opacity-100 hover:scale-110"
              onClick={() => deleteReq(data.reqRef)}
              aria-label="Delete"
            >
              <X className="h-4 w-4" />
            </Button>
    
            <div className="max-w-[294px] m-1 w-48">
              <ImageFromStorageFade fileName={data.wantCard} />
            </div>
            <div className="content-center">
              <ArrowRight className="w-16 h-16" />
            </div>
            <div className="max-w-[294px] m-1 w-48">
              <ImageFromStorageFade fileName={data.haveCard} />
            </div>
            <div className="m-1 w-96">
              <ol className="ml-4">
                <li className="mb-2">
                  <b>Sent: </b>
                  {timeAgo(data.timestamp.toDate())}
                </li>
                <li className="mb-2 mt-2">
                  <b>Friend Code: </b>
                  {data.friendCode}
                </li>
                <li className="mb-2 mt-2">
                  <b>Discord: </b>
                  {data.discord}
                </li>
                <li className="mt-2">
                  <b>Note: </b>
                  {data.note}
                </li>
              </ol>
            </div>
          </Card>
        </div>
      )
}