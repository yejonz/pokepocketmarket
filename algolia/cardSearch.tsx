import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, HitsPerPage, Pagination } from 'react-instantsearch';
import { useHits, UseHitsProps } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css'
import ImageFromStorage from '../firebase/imageFromStorage';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { CardStateContext } from '../contexts/CardStateContext';
import { doc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";
import { app } from '../firebase/firebaseConfig';
import { User } from 'firebase/auth';

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATIONID + "";
const searchAPIKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY + "";
const searchClient = algoliasearch(applicationID, searchAPIKey);

// Parameters
const cardWidth = 12;
const cardWidthMode = 'vw';
const cardsPerRow = 5;

// // Takes user and code, adds card to user's "haveCards" array
// async function addHaveCards(user : User | null, code : string) {
//   const now = Date.now();
//   if (user) {
//     const haveRef = doc(getFirestore(app), "users", "" + user?.uid);

//     await updateDoc(haveRef, {
//       haveCards: arrayUnion(code)
//     })
//   }
// }



export default function CardSearch() {
  // take in UserContext from parent
  const user = useContext(UserContext);
  const cardState = useContext(CardStateContext)

  function CustomHits(props: UseHitsProps) {
    // destructures UseHitsProps' hits into "items"
    const { items } = useHits(props);
    return (
      <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
        {items.map((hit) => (
          <li
            key={hit.objectID}
            // clicking a particular card will add that card to user
            onClick={() => {
              if (!cardState?.addHC.includes(hit.objectID))
                cardState?.setAddHC([...cardState?.addHC, hit.objectID])
            }}
          >
            <div style={{ width: `${cardWidth}${cardWidthMode}`, maxWidth: '294px'}}>
              <ImageFromStorage fileName={hit.ImgNum}/>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div>
      <button onClick={() => console.log(cardState?.addHC)}> BUTTON </button>
      <InstantSearch searchClient={searchClient} indexName="cardsIndex" insights={true} future={{preserveSharedStateOnUnmount : true}}>
        <SearchBox />
        <CustomHits/>
        <HitsPerPage
          items={[
            { label: '5 per page', value: 5, default: true },
            { label: '10 per page', value: 10 },
            { label: '20 per page', value: 20 }
          ]}
        />
        <Pagination />
      </InstantSearch>
    </div>
  );
}
