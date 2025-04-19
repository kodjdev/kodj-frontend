import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUserGroup } from "react-icons/fa6";
import themeColors from "@/tools/themeColors";

type MeetupDataItem = {
  date: string;
  value: number;
};

// type StatisticsProps  = {
//   speakerCount: number;
//   meetupData: MeetupDataItem[];
//   currentUsers: number;
//   maxUsers: number;
// }

// Styled components for StatisticsPage
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Spinner = styled.div`
  animation: spin 1s linear infinite;
  border-radius: 9999px;
  height: 2rem;
  width: 2rem;
  border-bottom-width: 2px;
  border-color: white;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Header = styled.h2`
  font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
  font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
  color: white;
  margin-top: 10px;
  margin-bottom: -0.5rem;
`;

const GrayText = styled.span`
  color: ${themeColors.colors.gray.main};
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: ${themeColors.breakpoints.laptop || "1140px"};
  padding: 5rem 1rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid ${themeColors.cardBorder.color};
  background-color: ${themeColors.colors.gray.dark};
  overflow: hidden;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const CardBase = styled(motion.div)`
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SpeakersCard = styled(CardBase)`
  @media (min-width: 1024px) {
    grid-column: span 3;
  }
`;

const MeetupsCard = styled(CardBase)`
  @media (min-width: 1024px) {
    grid-column: span 6;
  }
`;

const UsersCard = styled(CardBase)`
  @media (min-width: 1024px) {
    grid-column: span 3;
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const IconWrapper = styled(motion.div)`
  font-size: 2.5rem;
  color: ${themeColors.colors.primary.main};

  @media (min-width: 1024px) {
    margin-top: -60px;
  }
`;

const CountText = styled(motion.div)`
  font-size: 3.75rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
`;

const PlusSign = styled.span`
  font-size: 1.875rem;
  margin-left: 0.5rem;
`;

const CardDescription = styled.p`
  color: ${themeColors.colors.gray.main};
  text-align: center;
`;

const ChartBadge = styled.span`
  background-color: ${themeColors.colors.primary.main};
  color: ${themeColors.colors.neutral.white};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  flex-grow: 1;
  height: 100px;
  min-height: 100px;
  width: 100%;
`;

const UsersFooter = styled.div`
  display: flex;
  color: ${themeColors.colors.gray.main};
  font-size: 0.75rem;
  margin-top: 1rem;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 8.5rem;
  height: 8.5rem;
`;

const CircleText = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CircleCount = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
`;

const CircleDescription = styled.div`
  color: ${themeColors.colors.gray.main};
  font-size: 0.875rem;
`;

const RotatedSVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const meetupData: MeetupDataItem[] = [
  { date: "12.2022", value: 30 },
  { date: "02.2023", value: 25 },
  { date: "10.2024", value: 35 },
  { date: "12.2024", value: 40 },
];

/**
 * Combined Statistics Page Component
 *
 * @returns Complete statistics page with all metrics
 *
 */

export default function Statistics() {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useTranslation("home");

  useEffect(() => {
    // firebase orqali real-timeda update qilib turadi user countni
    const unsubscribe = onSnapshot(
      doc(db, "stats", "users"),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserCount(docSnapshot.data().totalCount);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        {t("statisticsPage.statisticsHeader")}{" "}
        <GrayText>{t("statisticsPage.statisticsHeaderGray")}</GrayText>
      </Header>

      <StatsContainer
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <GridContainer>
          {/* speakerslarni kartasi */}
          <SpeakersCard variants={itemVariants}>
            <CardTitle>
              {t("statisticsPage.statisticsBody.users.title")}
            </CardTitle>
            <CardContent>
              <IconWrapper
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaUserGroup />
              </IconWrapper>
              <CountText
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                16<PlusSign>+</PlusSign>
              </CountText>
            </CardContent>
            <CardDescription>
              {t("statisticsPage.statisticsBody.users.description")}
            </CardDescription>
          </SpeakersCard>

          {/* Meetuplarni kartasi */}
          <MeetupsCard variants={itemVariants}>
            <ChartHeader>
              <CardTitle>
                {t("statisticsPage.statisticsBody.meetups.title")}
              </CardTitle>
              <ChartBadge>+ 4</ChartBadge>
            </ChartHeader>
            <ChartContainer>
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
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </MeetupsCard>

          {/* Userlarni circle kartasi */}
          <UsersCard variants={itemVariants}>
            <CardTitle>
              {t("statisticsPage.statisticsBody.registeredUsers.title")}
            </CardTitle>
            <CardContent>
              <CircleContainer>
                <RotatedSVG viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    opacity="0.1"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: userCount / 300 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    strokeDasharray="283"
                  />
                </RotatedSVG>
                <CircleText
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <CircleCount>
                    {userCount}
                    <PlusSign>+</PlusSign>
                  </CircleCount>
                  <CircleDescription>
                    {t(
                      "statisticsPage.statisticsBody.registeredUsers.description"
                    )}
                  </CircleDescription>
                </CircleText>
              </CircleContainer>
            </CardContent>
            <UsersFooter>
              {t("statisticsPage.statisticsBody.planning.title")} 300{" "}
              {t("statisticsPage.statisticsBody.planning.description")}
            </UsersFooter>
          </UsersCard>
        </GridContainer>
      </StatsContainer>
    </Container>
  );
}
