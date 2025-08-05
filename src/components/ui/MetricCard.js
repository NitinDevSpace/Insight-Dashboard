export default function MetricCard({ title, value, icon }) {
	return (
		<div className={`p-5 rounded-xl shadow-sm flex items-center justify-between bg-white dark:bg-gray-800`}>
			<div>
				<p className="text-sm text-gray-500">{title}</p>
				<h3 className="text-2xl font-semibold">{value}</h3>
			</div>
			<div className="text-gray-400">{icon}</div>
		</div>
	);
}
