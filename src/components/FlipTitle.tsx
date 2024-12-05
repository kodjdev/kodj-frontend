import { FlipWords } from "../../src/components/ui/flip-title";

export function FlipTitle() {
  const words = [" Jamiyati", "Uchrashuvi", "Yangiliklari"];
//   const words = [" Jamiyati.", "Uchrashuvi.", "Yangiliklari", "Xabarlari."];

  return (
    <span className="whitespace-normal sm:whitespace-nowrap">
       Koreya O&apos;zbek Dasturchilar
       <FlipWords words={words}/>
    </span>
  );
}
