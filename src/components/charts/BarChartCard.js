"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "Jan", users: 800 },
	{ name: "Feb", users: 1200 },
	{ name: "Mar", users: 900 },
	{ name: "Apr", users: 1600 },
	{ name: "May", users: 1800 },
	{ name: "Jun", users: 2100 },
];

export default function BarChartCard() {
	return (
		<div className="bg-white border border-black/20 dark:border-gray-600 dark:bg-gray-800 text-black dark:text-white rounded-xl p-6 shadow-md w-full transition-colors">
			<h2 className="text-lg font-semibold mb-4">Monthly Active Users</h2>
			<ResponsiveContainer width="100%" height={250}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="users" fill="#10b981" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
