"use client";

import MetricCard from "@/components/ui/MetricCard";
import { DollarSign, Users, MousePointerClick, TrendingUp } from "lucide-react";
import LineChartCard from "@/components/charts/LineChartCard";
import BarChartCard from "@/components/charts/BarChartCard";
import DonutChartCard from "@/components/charts/DonutChartCard";

export default function Dashboard() {
	return (
		<section>
			<h1 className="text-2xl font-bold mb-6">Overview</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				<MetricCard title="Revenue" value="$25,430" icon={<DollarSign />} />
				<MetricCard title="Users" value="8,932" icon={<Users />} />
				<MetricCard
					title="Conversions"
					value="1,230"
					icon={<MousePointerClick />}
				/>
				<MetricCard title="Growth" value="+12.5%" icon={<TrendingUp />} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				<LineChartCard />
				<BarChartCard />
				<DonutChartCard />
			</div>
		</section>
	);
}
