"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from "../../firebase/firebaseConfig"

const ImageFromStorageFade = ({ fileName }: { fileName: string }) => {
  const [imageURL, setImageURL] = useState("")
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const storage = getStorage(app)
    const imageRef = ref(storage, "cardImages/" + fileName + ".png")
    
    getDownloadURL(imageRef)
      .then((url) => {
        setImageURL(url)
      })
      .catch((error) => console.error("Error loading image:", error))
  }, [fileName])

  // Trigger fade-in only after image fully loads
  const handleImageLoad = () => {
    setFadeIn(true)
  }

  if (imageURL)
    return (
      <img
        alt={fileName}
        className={`rounded-md object-cover transition-opacity duration-1000 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
        src={imageURL}
        onLoad={handleImageLoad} // Set fade-in only after load
      />
    )

  return <div className="h-full w-full" />
}

export default ImageFromStorageFade
