import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/Picture1.jpg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = () => {
            setUser(JSON.parse(localStorage.getItem("loggedInUser")));
        };

        window.addEventListener("storage", fetchUser);
        fetchUser(); // Initial fetch

        return () => window.removeEventListener("storage", fetchUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const handleDeleteAccount = () => {
        localStorage.removeItem("loggedInUser");
        alert("Account deleted!");
        navigate("/signup");
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50 md:px-12">
            <div className="flex items-center space-x-4">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-10 cursor-pointer"
                    onClick={() => navigate("/")} 
                />
            </div>
            {!user ? (
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
                    >
                        Signup
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="focus:outline-none"
                    >
                        <FaUserCircle size={30} className="cursor-pointer text-gray-700 hover:text-gray-900 transition" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border border-gray-200 z-10">
                            <div className="flex items-center space-x-2 mb-3">
                                <FaUserCircle size={28} className="text-gray-700" />
                                <div>
                                    <p className="font-medium text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Logout
                            </button>
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleDeleteAccount();
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition duration-200"
                            >
                                Delete Account
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
