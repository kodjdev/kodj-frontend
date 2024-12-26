import Statistics from "../../components/Statistics";

export default function StatisticsPage() {
  const meetupData = [
    { date: "12.2022", value: 30 },
    { date: "02.2023", value: 25 },
    { date: "10.2024", value: 35 },
    { date: "12.2024", value: 40 },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-white mt-10">
        Statistics <span className="text-gray-500">of KO'DJ</span>
      </h1>
      <Statistics
        speakerCount={16}
        meetupData={meetupData}
        currentUsers={60}
        maxUsers={300}
      />
    </>
  );
}
