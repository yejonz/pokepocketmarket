import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, HitsPerPage, Pagination } from 'react-instantsearch';
import { useHits, UseHitsProps } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css'
import ImageFromStorage from '../firebase/imageFromStorage';
import { useContext } from 'react';
import { CardStateContext } from '../contexts/CardStateContext';

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATIONID + "";
const searchAPIKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY + "";
const searchClient = algoliasearch(applicationID, searchAPIKey);

// Parameters
const cardWidth = 12;
const cardWidthMode = 'rem';
const cardsPerRow = 5;

function CustomHits(props: UseHitsProps) {
  // destructures UseHitsProps' hits into "items"
  const { items } = useHits(props)
  const cardState = useContext(CardStateContext)
  return (
    <ol style={{ display: 'flex', flexWrap: 'wrap', width: `${cardWidth * cardsPerRow}${cardWidthMode}`}}>
      {items.map((hit) => (
        <li
          key={hit.objectID}
          // clicking a particular card will add that card to user
          onClick={() => {
            if (!cardState?.addWC.includes(hit.objectID) && !cardState?.wantArr.includes(hit.objectID)) {
              cardState?.setAddWC((prev) => [...prev, hit.objectID]);
            }
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

export default function CardSearch() {
  return (
    <div>
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
