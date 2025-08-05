"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<header className="flex items-center justify-between p-4 border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white sticky top-0 z-50">
			<h2 className="text-lg font-semibold">Dashboard</h2>
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
