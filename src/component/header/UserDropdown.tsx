import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {user?.name || "User"}
        </span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        {/* User Info */}
        <div className="mb-2">
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.name || "User"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email || "user@example.com"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            Role: {user?.role || "Unknown"}
          </span>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-1 mt-2">
          <li>
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                navigate("/trainer/profile");
              }}
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg
                className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.3 3.5 3.5 7.3 3.5 12c0 2.15.8 4.12 2.12 5.62.55-2.3 2.62-4.02 5.1-4.02h2.55c2.48 0 4.55 1.72 5.1 4.02A8.48 8.48 0 0020.5 12c0-4.7-3.8-8.5-8.5-8.5Zm0 17c-1.88 0-3.62-.61-5.02-1.64V18.8c0-2.07 1.68-3.75 3.75-3.75h2.55c2.07 0 3.75 1.68 3.75 3.75v.06A8.5 8.5 0 0112 20.5Zm0-13.25c-1.11 0-2.02.91-2.02 2.02 0 1.12.91 2.02 2.02 2.02s2.02-.9 2.02-2.02c0-1.11-.9-2.02-2.02-2.02Z"
                  fill=""
                />
              </svg>
              Edit Profile
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg
                className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5 3.5h3c.4 0 .75.35.75.75 0 1.72 1.86 2.8 3.34 1.94.35-.2.8-.1 1 .26l1.5 2.63c.2.35.1.8-.26 1a2.5 2.5 0 000 4.34c.35.2.46.65.26 1l-1.5 2.63c-.2.35-.65.46-1 .26-1.48-.86-3.34.22-3.34 1.94 0 .4-.35.75-.75.75h-3a.75.75 0 01-.75-.75c0-1.72-1.86-2.8-3.34-1.94-.35.2-.8.1-1-.26l-1.5-2.63a.75.75 0 01.26-1 2.5 2.5 0 000-4.34.75.75 0 01-.26-1l1.5-2.63c.2-.35.65-.46 1-.26 1.48.86 3.34-.22 3.34-1.94 0-.4.35-.75.75-.75Z"
                  fill=""
                />
              </svg>
              Account Settings
            </DropdownItem>
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 w-full text-left"
        >
          <svg
            className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1 19.25c-.41 0-.75-.34-.75-.75v-4.25h-1.5V18.5c0 1.24 1 2.25 2.25 2.25h3.4c1.25 0 2.25-1 2.25-2.25V5.5c0-1.25-1-2.25-2.25-2.25h-3.4c-1.25 0-2.25 1-2.25 2.25v4.25h1.5V5.5c0-.41.34-.75.75-.75h3.4c.42 0 .75.34.75.75v12.99c0 .41-.33.75-.75.75h-3.4ZM3.25 12c0 .22.09.41.24.55l4.6 4.61a.75.75 0 001.06-1.06L6.31 12.75h9.69c.42 0 .75-.34.75-.75s-.33-.75-.75-.75H6.31l2.84-2.84a.75.75 0 10-1.06-1.06l-4.6 4.61c-.15.14-.24.33-.24.54Z"
              fill=""
            />
          </svg>
          Sign Out
        </button>
      </Dropdown>
    </div>
  );
}
