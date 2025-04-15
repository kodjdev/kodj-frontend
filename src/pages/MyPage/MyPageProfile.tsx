import { BsFillPersonLinesFill, BsPerson } from "react-icons/bs";
import { User } from "firebase/auth";
import { CustomUserProps } from "@/types/auth";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

export type MyPageProfileProps = {
  user: User | CustomUserProps | null;
  onLogoutClick?: () => void;
  isMobileView?: boolean;
  createdAt?: Date;
};

export default function MyPageProfile({
  user,
  isMobileView,
  createdAt,
}: MyPageProfileProps) {
  return (
    <div className="w-full rounded-lg p-1">
      <div className="flex flex-row sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-row sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-700">
            <BsFillPersonLinesFill className="w-1/2 h-1/2 text-gray-300" />
          </div>
          <div className="text-left sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-white truncate max-w-[300px]">
              {user?.displayName || "User"}
            </h1>
            <p className="text-sm text-gray-300 truncate max-w-[300px] mt-1">
              <MdOutlineMailOutline className=" inline-block w-4 h-4 text-gray-300 mr-2" />
              {user?.email ?? "No Email found"}
            </p>
            <p className="text-sm text-gray-300 truncate max-w-[300px] mt-1">
              <BsPerson className="inline-block w-4 h-4 text-gray-300 mr-2" />
              KO'DJ joined:{" "}
              {createdAt ? createdAt.toLocaleDateString() : "2024"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8">
        <div className="flex flex-col justify-start sm:mt-0 sm:justify-center gap-2">
          <Link
            to="/mypage/editProfile"
            className="text-sm sm:text-md text-white text-left hover:text-gray-400"
          >
            {/* <FaUserPen className="inline-block w-4 h-4 text-gray-300" /> */}
            Edit Profile
          </Link>
          {/* <Link
              to="/settings"
              className="text-sm sm:text-md text-white text-left hover:text-gray-400 "
            >
              <FaGear className="inline-block w-4 h-4 text-gray-300" />
              Settings
            </Link> */}
        </div>
      </div>
      {isMobileView && (
        <>
          {/* // if there is need to update or add a button only available to mobile view, we add */}
        </>
      )}
    </div>
  );
}
