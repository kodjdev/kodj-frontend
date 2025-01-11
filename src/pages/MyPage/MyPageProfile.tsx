import { BsFillPersonLinesFill } from "react-icons/bs";

interface MyPageProfileProps {
  user: any; //  user: User | null
  onLogoutClick: () => void;
}

export default function MyPageProfile({
  user,
  onLogoutClick,
}: MyPageProfileProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-700">
          <BsFillPersonLinesFill className="text-3xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {user?.displayName || "User"}
          </h1>
          <p className="text-gray-400">{user?.email ?? "No Email found"}</p>
        </div>
      </div>
      <div>
        <button
          onClick={onLogoutClick}
          className="flex w-full items-center px-3 py-2 text-sm bg-transparent hover:bg-gray-700 hover:text-white rounded-full"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
