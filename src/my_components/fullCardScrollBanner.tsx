'use client'

import { useState, useEffect } from 'react';
import ImageFromStorage from "../../firebase/imageFromStorage";
import { CardScrollBanner } from "./cardScrollBanner";

const FullCardScrollBanner = () => {
  const [topItems, setTopItems] = useState<Array<{ id: number; content: JSX.Element }>>([]);
  const [bottomItems, setBottomItems] = useState<Array<{ id: number; content: JSX.Element }>>([]);

  useEffect(() => {
    // Helper function moved inside useEffect to ensure client-side execution
    const getRandomNumberString = (range: number) => {
      const number = Math.floor(Math.random() * range) + 1;
      return String(number).padStart(3, '0');
    };

    // Generate random file names
    const generateItems = (count: number) => {
      return Array.from({ length: count }, (_, index) => {
        const fileName = `A1_${getRandomNumberString(286)}`;
        return {
          id: index + 1,
          content: (
            <div className="flex flex-col items-center w-[264px]">
              <ImageFromStorage fileName={fileName} />
            </div>
          ),
        };
      });
    };

    setTopItems(generateItems(20));
    setBottomItems(generateItems(20));
  }, []);

  if (!topItems.length || !bottomItems.length) {
    return null; // Or loading skeleton
  }

  return (
    <div className="w-full">
      <CardScrollBanner
        topItems={topItems}
        bottomItems={bottomItems}
        title="Poke Pocket Market"
        subtitle="The EASIEST way to trade in Pokemon TCG Pocket"
      />
    </div>
  );
};

export default FullCardScrollBanner;