import { FeaturesSection } from "../../components/ui/bento-grid";
import { CardHoverEffect } from "../../components/HoverCards";
import TimeCountdown from "../../components/TimeFrame";
import StatisticsPage from "../Statistics/Statistics";

export default function Home() {

  return (
    <div>
      <FeaturesSection/>
      <StatisticsPage/>
      <TimeCountdown/>
      <CardHoverEffect/>
    </div>
  );
}
