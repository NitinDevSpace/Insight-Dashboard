"use client";

import { Home, Users, BarChart3, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SideBarContext";

const navItems = [
	{ label: "Overview", href: "/", icon: <Home size={18} /> },
	{ label: "Users", href: "/users", icon: <Users size={18} /> },
	{ label: "Reports", href: "/reports", icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
	const pathname = usePathname();
	return (
		<aside
			className={`z-50 transition-transform duration-300 fixed top-0 left-0 h-screen w-64 p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white border-r border-black/20 dark:border-gray-600 ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
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
	);
}
