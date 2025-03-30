import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, HitsPerPage, Pagination } from 'react-instantsearch';
import { useHits, UseHitsProps } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css'
import { useContext } from 'react';
import { CardStateContext } from '../contexts/CardStateContext';
import ImageFromStorageFade from '@/my_components/imageFromStorageFade';

const applicationID = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATIONID + "";
const searchAPIKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCHAPIKEY + "";
const searchClient = algoliasearch(applicationID, searchAPIKey);

function CustomHits(props: UseHitsProps) {
  // destructures UseHitsProps' hits into "items"
  const { items } = useHits(props)
  const cardState = useContext(CardStateContext)
  const cardWidth = cardState?.cardWidth || 9;
  const cardWidthMode = cardState?.cardWidthMode || 'rem';
  const cardsPerRow = cardState?.cardsPerRow || 5;

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
            <ImageFromStorageFade fileName={hit.ImgNum}/>
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
            { label: '15 per page', value: 15 },
            { label: '20 per page', value: 20 }
          ]}
        />
        <Pagination />
      </InstantSearch>
    </div>
  );
}
