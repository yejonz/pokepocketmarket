import { useContext } from "react"
import { CardStateContext } from "../../contexts/CardStateContext"

export default function HCCounter() {
    const cardState = useContext(CardStateContext)
    let len = cardState?.HCcombinedArr.length || 0

    return (
        <div className={len > 40 ? "italic text-xs text-red-600" : "text-xs"}>
            {len}/40
        </div>
    )
}