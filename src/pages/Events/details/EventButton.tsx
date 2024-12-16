import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaAlignCenter, FaArrowUpRightFromSquare } from "react-icons/fa6";
import LoginConfirmModal from "../../../components/LoginConfirmModal";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../../context/useAuth";

interface EventButtonProps {
  type: "upcoming" | "past";
  id?: string;
  title?: string;
  date?: Timestamp;
  author?: string;
  imageUrl?: string;
  eventRoom?: string;
  location?: string;
  isFull: boolean;
}

export default function EventButton({
  type,
  id,
  title,
  date,
  author,
  imageUrl,
  eventRoom,
  location,
  isFull,
}: EventButtonProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const handleRegisterClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user) {
      messageApi.error("Please login first to register for the event.");
      setTimeout(() => {
        setShowLoginModal(true);
      }, 1000);
      return;
    }

    if (isFull) {
      messageApi.error("Event registration is closed.");
      return;
    }

    // agar usr lgin qilgan bo'lsa navigationga process qilamiz
    navigate(`/events/upcoming/details/${id}/register`, {
      state: {
        title,
        date,
        location,
        imageUrl,
        author,
        eventRoom,
      },
    });
  };

  return (
    <>
      {contextHolder}
      {type === "upcoming" ? (
        <Link
          to={`/events/upcoming/details/${id}/register`}
          onClick={handleRegisterClick}
        >
          {isFull ? (
            <>
              <button
                className="mt-5 flex w-full sm:w-[322px] h-14 sm:h-[56px] p-[3px] sm:p-[20px_30px] justify-center items-center gap-2 flex-shrink-0 bg-gray-600"
                // disabled={isFull}
              >
                <FaAlignCenter className="flex-none text-xs" />
                <span>Registration Closed</span>
              </button>
            </>
          ) : (
            <>
              <button className="mt-5 flex w-full sm:w-[322px] h-14 sm:h-[56px] p-[3px] sm:p-[20px_30px] hover:bg-gray-600 justify-center items-center gap-2 flex-shrink-0 bg-blue-600">
                <FaArrowUpRightFromSquare className="flex-none text-xs" />
                <span>Register</span>
              </button>
              {/* // faqatgina full bo'magan holatda popup modalni ochib login qiladi */}
              <LoginConfirmModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onConfirm={() => {
                  setShowLoginModal(false);
                  navigate("/login", {
                    state: {
                      returnUrl: `/events/upcoming/details/${id}/register`,
                      eventDetails: {
                        id,
                        title,
                        date,
                        location,
                        imageUrl,
                        author,
                        eventRoom,
                      },
                    },
                  });
                }}
              />
            </>
          )}
        </Link>
      ) : (
        <button className="mt-5 flex w-full sm:w-[322px] h-14 sm:h-[56px] p-[3px] sm:p-[20px_30px] justify-center items-center gap-2 flex-shrink-0 bg-gray-600">
          <FaAlignCenter className="flex-none text-xs" />
          <span>Event has ended</span>
        </button>
      )}
    </>
  );
}
