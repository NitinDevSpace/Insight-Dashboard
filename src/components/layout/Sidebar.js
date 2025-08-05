"use client";

import { Home, Users, BarChart3, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
	{ label: "Overview", href: "/", icon: <Home size={18} /> },
	{ label: "Users", href: "/users", icon: <Users size={18} /> },
	{ label: "Reports", href: "/reports", icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			{/* Toggle button for small screens */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-800"
				onClick={() => setIsOpen(!isOpen)}
			>
				<Menu size={20} />
			</button>

			<aside
				className={`md:sticky md:top-0 fixed top-0 left-0 h-screen w-64 p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-transform duration-300 z-40 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 md:block`}
			>
				<h1 className="text-xl font-bold mb-8">ADmyBRAND</h1>
				<nav className="space-y-4">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<a
								key={item.label}
								href={item.href}
								className={`flex items-center space-x-2 px-3 py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
									isActive ? "bg-gray-200 dark:bg-gray-800 font-semibold" : ""
								}`}
							>
								{item.icon}
								<span>{item.label}</span>
							</a>
						);
					})}
				</nav>
			</aside>
		</>
	);
}
