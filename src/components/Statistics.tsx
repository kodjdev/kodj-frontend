import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatisticsProps } from "../types";
import { FaUserGroup } from "react-icons/fa6";
import { t } from "i18next";

const Statistics = ({
  speakerCount,
  meetupData,
  currentUsers,
  maxUsers,
}: StatisticsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="flex flex-col w-full max-w-full sm:max-w-[1440px] pt-8 sm:pt-8 pb-4 sm:pb-8 px-4 sm:px-8 mt-4 sm:mt-[30px] mb-4 sm:mb-[30px] rounded-[8px] border border-[#505050] bg-[#141414]"
      >
        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 w-full">
          {/* // Meetup Speakers Kartasi  */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 bg-[#1a1a1a] rounded-xl p-6 h-full flex flex-col justify-between"
          >
            
            <h3 className="text-white text-xl mb-4">{t("statisticsPage.statisticsBody.users.title")}</h3>
            <div className="flex-grow flex flex-col items-center justify-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaUserGroup className="text-4xl text-blue-500 lg:mt-[-60px]" />{" "}
                {/* Adjust size and color as needed */}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl font-bold text-white flex items-center"
              >
                {speakerCount}
                <span className="text-3xl ml-2">+</span>
              </motion.div>
            </div>
            <p className="text-gray-400 text-center">{t("statisticsPage.statisticsBody.users.description")}</p>
          </motion.div>
          {/* Meetups Chart Card */}
          {/* <motion.div
          variants={itemVariants}
          className="lg:col-span-6 bg-[#1a1a1a] rounded-xl p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white text-xl">Meetups</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              +12
            </span>
          </div>
          <div className="flex-grow h-[100px] min-h-[100px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={meetupData}>
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div> */}
          {/* // meetups chart kartasi */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 bg-[#1a1a1a] rounded-xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-white text-xl">{t("statisticsPage.statisticsBody.meetups.title")}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                + 4
              </span>
            </div>
            <div className="flex-grow h-[100px] min-h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={meetupData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    stroke="#959393"
                    fontSize={12}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#2a2a2a",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#666" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#fff",
                      stroke: "#3b82f6",
                      strokeWidth: 2,
                    }}
                  />
                  {/* this highlights the last point */}
                  {/* <Line
                  type="monotone"
                  data={[meetupData[meetupData.length - 1]]}
                  dataKey="value"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth={0}
                  dot={{
                    r: 4,
                    fill: "#fff",
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                  }}
                /> */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* User count circle show */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 bg-[#1a1a1a] rounded-xl p-6 h-full flex flex-col justify-between"
          >
            <h3 className="text-white text-xl mb-4">{t("statisticsPage.statisticsBody.registeredUsers.title")}</h3>
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="relative w-34 h-34">
                {/* bacground circle  */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* tashqi light border showing*/}
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.1"
                  />
                  {/* qora background showing */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="8"
                  />
                  {/* progress showing  */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: currentUsers / maxUsers }}
                    transition={{ duration: 1, delay: 0.5 }}
                    strokeDasharray="283"
                  />
                </svg>

                {/* centerlashgan kontent*/}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="text-4xl font-bold text-white"
                  >
                    {currentUsers}
                    <span className="text-3xl ml-1">+</span>
                  </motion.div>
                  <div className="text-gray-500 text-sm">{t("statisticsPage.statisticsBody.registeredUsers.description")}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-grows text-gray-400 text-xs mt-4 ">
            {t("statisticsPage.statisticsBody.planning.title")} {maxUsers} {t("statisticsPage.statisticsBody.planning.description")}
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default Statistics;
