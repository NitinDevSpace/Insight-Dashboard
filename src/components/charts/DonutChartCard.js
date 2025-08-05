"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "Organic", value: 400 },
	{ name: "Paid Ads", value: 300 },
	{ name: "Referral", value: 300 },
	{ name: "Social", value: 200 },
];

// Example change data for each traffic source (positive, negative, neutral)
const changeData = [5, -2, 0, 3];

const COLORS = ["#6366f1", "#ec4899", "#22c55e", "#f59e0b"];

export default function DonutChartCard() {
	return (
		<div className="bg-white border border-black/20 dark:border-gray-600 dark:bg-gray-800 text-black dark:text-white rounded-xl p-6 shadow-md w-full transition-colors">
			<h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
			<ResponsiveContainer width="100%" height="90%">
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={60}
						outerRadius={90}
						labelLine={false}
						label={({
							cx,
							cy,
							midAngle,
							innerRadius,
							outerRadius,
							percent,
							index,
						}) => {
							const RADIAN = Math.PI / 180;
							const radius = innerRadius + (outerRadius - innerRadius) * 1.9;
							const x = cx + radius * Math.cos(-midAngle * RADIAN);
							const y = cy + radius * Math.sin(-midAngle * RADIAN);
							const change = changeData[index];
							const arrow = change > 0 ? "↑" : change < 0 ? "↓" : "–";
							const changeColor =
								change > 0 ? "#22c55e" : change < 0 ? "#ef4444" : "#9ca3af";
							return (
								<g>
									<text
										x={x}
										y={y - 7}
										className="text-gray-900  dark:text-white"
										fill="currentColor"
										textAnchor="middle"
										dominantBaseline="central"
										fontSize={12}
									>
										{data[index].name}
									</text>
									<text
										x={x}
										y={y + 14}
										className="text-gray-500 dark:text-gray-300"
										fill="currentColor"
										textAnchor="middle"
										dominantBaseline="central"
										fontSize={11}
									>
										{`${(percent * 100).toFixed(1)}%`}
									</text>
								</g>
							);
						}}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								const index = data.findIndex(
									(item) => item.name === payload[0].name
								);
								const change = changeData[index];
								const arrow = change > 0 ? "↑" : change < 0 ? "↓" : "–";
								const changeColor =
									change > 0
										? "text-green-500"
										: change < 0
										? "text-red-500"
										: "text-gray-500";

								return (
									<div className="rounded-md bg-white dark:bg-gray-800 shadow p-2 text-sm">
										<p className="font-medium">{payload[0].name}</p>
										<p className="text-gray-600 dark:text-gray-300">
											Value: {payload[0].value}
										</p>
										<p className={changeColor}>
											Change: {arrow} {Math.abs(change)}%
										</p>
									</div>
								);
							}
							return null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
