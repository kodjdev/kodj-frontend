import MainCard from "./MainCard/MainCard";
import Statistics from "./Statistics";

// export default function Home() {
//   return (
//     <div >
//       <MainCard />
//       <StatisticsPage />
//       <TimeFrame />
//       <CardHoverEffect />
//     </div>
//   );
// }

/**
 *  Default route - Home Page
 *
 * @description This is the home page of the application.
 *
 *
 */

export default function Home() {
  return (
    <>
      <MainCard />
      <Statistics />
    </>
  );
}
