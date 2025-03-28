import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Reset error state
        setError("");

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        // Check password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const userExists = existingUsers.some(user => user.email === email);
        if (userExists) {
            setError("User already exists. Please login.");
            return;
        }

        // Hash password (not a perfect solution, ideally should hash server-side)
        // For now, storing plaintext is risky, use bcrypt or another hashing method in production
        const newUser = { email, password };

        // Save user data in localStorage
        localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

        alert("Signup successful! Please login.");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            <Navbar/>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100 overflow-auto bg-gradient-to-r mt-9 from-[#04668D] to-[#1c353f]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <form onSubmit={handleSignup} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04668D]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04668D]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#04668D] text-white py-3 rounded-lg font-semibold hover:bg-[#1c353f] transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-[#04668D] font-semibold hover:underline cursor-pointer"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
