import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const targetDate = new Date("2025-01-18T01:30:00Z");
const eventName = "Uchrashuv N5";

function formatTime(value: number) {
  return value < 10 ? `0${value}` : value.toString();
}

export default function TimeCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const {t} = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full sm:max-w-[1440px] pt-4 sm:pt-8 pb-4 sm:pb-8 px-4 sm:px-8 mt-4 sm:mt-[30px] mb-4 sm:mb-[30px] rounded-[8px] border border-[#505050] bg-[#141414]">
      <div className="flex w-full flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* //chap tomon */}
        <div className="flex flex-col items-start gap-[10px] w-full sm:w-[486px] flex-shrink-0 whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22ZM11.5 15V17H13.5V15H11.5ZM11.5 7V13H13.5V7H11.5Z"
                  fill="#FF0202"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-inter text-[18px] leading-none">
              {/* Hurry up, time is going! */}
              {t("timerPage.headingTitle")}
            </p>
          </div>
          {/* // time left untl next */}
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-white font-bold text-[20px] sm:text-[28px] leading-none">
              {/* Time left */}
              {t("timerPage.timeLeft")}
            </p>
            <p className="text-gray-500 font-bold text-[20px] sm:text-[28px] leading-none mx-2">
              {/* until next */}
              {t("timerPage.untilNext")}
            </p>
            <p className="text-gray-500 font-bold text-[20px] sm:text-[28px] leading-none">
            {eventName}
            </p>
          </div>
        </div>

        {/* // ong tomon time displaye */}
        <div className="flex items-center gap-2 sm:gap-[10px] flex-wrap justify-center">
          <div className="text-center">
            <p className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0">
              {formatTime(timeLeft.days)}
            </p>
            <p className="text-[#6B7380] font-inter text-[16px] font-extrabold uppercase m-0">
              {/* Days */}
              {t("timerPage.days")}
            </p>
          </div>
          <span className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0 hidden sm:inline-block">
            ·
          </span>
          <div className="text-center">
            <p className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0">
              {formatTime(timeLeft.hours)}
            </p>
            <p className="text-[#6B7380] font-inter text-[16px] font-extrabold uppercase m-0">
              {/* Hours */}
              {t("timerPage.hours")}
            </p>
          </div>
          <span className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0 hidden sm:inline-block">
            ·
          </span>
          <div className="text-center">
            <p className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0">
              {formatTime(timeLeft.minutes)}
            </p>
            <p className="text-[#6B7380] font-inter text-[16px] font-semibold uppercase tracking-[0.48px] m-0">
              {/* Minutes */}
              {t("timerPage.minutes")}
            </p>
          </div>
          <span className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0 hidden sm:inline-block">
            ·
          </span>
          <div className="text-center">
            <p className="text-white font-inter text-[40px] sm:text-[70px] font-normal uppercase tracking-[0.5px] m-0">
              {formatTime(timeLeft.seconds)}
            </p>
            <p className="text-[#6B7380] font-inter text-[16px] font-light uppercase tracking-[0.48px] m-0">
              {/* Seconds */}
              {t("timerPage.seconds")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
