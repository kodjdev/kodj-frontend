// import { useEffect, useState } from "react";
// import Statistics from "../../components/Statistics";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";
// import { useTranslation } from "react-i18next";

// const meetupData = [
//   { date: "12.2022", value: 30 },
//   { date: "02.2023", value: 25 },
//   { date: "10.2024", value: 35 },
//   { date: "12.2024", value: 40 },
// ];

// export default function StatisticsPage() {
//   const [userCount, setUserCount] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);

//   const { t } = useTranslation();

//   useEffect(() => {
//     // Listen to real-time updates from stats document
//     const unsubscribe = onSnapshot(
//       doc(db, "stats", "users"),
//       (doc) => {
//         if (doc.exists()) {
//           setUserCount(doc.data().totalCount);
//         }
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching stats:", error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h2 className="text-4xl font-bold text-white mb-[30px] mt-[90px] ">
//         {t("statisticsPage.statisticsHeader")} <span className="text-gray-500">{t("statisticsPage.statisticsHeaderGray")}</span>
//       </h2>
//       <Statistics
//         speakerCount={16}
//         meetupData={meetupData}
//         currentUsers={userCount}
//         maxUsers={300}
//       />
//     </>
//   );
// }
