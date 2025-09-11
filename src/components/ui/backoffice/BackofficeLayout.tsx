"use client";

import {
	BarChart,
	Bell,
	CreditCard,
	FileText,
	Home,
	LifeBuoy,
	LogOut,
	Menu,
	Search,
	Settings,
	User,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export function BackofficeLayout({
	children,
	userRole,
}: {
	children: React.ReactNode;
	userRole: "ADMIN" | "CLIENT";
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const pathname = usePathname();

	const navItems = useMemo(() => {
		if (userRole === "ADMIN") {
			return [
				{ name: "Dashboard", href: "/admin", icon: Home },
				{ name: "Clients", href: "/admin/clients", icon: Users },
				{
					name: "Paiements",
					href: "/admin/payments",
					icon: CreditCard,
				},
				{ name: "Tickets", href: "/admin/tickets", icon: LifeBuoy },
				{ name: "Analytics", href: "/admin/analytics", icon: BarChart },
				{ name: "Factures", href: "/admin/invoices", icon: FileText },
			];
		} else {
			return [
				{ name: "Dashboard", href: "/dashboard", icon: Home },
				{
					name: "Analytics",
					href: "/dashboard/analytics",
					icon: BarChart,
				},
				{
					name: "Factures",
					href: "/dashboard/invoices",
					icon: FileText,
				},
				{ name: "Tickets", href: "/dashboard/tickets", icon: LifeBuoy },
				{
					name: "Projets",
					href: "/dashboard/projects",
					icon: FileText,
				},
			];
		}
	}, [userRole]);

	const handleLogout = () => {
		// Logique de déconnexion
		console.log("Déconnexion...");
	};

	return (
		<div className="bo-layout">
			{/* Header mobile */}
			<header className="bo-header lg:bo-hidden">
				<div className="bo-container">
					<div className="bo-flex bo-items-center bo-justify-between">
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="bo-btn bo-btn-ghost bo-p-2"
							aria-label="Toggle sidebar"
						>
							{sidebarOpen ? (
								<X className="bo-h-5 bo-w-5" />
							) : (
								<Menu className="bo-h-5 bo-w-5" />
							)}
						</button>

						<div className="bo-text-lg bo-font-semibold bo-text-primary">
							LevisWeb Backoffice
						</div>

						<div className="bo-flex bo-items-center bo-gap-2">
							<button className="bo-btn bo-btn-ghost bo-p-2">
								<Bell className="bo-h-5 bo-w-5" />
							</button>
							<div className="bo-w-8 bo-h-8 bo-rounded-full bo-bg-primary-500 bo-flex bo-items-center bo-justify-center">
								<User className="bo-h-4 bo-w-4 bo-text-white" />
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Sidebar */}
			<aside
				className={`bo-sidebar ${
					sidebarOpen ? "open" : ""
				} lg:bo-translate-x-0`}
			>
				<div className="bo-flex bo-h-full bo-flex-col">
					{/* Logo et titre */}
					<div className="bo-flex bo-h-16 bo-items-center bo-border-b bo-border-light bo-px-6">
						<Link
							href={
								userRole === "ADMIN" ? "/admin" : "/dashboard"
							}
							className="bo-flex bo-items-center bo-gap-3"
						>
							<div className="bo-w-8 bo-h-8 bo-rounded-lg bo-bg-primary-500 bo-flex bo-items-center bo-justify-center">
								<span className="bo-text-white bo-font-bold bo-text-sm">
									LH
								</span>
							</div>
							<span className="bo-text-lg bo-font-semibold bo-text-primary">
								LevisWeb
							</span>
						</Link>
					</div>

					{/* Barre de recherche */}
					<div className="bo-px-4 bo-py-3">
						<div className="bo-relative">
							<Search className="bo-absolute bo-left-3 bo-top-1/2 bo-transform -bo-translate-y-1/2 bo-h-4 bo-w-4 bo-text-neutral-400" />
							<input
								type="text"
								placeholder="Rechercher..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="bo-input bo-pl-10 bo-text-sm"
							/>
						</div>
					</div>

					{/* Navigation */}
					<nav className="bo-sidebar-nav bo-flex-1">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`bo-sidebar-item ${
										isActive ? "active" : ""
									}`}
									onClick={() => setSidebarOpen(false)}
								>
									<Icon className="bo-h-5 bo-w-5" />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Actions utilisateur */}
					<div className="bo-border-t bo-border-light bo-p-4">
						<div className="bo-space-y-2">
							<Link
								href="/dashboard/settings"
								className="bo-sidebar-item"
							>
								<Settings className="bo-h-5 bo-w-5" />
								Paramètres
							</Link>
							<button
								onClick={handleLogout}
								className="bo-sidebar-item bo-w-full bo-text-left"
							>
								<LogOut className="bo-h-5 bo-w-5" />
								Déconnexion
							</button>
						</div>

						{/* Info utilisateur */}
						<div className="bo-mt-4 bo-pt-4 bo-border-t bo-border-light">
							<div className="bo-flex bo-items-center bo-gap-3">
								<div className="bo-w-8 bo-h-8 bo-rounded-full bo-bg-primary-100 bo-flex bo-items-center bo-justify-center">
									<User className="bo-h-4 bo-w-4 bo-text-primary-600" />
								</div>
								<div className="bo-flex-1 bo-min-w-0">
									<p className="bo-text-sm bo-font-medium bo-text-primary bo-truncate">
										{userRole === "ADMIN"
											? "Administrateur"
											: "Client"}
									</p>
									<p className="bo-text-xs bo-text-neutral-500 bo-truncate">
										{userRole}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<main
				className={`bo-main ${
					sidebarOpen ? "with-sidebar" : ""
				} lg:bo-ml-64`}
			>
				{/* Overlay pour mobile */}
				{sidebarOpen && (
					<div
						className="bo-overlay"
						onClick={() => setSidebarOpen(false)}
					/>
				)}

				{/* Header desktop */}
				<header className="bo-header lg:bo-block bo-hidden">
					<div className="bo-container">
						<div className="bo-flex bo-items-center bo-justify-between">
							<div className="bo-flex bo-items-center bo-gap-4">
								<h1 className="bo-text-xl bo-font-semibold bo-text-primary">
									{userRole === "ADMIN"
										? "Administration"
										: "Espace Client"}
								</h1>
							</div>

							<div className="bo-flex bo-items-center bo-gap-3">
								<button className="bo-btn bo-btn-ghost bo-p-2">
									<Bell className="bo-h-5 bo-w-5" />
								</button>
								<div className="bo-w-8 bo-h-8 bo-rounded-full bo-bg-primary-500 bo-flex bo-items-center bo-justify-center">
									<User className="bo-h-4 bo-w-4 bo-text-white" />
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Content */}
				<div className="bo-min-h-screen bo-bg-secondary bo-pt-16 lg:bo-pt-0">
					{children}
				</div>
			</main>
		</div>
	);
}
