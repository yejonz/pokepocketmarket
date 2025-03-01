'use client'

import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from './firebaseConfig'
  
export default function ImageFromStorage({fileName} : {fileName : string}) {
    const [imageURL, setImageURL] = useState<string | null>(null);

    const storage = getStorage(app);
    const imageRef = ref(storage, 'cardImages/' + fileName + '.png');
    getDownloadURL(imageRef).then((url) => {
        setImageURL(url);
    })
    
    if (imageURL) {
        return (
            <img src={imageURL}/>
        ) 
    }
    return <div />
}
