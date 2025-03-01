'use client'

import ImageFromStorage from '../../firebase/imageFromStorage';

interface Hit {
    ImgNum: string;
}
  
export default function CardCard({hit} : {hit : Hit}) {
    return (
        <ImageFromStorage fileName={hit.ImgNum} />
    )
}
