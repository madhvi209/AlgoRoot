import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect user if already logged in
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            navigate("/"); // Redirect to homepage if already logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        // Get stored users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user exists and credentials are correct
        const validUser = storedUsers.find(
            (user) =>
                user.email.trim().toLowerCase() === email.trim().toLowerCase() && // case-insensitive check for email
                user.password === password // compare password directly (plaintext)
        );

        if (!validUser) {
            setError("Invalid credentials. Please try again.");
            return;
        }

        // Store logged-in user session
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        setError(""); // Clear error message on successful login
        navigate("/dashboard"); // Redirect without page reload
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            <Navbar/>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gradient-to-r from-[#04668D] to-[#1c353f]">
                <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800">Login to Your Account</h2>

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04668D] transition-all"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04668D] transition-all"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#04668D] text-white py-3 rounded-lg font-semibold hover:bg-[#1c353f] transition duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-[#04668D] font-semibold hover:underline cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
