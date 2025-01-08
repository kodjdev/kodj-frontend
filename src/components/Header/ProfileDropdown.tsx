import React from "react"
import { Link } from "react-router-dom"
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi"
import { User } from "firebase/auth"

type ProfileDropdownProps = {
  user: User | null
  onLogoutClick: () => void
  dropdownRef: React.RefObject<HTMLDivElement>
}

export function ProfileDropdown({
  user,
  onLogoutClick,
  dropdownRef,
}: ProfileDropdownProps) {
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div className="p-4">
        <div className="text-sm text-gray-300 border-b border-gray-700 pb-3">
          Signed in as
          <br />
          <span className="font-medium text-white">{user?.email}</span>
        </div>

        <div className="py-2 mb-5">
          <Link
            to="/mypage"
            className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <FiUser className="mr-3" />
            My Page
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <FiSettings className="mr-3" />
            Profile Settings
          </Link>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <button
            onClick={onLogoutClick}
            className="flex w-full items-center px-3 py-2 text-sm bg-transparent hover:bg-gray-700 hover:text-white rounded-md"
          >
            <FiLogOut className="mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
