import { useContext } from "react"
import { CardStateContext } from "../../contexts/CardStateContext"

export default function WCCounter() {
    const cardState = useContext(CardStateContext)
    let len = cardState?.WCcombinedArr.length || 0

    return (
        <div className={len > 40 ? "italic text-xs text-red-600" : "text-xs"}>
            {len}/40
        </div>
    )
}