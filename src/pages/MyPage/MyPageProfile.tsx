import { Button } from "@/components/Button/Button";
import { BsFillPersonLinesFill } from "react-icons/bs";

interface MyPageProfileProps {
  user: User | null;
  onLogoutClick: () => void;
  isMobileView?: boolean;
}

export default function MyPageProfile({
  user,
  onLogoutClick,
  isMobileView,
}: MyPageProfileProps) {
  return (
    <div className="w-full rounded-lg p-1">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-700">
            <BsFillPersonLinesFill className="w-1/2 h-1/2 text-gray-300" />
          </div>
          <div className="text-left sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-white truncate max-w-[300px]">
              {user?.displayName || "User"}
            </h1>
            <p className="text-sm text-gray-300 truncate max-w-[300px] mt-1">
              {user?.email ?? "No Email found"}
            </p>
          </div>
        </div>
      </div>
      {isMobileView && (
        <div className="flex justify-end mt-2 sm:mt-o">
          <Button
            size="sm"
            disabled={false}
            color="blue"
            textColor="white"
            fullWidth={false}
            onClick={onLogoutClick}
            className="px-6 py-2 min-w-[100px] bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
