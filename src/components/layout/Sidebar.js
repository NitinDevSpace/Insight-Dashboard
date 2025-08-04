import { Home, Users, BarChart3 } from "lucide-react";

const navItems = [
	{ label: "Overview", href: "/", icon: <Home size={18} /> },
	{ label: "Users", href: "/users", icon: <Users size={18} /> },
	{ label: "Reports", href: "/reports", icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
	return (
		<aside className="w-64 min-h-screen bg-gray-900 text-white p-6 hidden md:block">
			<h1 className="text-xl font-bold mb-8">ADmyBRAND</h1>
			<nav className="space-y-4">
				{navItems.map((item) => (
					<a
						key={item.label}
						href={item.href}
						className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-md transition"
					>
						{item.icon}
						<span>{item.label}</span>
					</a>
				))}
			</nav>
		</aside>
	);
}
