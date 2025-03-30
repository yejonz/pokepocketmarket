"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from "../../firebase/firebaseConfig"

const ImageFromStorageFade= ({ fileName } : { fileName : string }) => {
    const [imageURL, setImageURL] = useState("")
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(() => {
        const storage = getStorage(app)
        const imageRef = ref(storage, "cardImages/" + fileName + ".png")
        getDownloadURL(imageRef)
        .then((url) => {
            setImageURL(url)
            setTimeout(() => setFadeIn(true), 50)
        })
        .catch((error) => console.error("Error loading image:", error))
    }, [fileName])

    if (imageURL) return (
        <img
        alt={imageURL}
        className={`rounded-md object-cover transition-opacity duration-1000 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
        src={imageURL}
        />
    )

    return (
        <div className="h-full w-full"/>
    )
}

export default ImageFromStorageFade