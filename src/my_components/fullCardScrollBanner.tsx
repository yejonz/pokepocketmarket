import ImageFromStorage from "../../firebase/imageFromStorage";
import { CardScrollBanner } from "./cardScrollBanner";

const getRandomNumberString = (range: number) => {
  const number = Math.floor(Math.random() * range) + 1;
  return String(number).padStart(3, '0');
};

export default function FullCardScrollBanner() {
    const topFileNames = []
    const bottomFileNames = []

    for (let i = 0; i < 20; i++) {
      const fileName = `A1_${getRandomNumberString(286)}`;
      topFileNames.push(fileName);
    }
    
    for (let i = 0; i < 20; i++) {
      const fileName = `A1_${getRandomNumberString(286)}`;
      bottomFileNames.push(fileName);
    }
    
    const topItems = topFileNames.map((fileName, index) => ({
      id: index + 1,
      content: (
        <div className="flex flex-col items-center w-[264px]">
          <ImageFromStorage fileName={fileName} />
        </div>
      ),
    }));
    
    const bottomItems = bottomFileNames.map((fileName, index) => ({
      id: index + 1,
      content: (
        <div className="flex flex-col items-center w-[264px]">
          <ImageFromStorage fileName={fileName} />
        </div>
      ),
    }));

    return (
        <div className="w-full">
        <CardScrollBanner topItems={topItems} bottomItems={bottomItems}
        title="Poke Pocket Market" subtitle="The EASIEST way to trade in Pokemon TCG Pocket"/>
        </div>
    )
}