"use client";

import { useState, useEffect } from "react";
import usersData from "@/lib/mockUsers";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function UsersPage() {
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
	  const timeout = setTimeout(() => setLoading(false), 1200);
	  return () => clearTimeout(timeout);
	}, []);

	const rowsPerPage = 5;
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
				className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-full max-w-sm"
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

			<table className="w-full border text-sm">
				<thead className="bg-gray-100">
					<tr>
						{["name", "email", "joined", "status"].map((col) => (
							<th
								key={col}
								onClick={() => setSortBy(col)}
								className="px-4 py-2 text-left cursor-pointer hover:underline"
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
				          <td className="px-4 py-2">
				            <div className="h-4 bg-gray-200 rounded w-3/4" />
				          </td>
				          <td className="px-4 py-2">
				            <div className="h-4 bg-gray-200 rounded w-2/3" />
				          </td>
				          <td className="px-4 py-2">
				            <div className="h-4 bg-gray-200 rounded w-1/2" />
				          </td>
				          <td className="px-4 py-2">
				            <div className="h-4 bg-gray-200 rounded w-1/3" />
				          </td>
				        </tr>
				      ))
				    : paginated.map((user) => (
				        <tr key={user.id} className="border-t hover:bg-gray-50 transition">
				          <td className="px-4 py-2">{user.name}</td>
				          <td className="px-4 py-2">{user.email}</td>
				          <td className="px-4 py-2">{user.joined}</td>
				          <td className="px-4 py-2">{user.status}</td>
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
