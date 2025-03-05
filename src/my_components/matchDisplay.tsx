import ImageFromStorage from "../../firebase/imageFromStorage"

interface MatchData { 
    userId: string, 
    friendCode: string,
    userWantsOtherHas: string[],
    userHasOtherWants: string[]
}

// Parameters
const cardWidth = 12;
const cardWidthMode = 'rem';
const cardsPerRow = 5;

export default function MatchDisplay({data} : {data : MatchData}) {
    return (
        <div style={{display: "flex"}}>
            <div style={{display: "flex", width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
                {data.userHasOtherWants.map((card) => (
                    <ImageFromStorage key={card} fileName={card}/>
                ))}
            </div>
            <div style={{display: "flex", width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
                {data.userWantsOtherHas.map((card) => (
                    <ImageFromStorage key={card} fileName={card}/>
                ))}
            </div>
        </div>
    )
}