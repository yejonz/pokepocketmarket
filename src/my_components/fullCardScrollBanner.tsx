'use client'

import { useState, useEffect } from 'react';
import { CardScrollBanner } from "./cardScrollBanner";
import ImageFromStorageFade from './imageFromStorageFade';

const FullCardScrollBanner = () => {
  const [topItems, setTopItems] = useState<Array<{ id: number; content: JSX.Element }>>([]);
  const [bottomItems, setBottomItems] = useState<Array<{ id: number; content: JSX.Element }>>([]);

  useEffect(() => {
    const getRandomNumberString = (range: number) => {
      const number = Math.floor(Math.random() * range) + 1;
      return String(number).padStart(3, '0');
    };

    const generateItems = (count: number) => {
      return Array.from({ length: count }, (_, index) => {
        const fileName = `A1_${getRandomNumberString(286)}`;
        return {
          id: index + 1,
          content: (
            <ImageFromStorageFade fileName={fileName} />
          ),
        };
      });
    };

    setTopItems(generateItems(20));
    setBottomItems(generateItems(20));
  }, []);

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