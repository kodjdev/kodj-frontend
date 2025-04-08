import { CardHoverEffect } from "../../components/HoverCards";
import StatisticsPage from "./Statistics";
import { MainCard } from "./MainCard/MainCard";
import TimeFrame from "./TimeFrame";

export default function Home() {
  return (
    <div >
      <MainCard />
      <StatisticsPage />
      <TimeFrame />
      <CardHoverEffect />
    </div>
  );
}
