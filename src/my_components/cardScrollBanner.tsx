"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

export interface ScrollingBannerItem {
  id: string | number
  content: React.ReactNode
}

interface CardScrollBannerProps {
  items?: ScrollingBannerItem[]
  topItems?: ScrollingBannerItem[]
  bottomItems?: ScrollingBannerItem[]
  title?: string
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
  buttonText?: string
  buttonLink?: string
  buttonClassName?: string
}

export function CardScrollBanner({
  items,
  topItems: propTopItems,
  bottomItems: propBottomItems,
  title = "Featured Collection",
  subtitle = "Discover our latest additions",
  titleClassName = "",
  subtitleClassName = "",
  buttonText = "Get Started",
  buttonLink = "/get-started",
  buttonClassName = "",
}: CardScrollBannerProps) {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(280) // 264px + 16px gap

  // Support both new API (topItems/bottomItems) and old API (items)
  const topItems = propTopItems || items || []
  const bottomItems = propBottomItems || items || []

  // Calculate animation duration based on number of items (more items = longer duration)
  const topBaseDuration = 5000 // Base duration in ms
  const topItemDuration = 2000 // Additional ms per item
  const topCalculatedDuration = topBaseDuration + topItems.length * topItemDuration

  const bottomBaseDuration = 5000 // Base duration in ms
  const bottomItemDuration = 2000 // Additional ms per item
  const bottomCalculatedDuration = bottomBaseDuration + bottomItems.length * bottomItemDuration

  // We need to duplicate items enough times to ensure a seamless loop
  const duplicatedTopItems = [...topItems, ...topItems, ...topItems, ...topItems]
  const duplicatedBottomItems = [...bottomItems, ...bottomItems, ...bottomItems, ...bottomItems]

  useEffect(() => {
    // Measure the actual width of the container and items for accurate animation
    const measureWidths = () => {
      if (topRowRef.current) {
        const firstItem = topRowRef.current.querySelector("div")
        if (firstItem) {
          // Get the actual width including gap
          const itemRect = firstItem.getBoundingClientRect()
          setItemWidth(itemRect.width + 16) // width + gap
        }
      }
    }

    // Measure on mount and window resize
    measureWidths()
    window.addEventListener("resize", measureWidths)
    return () => window.removeEventListener("resize", measureWidths)
  }, [])

  useEffect(() => {
    // Top row animation (right to left)
    const topRowElement = topRowRef.current
    if (topRowElement && topItems.length > 0) {
      // Calculate the total width of all original items
      const totalWidth = itemWidth * topItems.length

      const topAnimation = topRowElement.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${totalWidth}px)` }],
        {
          duration: topCalculatedDuration,
          iterations: Number.POSITIVE_INFINITY,
          easing: "linear",
        },
      )

      return () => {
        topAnimation.cancel()
      }
    }
  }, [topItems.length, itemWidth, topCalculatedDuration])

  useEffect(() => {
    // Bottom row animation (left to right)
    const bottomRowElement = bottomRowRef.current
    if (bottomRowElement && bottomItems.length > 0) {
      // Calculate the total width of all original items
      const totalWidth = itemWidth * bottomItems.length

      const bottomAnimation = bottomRowElement.animate(
        [{ transform: `translateX(-${totalWidth}px)` }, { transform: "translateX(0)" }],
        {
          duration: bottomCalculatedDuration,
          iterations: Number.POSITIVE_INFINITY,
          easing: "linear",
        },
      )

      return () => {
        bottomAnimation.cancel()
      }
    }
  }, [bottomItems.length, itemWidth, bottomCalculatedDuration])

  return (
    <div className="relative overflow-hidden whitespace-nowrap bg-green-950" style={{ height: "780px" }}>
      {/* Top row - scrolling right to left */}
      <div className="mb-4 overflow-hidden">
        <div ref={topRowRef} className="flex items-center" style={{ gap: "16px" }}>
          {duplicatedTopItems.map((item, idx) => (
            <div key={`top-${item.id}-${idx}`} className="flex items-center p-2 h-[370px] w-[264px] shrink-0">
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row - scrolling left to right */}
      <div className="overflow-hidden">
        <div ref={bottomRowRef} className="flex items-center" style={{ gap: "16px" }}>
          {duplicatedBottomItems.map((item, idx) => (
            <div key={`bottom-${item.id}-${idx}`} className="flex items-center p-2 h-[370px] w-[264px] shrink-0">
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Title and subtitle overlay with dark semi-transparent background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="bg-black/60 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 rounded-lg backdrop-blur-sm max-w-[90%] md:max-w-[80%] lg:max-w-none">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-1 sm:mb-2 text-center px-2 sm:px-4 md:px-6 ${titleClassName}`}
          >
            {title}
          </h2>
          <p
            className={`text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 text-center max-w-2xl px-2 sm:px-4 md:px-6 mb-3 sm:mb-4 md:mb-6 ${subtitleClassName}`}
          >
            {subtitle}
          </p>
          <div className="flex justify-center">
            <a
              href={buttonLink}
              className={`pointer-events-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 text-sm sm:text-base md:text-lg ${buttonClassName}`}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>

      {/* Gradient fade effect with darker middle */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `linear-gradient(
            90deg, 
            rgba(49, 81, 30, 1) 0%, 
            rgba(49, 81, 30, 0.85) 20%, 
            rgba(49, 81, 30, 0.5) 40%, 
            rgba(49, 81, 30, 0.5) 60%, 
            rgba(49, 81, 30, 0.85) 80%, 
            rgba(49, 81, 30, 1) 100%
          )`,
        }}
      />
    </div>
  )
}

