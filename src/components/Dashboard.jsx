import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

const mockData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Moderator" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "User" },
    { id: 5, name: "Charlie White", email: "charlie@example.com", role: "User" },
    { id: 6, name: "David Black", email: "david@example.com", role: "Admin" },
    { id: 7, name: "Emma Green", email: "emma@example.com", role: "User" },
    { id: 8, name: "Frank Yellow", email: "frank@example.com", role: "Moderator" },
    { id: 9, name: "Grace Blue", email: "grace@example.com", role: "User" },
    { id: 10, name: "Harry Red", email: "harry@example.com", role: "User" },
];

export const Dashboard= () => {
    const [data, setData] = useState(mockData);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Handle sorting
    const handleSort = (column) => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });

        setData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Handle search filter
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div className="min-h-screen flex mt-10 bg-gradient-to-r from-[#04668D] to-[#1c353f]">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar at the top */}
                <Navbar />

                {/* Page Content */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border rounded-md mb-4"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th
                                        className="p-3 border-b cursor-pointer"
                                        onClick={() => handleSort("id")}
                                    >
                                        ID ⬆️⬇️
                                    </th>
                                    <th
                                        className="p-3 border-b cursor-pointer"
                                        onClick={() => handleSort("name")}
                                    >
                                        Name ⬆️⬇️
                                    </th>
                                    <th
                                        className="p-3 border-b cursor-pointer"
                                        onClick={() => handleSort("email")}
                                    >
                                        Email ⬆️⬇️
                                    </th>
                                    <th
                                        className="p-3 border-b cursor-pointer"
                                        onClick={() => handleSort("role")}
                                    >
                                        Role ⬆️⬇️
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-center">{item.id}</td>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">{item.email}</td>
                                        <td className="p-3">{item.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                        >
                            Previous
                        </button>

                        <span className="text-gray-600">
                            Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
                        </span>

                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    prev < Math.ceil(filteredData.length / rowsPerPage) ? prev + 1 : prev
                                )
                            }
                            disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage >= Math.ceil(filteredData.length / rowsPerPage)
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-600"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
