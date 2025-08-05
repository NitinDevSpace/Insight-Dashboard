"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function UsersPage() {
	const [usersData, setUsersData] = useState([]);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
	  async function fetchUsers() {
	    setLoading(true);
	    try {
	      const res = await fetch("https://randomuser.me/api/?results=1100");
	      const data = await res.json();
	      const formatted = data.results.map((user, idx) => ({
	        id: idx,
	        name: `${user.name.first} ${user.name.last}`,
	        email: user.email,
	        joined: new Date(user.registered.date).toISOString().split("T")[0],
	        status: Math.random() > 0.5 ? "active" : "inactive",
	      }));
	      setUsersData(formatted);
	    } catch (err) {
	      console.error("Failed to fetch users:", err);
	    } finally {
	      setLoading(false);
	    }
	  }

	  fetchUsers();
	}, []);

	const rowsPerPage = 20;
	const filtered = usersData
		.filter(
			(u) =>
				u.name.toLowerCase().includes(search.toLowerCase()) ||
				u.email.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

	const paginated = filtered.slice(
		(currentPage - 1) * rowsPerPage,
		currentPage * rowsPerPage
	);

	function exportToCSV() {
		const csv = Papa.unparse(filtered);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "users.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function exportToPDF() {
		const doc = new jsPDF();

		autoTable(doc, {
			startY: 20,
			head: [["Name", "Email", "Joined", "Status"]],
			body: filtered.map((u) => [u.name, u.email, u.joined, u.status]),
		});

		doc.text("Users Report", 14, 16);
		doc.save("users.pdf");
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Users</h1>

			<input
				type="text"
				placeholder="Search by name or email..."
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					setCurrentPage(1);
				}}
				className="border border-black/20 dark:border-gray-600 px-3 py-2 rounded-md mb-4 w-full max-w-sm"
			/>

			<div className="flex gap-4 mb-4">
				<button
					onClick={exportToCSV}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Export CSV
				</button>
				<button
					onClick={exportToPDF}
					className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
				>
					Export PDF
				</button>
			</div>

			<table className="w-full border text-sm border-gray-200 dark:border-gray-700">
				<thead className="bg-gray-200 dark:bg-gray-600 dark:text-white">
					<tr>
						{["name", "email", "joined", "status"].map((col) => (
							<th
								key={col}
								onClick={() => setSortBy(col)}
								className={`px-4 py-2 text-left cursor-pointer hover:underline text-sm truncate ${
									col === "joined" ? "hidden sm:table-cell" : ""
								}`}
							>
								{col.charAt(0).toUpperCase() + col.slice(1)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{loading
						? Array.from({ length: 5 }).map((_, i) => (
								<tr key={i} className="border-t animate-pulse">
									<td className="px-4 py-2 text-sm truncate">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
									</td>
									<td className="px-4 py-2 text-sm truncate">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
									</td>
									<td className="px-4 py-2 text-sm truncate hidden sm:table-cell">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
									</td>
									<td className="px-4 py-2 text-sm truncate">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
									</td>
								</tr>
						  ))
						: paginated.map((user) => (
								<tr
									key={user.id}
									className="border-t  border-black/20 dark:border-gray-600 text-gray-900 bg-white hover:bg-gray-300 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-600 transition"
								>
									<td className="px-4 py-2 border-gray-200 dark:border-gray-700 text-sm truncate max-w-[100px] sm:max-w-[150px]">
										{user.name}
									</td>
									<td className="px-4 py-2 border-gray-200 dark:border-gray-700 text-sm truncate max-w-[100px] sm:max-w-[150px]">
										{user.email}
									</td>
									<td className="px-4 py-2 border-gray-200 dark:border-gray-700 text-sm truncate max-w-[100px] sm:max-w-[150px] hidden sm:table-cell">
										{user.joined}
									</td>
									<td className="px-4 py-2 border-gray-200 dark:border-gray-700 text-sm truncate max-w-[100px] sm:max-w-[150px]">
										{user.status}
									</td>
								</tr>
						  ))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="mt-4 flex justify-between items-center">
				<button
					onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
					className="px-3 py-1 border rounded disabled:opacity-50"
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<p>
					Page {currentPage} of {Math.ceil(filtered.length / rowsPerPage)}
				</p>
				<button
					onClick={() =>
						setCurrentPage((p) =>
							Math.min(p + 1, Math.ceil(filtered.length / rowsPerPage))
						)
					}
					className="px-3 py-1 border rounded disabled:opacity-50"
					disabled={currentPage >= Math.ceil(filtered.length / rowsPerPage)}
				>
					Next
				</button>
			</div>
		</div>
	);
}
