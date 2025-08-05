export default function MetricCard({ title, value, icon }) {
	return (
		<div className={`p-5 border border-black/20 dark:border-gray-600 rounded-xl shadow-md flex items-center justify-between bg-white  dark:bg-gray-800`}>
			<div>
				<p className="text-sm text-gray-500 dark:text-white/70">{title}</p>
				<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
			</div>
			<div className="text-gray-400">{icon}</div>
		</div>
	);
}
