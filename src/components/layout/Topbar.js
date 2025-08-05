"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SideBarContext";

export default function Topbar() {
	const { setTheme, theme } = useTheme();
	const { setIsSidebarOpen } = useSidebar();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<header className="flex border-b border-black/20 dark:border-gray-600 items-center justify-between p-4 border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white sticky top-0 z-50">
			<div className="flex items-center space-x-4">
				{/* Menu button only visible on mobile */}
				<button
					onClick={() => setIsSidebarOpen(prev => !prev)}
					className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
					aria-label="Open sidebar"
				>
					<Menu size={20} />
				</button>
				<h2 className="text-lg font-semibold">Dashboard</h2>
			</div>
			<button
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
				className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
				aria-label="Toggle theme"
			>
				{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
			</button>
		</header>
	);
}
