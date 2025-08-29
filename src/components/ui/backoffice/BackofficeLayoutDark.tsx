"use client";

import {
	BarChart,
	Bell,
	ChevronDown,
	CreditCard,
	FileText,
	HelpCircle,
	Home,
	LifeBuoy,
	LogOut,
	Menu,
	Settings,
	User,
	Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

interface BackofficeLayoutDarkProps {
	children: React.ReactNode;
	userRole: "ADMIN" | "CLIENT";
}

export default function BackofficeLayoutDark({
	children,
	userRole,
}: BackofficeLayoutDarkProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [isClientMode, setIsClientMode] = useState(false);

	const pathname = usePathname();

	// Notifications dynamiques basées sur le rôle
	const [notifications, setNotifications] = useState(() => {
		if (userRole === "ADMIN") {
			return [
				{
					id: 1,
					title: "Nouveau client",
					message: "StartupXYZ a rejoint la plateforme",
					time: "Il y a 5 min",
					unread: true,
					link: "/admin/clients",
				},
				{
					id: 2,
					title: "Ticket urgent",
					message: "Problème de facturation signalé",
					time: "Il y a 1h",
					unread: true,
					link: "/admin/tickets",
				},
				{
					id: 3,
					title: "Paiement reçu",
					message: "Facture #1234 payée",
					time: "Il y a 2h",
					unread: false,
					link: "/admin/payments",
				},
			];
		} else {
			return [
				{
					id: 1,
					title: "Projet mis à jour",
					message: "Votre site web a été mis à jour",
					time: "Il y a 30 min",
					unread: true,
					link: "/dashboard/projects",
				},
				{
					id: 2,
					title: "Nouvelle facture",
					message: "Facture #5678 disponible",
					time: "Il y a 2h",
					unread: true,
					link: "/dashboard/invoices",
				},
			];
		}
	});

	const navItems = useMemo(() => {
		if (userRole === "ADMIN" && isClientMode) {
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
	}, [userRole, isClientMode]);

	const handleLogout = async () => {
		try {
			// Fermer le menu utilisateur
			setUserMenuOpen(false);

			// Déconnexion avec NextAuth
			await signOut({
				callbackUrl: "/login",
				redirect: true,
			});
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
			// En cas d'erreur, rediriger manuellement
			window.location.href = "/login";
		}
	};

	const markAsRead = (notificationId: number) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === notificationId
					? { ...notif, unread: false }
					: notif
			)
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notif) => ({ ...notif, unread: false }))
		);
	};

	const unreadCount = notifications.filter((n) => n.unread).length;

	const toggleClientMode = () => {
		setIsClientMode(!isClientMode);
	};

	return (
		<div className="backoffice">
			<div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
				<div className="sidebar-header">
					<Link
						href={userRole === "ADMIN" ? "/admin" : "/dashboard"}
						className="sidebar-logo"
					>
						<div className="sidebar-logo-icon">
							{userRole === "ADMIN" ? "A" : "C"}
						</div>
						<span>
							{userRole === "ADMIN" && isClientMode
								? "Client Mode"
								: userRole === "ADMIN"
								? "LevisHub Admin"
								: "LevisHub Client"}
						</span>
					</Link>
				</div>
				<nav className="sidebar-nav">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`nav-item ${
									pathname === item.href ? "active" : ""
								}`}
							>
								<Icon className="nav-item-icon" />
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>

			<div className="main-content">
				<header className="header">
					<div className="flex items-center gap-4">
						<button
							className="mobile-menu-toggle"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							<Menu />
						</button>
						<h1 className="header-title">
							{userRole === "ADMIN" && isClientMode
								? "Mode Test Client"
								: "LevisHub"}
						</h1>

						{userRole === "ADMIN" && (
							<div className="flex items-center gap-3 ml-4 p-2 bg-[#1a1a1a] rounded-lg border border-[#333]">
								<span
									className={`text-sm font-medium ${
										!isClientMode
											? "text-white"
											: "text-[#a0a0a0]"
									}`}
								>
									Admin
								</span>
								<button
									onClick={toggleClientMode}
									className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
										isClientMode
											? "bg-[#3b82f6]"
											: "bg-[#666]"
									}`}
								>
									<span
										className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
											isClientMode
												? "translate-x-5"
												: "translate-x-1"
										}`}
									/>
								</button>
								<span
									className={`text-sm font-medium ${
										isClientMode
											? "text-white"
											: "text-[#a0a0a0]"
									}`}
								>
									Client
								</span>
							</div>
						)}
					</div>

					<div className="header-actions">
						<div className="relative">
							<button
								onClick={() =>
									setNotificationsOpen(!notificationsOpen)
								}
								className="relative p-2 text-[#a0a0a0] hover:text-white transition-colors"
							>
								<Bell className="w-5 h-5" />
								{unreadCount > 0 && (
									<span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{unreadCount > 99 ? "99+" : unreadCount}
									</span>
								)}
							</button>

							{notificationsOpen && (
								<div className="absolute right-0 top-full mt-2 w-80 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-lg z-50">
									<div className="p-3 border-b border-[#333]">
										<h3 className="font-medium text-white">
											Notifications (
											{notifications.length})
										</h3>
									</div>
									{notifications.length === 0 ? (
										<div className="p-4 text-center text-[#a0a0a0]">
											Aucune notification
										</div>
									) : (
										<>
											{unreadCount > 0 && (
												<div className="p-3 border-b border-[#333]">
													<button
														onClick={markAllAsRead}
														className="w-full text-center text-[#3b82f6] text-sm hover:underline"
													>
														Tout marquer comme lu
													</button>
												</div>
											)}

											{notifications.map(
												(notification) => (
													<div
														key={notification.id}
														className={`p-4 border-b border-[#333] last:border-b-0 hover:bg-[#222] transition-colors ${
															notification.unread
																? "bg-[#1a1a1a]"
																: ""
														}`}
														onMouseEnter={() => {
															if (
																notification.unread
															) {
																markAsRead(
																	notification.id
																);
															}
														}}
													>
														<Link
															href={
																notification.link
															}
															onClick={() =>
																setNotificationsOpen(
																	false
																)
															}
															className="block"
														>
															<div className="flex items-start justify-between">
																<div className="flex-1">
																	<h4 className="font-medium text-white text-sm">
																		{
																			notification.title
																		}
																	</h4>
																	<p className="text-[#a0a0a0] text-xs mt-1">
																		{
																			notification.message
																		}
																	</p>
																	<span className="text-[#666] text-xs mt-2 block">
																		{
																			notification.time
																		}
																	</span>
																</div>
																{notification.unread && (
																	<div className="w-2 h-2 bg-[#3b82f6] rounded-full ml-2"></div>
																)}
															</div>
														</Link>
													</div>
												)
											)}
										</>
									)}
								</div>
							)}
						</div>

						<div className="relative">
							<button
								onClick={() => setUserMenuOpen(!userMenuOpen)}
								className="user-menu"
							>
								<div className="user-avatar">
									{userRole === "ADMIN" ? "A" : "C"}
								</div>
								<span className="hidden md:block">
									{userRole === "ADMIN" ? "Admin" : "Client"}
								</span>
								<ChevronDown className="w-4 h-4" />
							</button>

							{userMenuOpen && (
								<div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-lg z-50">
									<div className="p-2">
										{userRole === "ADMIN" ? (
											<>
												<Link
													href="/admin/profile"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<User className="w-4 h-4" />
													Mon Profil
												</Link>
												<Link
													href="/admin/settings"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<Settings className="w-4 h-4" />
													Paramètres
												</Link>
												<Link
													href="/admin/help"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<HelpCircle className="w-4 h-4" />
													Aide
												</Link>
											</>
										) : (
											<>
												<Link
													href="/dashboard/profile"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<User className="w-4 h-4" />
													Mon Profil
												</Link>
												<Link
													href="/dashboard/settings"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<Settings className="w-4 h-4" />
													Paramètres
												</Link>
												<Link
													href="/dashboard/help"
													className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors"
													onClick={() =>
														setUserMenuOpen(false)
													}
												>
													<HelpCircle className="w-4 h-4" />
													Aide
												</Link>
											</>
										)}
										<hr className="border-[#333] my-2" />
										<button
											onClick={handleLogout}
											className="flex items-center gap-2 p-2 text-[#a0a0a0] hover:text-white hover:bg-[#222] rounded transition-colors w-full"
										>
											<LogOut className="w-4 h-4" />
											Déconnexion
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</header>

				<main className="content">{children}</main>
			</div>

			{sidebarOpen && (
				<div
					className="sidebar-overlay open"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{(notificationsOpen || userMenuOpen) && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => {
						setNotificationsOpen(false);
						setUserMenuOpen(false);
					}}
				/>
			)}
		</div>
	);
}
