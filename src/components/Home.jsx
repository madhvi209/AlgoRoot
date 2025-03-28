import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { Dashboard } from './Dashboard';

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser); // Set user state if found in localStorage
            navigate("/dashboard"); // Redirect to dashboard if logged in
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 bg-gradient-to-r from-[#04668D] to-[#1c353f]">
            <div className="min-h-screen flex mt-10">
                {/* Sidebar on the left */}
                <Sidebar />
            </div>
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar at the top */}
                <Navbar />
            </div>
            {/* Page Content */}
            <div className="flex items-center justify-center h-screen mr-20">
                <div className="p-2 ">
                    {user ? (
                        <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1> // Show user name if logged in
                    ) : (
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
                            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
                                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full bg-blue-500 text-white py-2 rounded"
                                >
                                    Go to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
