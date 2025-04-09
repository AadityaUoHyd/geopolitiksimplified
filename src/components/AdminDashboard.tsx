import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
    const [barStats, setBarStats] = useState<{ [key: string]: number }>({});
    const [pieStats, setPieStats] = useState<{ [page: string]: number }>({});
    const [visitLogs, setVisitLogs] = useState([]);
    const [groupBy, setGroupBy] = useState("day");
    const [selectedDate, setSelectedDate] = useState("");
    const [uniqueCount, setUniqueCount] = useState(0);


    const baseURL =
        import.meta.env.MODE === "development"
            ? "/api/v1"
            : import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`${baseURL}/visitors/unique/count`, { headers })
            .then((res) => res.json())
            .then((data) => setUniqueCount(data.count))
            .catch((err) => console.error("Error fetching unique visitor count:", err));


        fetch(
            `${baseURL}/visitors/stats?groupBy=${groupBy}${selectedDate ? `&date=${selectedDate}` : ""
            }`,
            { headers }
        )
            .then((res) => res.json())
            .then((data) => setBarStats(data))
            .catch((err) => console.error("Error fetching barStats:", err));

        fetch(`${baseURL}/visitors/pie`, { headers })
            .then((res) => res.json())
            .then((data) => setPieStats(data))
            .catch((err) => console.error("Error fetching pieStats:", err));

        fetch(`${baseURL}/visitors/all`, { headers })
            .then((res) => res.json())
            .then((data) => setVisitLogs(data))
            .catch((err) => console.error("Error fetching visitLogs:", err));
    }, [groupBy, selectedDate]);

    const barData = {
        labels: Object.keys(barStats),
        datasets: [
            {
                label: `Visitors per ${groupBy}`,
                data: Object.values(barStats),
                backgroundColor: "rgba(99, 102, 241, 0.6)",
            },
        ],
    };

    const pieData = {
        labels: Object.keys(pieStats),
        datasets: [
            {
                label: "Visits by Page",
                data: Object.values(pieStats),
                backgroundColor: [
                    "#3b82f6",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444",
                    "#8b5cf6",
                ],
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-10">
            <div className="min-h-screen bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    📈 Admin Dashboard
                </h2>
                <div className="mb-6 text-lg font-medium text-gray-800">
                    🧍‍♂️ Total Unique Visitors Till Date : <span className="text-blue-600 font-bold">{uniqueCount}</span>
                </div>


                {/* Filters */}
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                    {["day", "month"].map((period) => (
                        <button
                            key={period}
                            className={`px-4 py-2 rounded-md transition ${groupBy === period
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            onClick={() => setGroupBy(period)}
                        >
                            Group by {period}
                        </button>
                    ))}

                    <input
                        type="date"
                        className="border px-3 py-2 rounded-md shadow-sm"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-700">
                            📊 Visitors Overview
                        </h3>
                        <Bar data={barData} />
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold mb-3 text-gray-700">
                            🥧 Visits by Page
                        </h3>
                        <div className="w-64 h-64">
                            <Pie data={pieData} />
                        </div>
                    </div>


                </div>

                {/* Table */}
                <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-5 text-gray-700">
                        🧾 Last 10 Recent Visits (Past Month)
                    </h3>
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="table-auto w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">IP Address</th>
                                    <th className="border px-4 py-2">Page</th>
                                    <th className="border px-4 py-2">Visited At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitLogs.slice(0, 10).map((visit: any, index) => (
                                    <tr key={visit.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{visit.ipAddress}</td>
                                        <td className="border px-4 py-2">{visit.pageVisited}</td>
                                        <td className="border px-4 py-2">
                                            {new Date(visit.visitTime).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
