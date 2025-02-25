import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import sevenDuckAlliance from "../assets/images/seven-duck-alliance.png";
import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-200 p-4">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold mr-2">Crypto Hill's</h1>
        <img
          src={sevenDuckAlliance}
          alt="Seven duck alliance"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <ul>
        <li className="rounded-lg">
          <NavLink
            to="/"
            id="navbar-Navlink"
            className="flex items-center p-2 hover:bg-gray-300 mb-4 w-full"
          >
            <MdOutlineSpaceDashboard />
            <span className="ml-2">Dashboard</span>
          </NavLink>
        </li>
        <li className="rounded-lg">
          <NavLink
            to="/profile"
            id="navbar-Navlink"
            className="flex items-center p-2 hover:bg-gray-300 w-full"
          >
            <FaRegUser />
            <span className="ml-2">Profile</span>
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto">
        <NavLink
          to="/"
          id="navbar-logout"
          className="flex items-center p-2 hover:bg-gray-300 w-full rounded-lg"
        >
          <BiLogOut />
          <span className="ml-2">Log Out</span>
        </NavLink>
      </div>
    </div>
  );
};
