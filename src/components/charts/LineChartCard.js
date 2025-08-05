"use client";

import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const initialData = [
	{ month: "Jan", revenue: 4000 },
	{ month: "Feb", revenue: 3000 },
	{ month: "Mar", revenue: 5000 },
	{ month: "Apr", revenue: 4780 },
	{ month: "May", revenue: 5890 },
	{ month: "Jun", revenue: 6390 },
];

export default function LineChartCard() {
	const [data, setData] = useState(initialData);

	useEffect(() => {
		const interval = setInterval(() => {
			setData((prev) =>
				prev.map((point) => ({
					...point,
					revenue: Math.max(
						1000,
						point.revenue + Math.floor(Math.random() * 500 - 250)
					),
				}))
			);
		}, 3000); // update every 3 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-white border border-black/20 dark:border-gray-600 dark:bg-gray-900 text-black dark:text-white rounded-xl p-6 shadow-md w-full transition-colors">
			<h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
			<ResponsiveContainer width="100%" height={250}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="revenue"
						stroke="#3b82f6"
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
