"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "Organic", value: 400 },
	{ name: "Paid Ads", value: 300 },
	{ name: "Referral", value: 300 },
	{ name: "Social", value: 200 },
];

const COLORS = ["#6366f1", "#ec4899", "#22c55e", "#f59e0b"];

export default function DonutChartCard() {
	return (
		<div className="bg-white rounded-xl p-6 shadow-sm w-full">
			<h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
			<ResponsiveContainer width="100%" height={250}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={90}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
