import EventBenefits from "./EventBenefits";
import Statistics from "./Statistics";
import CommunityCard from "./CommunityCard/CommunityCard";
import TimeFrame from "./TimeFrame";

/**
 *  Default route - Home Page Root File
 *  where we will build up the all sub components
 *
 * @description This is the home page of the application.
 */

export default function Home() {
  return (
    <>
      <CommunityCard />
      <Statistics />
      <EventBenefits />
      <TimeFrame />
      {/* <CardHoverEffect /> */}
    </>
  );
}
