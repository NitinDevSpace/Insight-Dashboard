import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/context/SideBarContext";

export const metadata = {
	title: "ADmyBRAND Insights",
	description: "AI-powered analytics dashboard for digital marketers",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="flex min-h-screen bg-background text-foreground">
				<SidebarProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Sidebar />
						<div className="flex flex-col flex-1">
							<Topbar />
							<main className="p-6">{children}</main>
						</div>
					</ThemeProvider>
				</SidebarProvider>
			</body>
		</html>
	);
}
