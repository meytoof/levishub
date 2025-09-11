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
				{ name: "Dashboard", href: "/dashboard/admin", icon: Home },
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
		<div className="backoffice-layout">
			{/* Header mobile */}
			<header className="backoffice-header lg:hidden">
				<div className="backoffice-container">
					<div className="backoffice-flex backoffice-items-center backoffice-justify-between">
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="backoffice-btn backoffice-btn-ghost p-2"
							aria-label="Toggle sidebar"
						>
							{sidebarOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>

						<div className="backoffice-text-lg backoffice-font-semibold backoffice-text-primary">
							LevisWeb Backoffice
						</div>

						<div className="backoffice-flex backoffice-items-center backoffice-gap-2">
							<button className="backoffice-btn backoffice-btn-ghost p-2">
								<Bell className="h-5 w-5" />
							</button>
							<div className="backoffice-w-8 backoffice-h-8 backoffice-rounded-full backoffice-bg-primary-500 backoffice-flex backoffice-items-center backoffice-justify-center">
								<User className="h-4 w-4 text-white" />
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Sidebar */}
			<aside
				className={`backoffice-sidebar ${
					sidebarOpen ? "open" : ""
				} lg:translate-x-0`}
			>
				<div className="backoffice-flex backoffice-h-full backoffice-flex-col">
					{/* Logo et titre */}
					<div className="backoffice-flex backoffice-h-16 backoffice-items-center backoffice-border-b backoffice-border-light backoffice-px-6">
						<Link
							href="/dashboard"
							className="backoffice-flex backoffice-items-center backoffice-gap-3"
						>
							<div className="backoffice-w-8 backoffice-h-8 backoffice-rounded-lg backoffice-bg-primary-500 backoffice-flex backoffice-items-center backoffice-justify-center">
								<span className="backoffice-text-white backoffice-font-bold backoffice-text-sm">
									LH
								</span>
							</div>
							<span className="backoffice-text-lg backoffice-font-semibold backoffice-text-primary">
								LevisWeb
							</span>
						</Link>
					</div>

					{/* Barre de recherche */}
					<div className="backoffice-px-4 backoffice-py-3">
						<div className="backoffice-relative">
							<Search className="backoffice-absolute backoffice-left-3 backoffice-top-1/2 backoffice-transform -backoffice-translate-y-1/2 backoffice-h-4 backoffice-w-4 backoffice-text-neutral-400" />
							<input
								type="text"
								placeholder="Rechercher..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="backoffice-input backoffice-pl-10 backoffice-text-sm"
							/>
						</div>
					</div>

					{/* Navigation */}
					<nav className="backoffice-sidebar-nav backoffice-flex-1">
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
									<Icon className="backoffice-h-5 backoffice-w-5" />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Actions utilisateur */}
					<div className="backoffice-border-t backoffice-border-light backoffice-p-4">
						<div className="backoffice-space-y-2">
							<Link
								href="/dashboard/settings"
								className="backoffice-sidebar-item"
							>
								<Settings className="backoffice-h-5 backoffice-w-5" />
								Paramètres
							</Link>
							<button
								onClick={handleLogout}
								className="backoffice-sidebar-item backoffice-w-full backoffice-text-left"
							>
								<LogOut className="backoffice-h-5 backoffice-w-5" />
								Déconnexion
							</button>
						</div>

						{/* Info utilisateur */}
						<div className="backoffice-mt-4 backoffice-pt-4 backoffice-border-t backoffice-border-light">
							<div className="backoffice-flex backoffice-items-center backoffice-gap-3">
								<div className="backoffice-w-8 backoffice-h-8 backoffice-rounded-full backoffice-bg-primary-100 backoffice-flex backoffice-items-center backoffice-justify-center">
									<User className="backoffice-h-4 backoffice-w-4 backoffice-text-primary-600" />
								</div>
								<div className="backoffice-flex-1 backoffice-min-w-0">
									<p className="backoffice-text-sm backoffice-font-medium backoffice-text-primary backoffice-truncate">
										{userRole === "ADMIN"
											? "Administrateur"
											: "Client"}
									</p>
									<p className="backoffice-text-xs backoffice-text-neutral-500 backoffice-truncate">
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

				{/* Header desktop */}
				<header className="backoffice-header lg:block backoffice-hidden">
					<div className="backoffice-container">
						<div className="backoffice-flex backoffice-items-center backoffice-justify-between">
							<div className="backoffice-flex backoffice-items-center backoffice-gap-4">
								<h1 className="backoffice-text-xl backoffice-font-semibold backoffice-text-primary">
									{userRole === "ADMIN"
										? "Administration"
										: "Espace Client"}
								</h1>
							</div>

							<div className="backoffice-flex backoffice-items-center backoffice-gap-3">
								<button className="backoffice-btn backoffice-btn-ghost backoffice-p-2">
									<Bell className="backoffice-h-5 backoffice-w-5" />
								</button>
								<div className="backoffice-w-8 backoffice-h-8 backoffice-rounded-full backoffice-bg-primary-500 backoffice-flex backoffice-items-center backoffice-justify-center">
									<User className="backoffice-h-4 backoffice-w-4 text-white" />
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Content */}
				<div className="backoffice-min-h-screen backoffice-bg-secondary backoffice-pt-16 lg:pt-0">
					{children}
				</div>
			</main>
		</div>
	);
}
