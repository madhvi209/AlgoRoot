import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-lg font-bold mt-20">Dashboard</h2>
      <ul className="mt-4 space-y-2">
        {/* Home Link */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-2 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-600'}`
            }
          >
            Home
          </NavLink>
        </li>

        {/* Login Link */}
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block p-2 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-600'}`
            }
          >
            Login
          </NavLink>
        </li>

        {/* Signup Link */}
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `block p-2 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-600'}`
            }
          >
            Signup
          </NavLink>
        </li>

        {/* Details Link */}
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block p-2 rounded-md ${isActive ? 'bg-blue-700' : 'hover:bg-blue-600'}`
            }
          >
            Details
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
