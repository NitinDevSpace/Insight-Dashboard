"use client";

import { useState, useEffect } from "react";
import MetricCard from "@/components/ui/MetricCard";
import { DollarSign, Users, MousePointerClick, TrendingUp } from "lucide-react";
import LineChartCard from "@/components/charts/LineChartCard";
import BarChartCard from "@/components/charts/BarChartCard";
import DonutChartCard from "@/components/charts/DonutChartCard";
import  UsersPage  from "@/app/users/page";

export default function Dashboard() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<section>
			<h1 className="text-2xl font-bold mb-6">Overview</h1>

			{loading ? (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className="h-[100px] bg-gray-200 rounded animate-pulse"
							/>
						))}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="h-[300px] bg-gray-200 rounded animate-pulse"
							/>
						))}
					</div>
				</>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
						<MetricCard title="Revenue" value="$25,430" icon={<DollarSign />} />
						<MetricCard title="Users" value="8,932" icon={<Users />} />
						<MetricCard
							title="Conversions"
							value="1,235"
							icon={<MousePointerClick />}
						/>
						<MetricCard title="Growth" value="+12.5%" icon={<TrendingUp />} />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						<LineChartCard />
						<BarChartCard />
						<DonutChartCard  />
					</div>

					<div className="w-full overflow-x-auto mt-12 pt-12 border-t-2  border-black/20 dark:border-gray-600">
						<div className="min-w-full max-w-full">
							<UsersPage />
						</div>
					</div>
				</>
			)}
		</section>
	);
}
