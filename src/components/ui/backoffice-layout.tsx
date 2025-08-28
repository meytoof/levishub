"use client";

import {
	BarChart3,
	FileText,
	Home,
	Mail,
	Menu,
	Settings,
	Ticket,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface BackofficeLayoutProps {
	children: React.ReactNode;
	userRole?: "ADMIN" | "CLIENT";
}

const adminNavItems = [
	{ name: "Dashboard", href: "/dashboard/admin", icon: Home },
	{ name: "Clients", href: "/admin/clients", icon: Users },
	{ name: "Invitations", href: "/admin/invitations", icon: Mail },
	{ name: "Tickets", href: "/admin/tickets", icon: Ticket },
	{ name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
	{ name: "Factures", href: "/admin/invoices", icon: FileText },
	{ name: "Paramètres", href: "/admin/settings", icon: Settings },
];

const clientNavItems = [
	{ name: "Dashboard", href: "/dashboard", icon: Home },
	{ name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
	{ name: "Factures", href: "/dashboard/invoices", icon: FileText },
	{ name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
	{ name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function BackofficeLayout({
	children,
	userRole = "ADMIN",
}: BackofficeLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();
	const navItems = userRole === "ADMIN" ? adminNavItems : clientNavItems;

	return (
		<div className="backoffice-layout">
			{/* Header mobile */}
			<header className="backoffice-header lg:hidden">
				<div className="backoffice-container">
					<div className="flex h-16 items-center justify-between">
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="backoffice-btn-ghost p-2"
						>
							{sidebarOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
						<div className="text-lg font-semibold">
							LevisHub Backoffice
						</div>
						<div className="w-10" /> {/* Spacer */}
					</div>
				</div>
			</header>

			{/* Sidebar */}
			<aside
				className={`backoffice-sidebar ${
					sidebarOpen ? "open" : ""
				} lg:translate-x-0`}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="flex h-16 items-center border-b border-border px-6">
						<Link
							href="/dashboard"
							className="flex items-center gap-2"
						>
							<div className="h-8 w-8 rounded-lg bg-primary"></div>
							<span className="text-lg font-semibold">
								LevisHub
							</span>
						</Link>
					</div>

					{/* Navigation */}
					<nav className="backoffice-sidebar-nav flex-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`backoffice-sidebar-item ${
										isActive ? "active" : ""
									}`}
									onClick={() => setSidebarOpen(false)}
								>
									<Icon className="h-4 w-4" />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* User info */}
					<div className="border-t border-border p-4">
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
								<span className="text-sm font-medium">U</span>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									Utilisateur
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{userRole}
								</p>
							</div>
						</div>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<main
				className={`backoffice-main ${
					sidebarOpen ? "with-sidebar" : ""
				} lg:ml-64`}
			>
				{/* Overlay pour mobile */}
				{sidebarOpen && (
					<div
						className="backoffice-overlay"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Content */}
				<div className="min-h-screen bg-muted/30">{children}</div>
			</main>
		</div>
	);
}
