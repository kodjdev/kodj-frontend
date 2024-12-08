import { FeaturesSection } from "../../components/ui/bento-grid";
import { CardHoverEffect } from "../../components/HoverCards";
import TimeCountdown from "../../components/TimeFrame";

export default function Home() {

  return (
    <div>
      <FeaturesSection/>
      <TimeCountdown/>
      <CardHoverEffect/>
    </div>
  );
}
