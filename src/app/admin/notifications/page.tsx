import { authOptions } from "@/lib/auth";
import {
	AlertCircle,
	ArrowLeft,
	Bell,
	Calendar,
	CheckCircle,
	Clock,
	CreditCard,
	Eye,
	FileText,
	Filter,
	Search,
	Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminNotificationsPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	// Notifications fictives pour la démo
	const notifications = [
		{
			id: 1,
			title: "Nouveau ticket client",
			message: "StartupXYZ a créé un ticket de support urgent",
			time: "Il y a 5 min",
			unread: true,
			type: "ticket",
			priority: "high",
			link: "/admin/tickets",
			client: "StartupXYZ",
		},
		{
			id: 2,
			title: "Client en attente",
			message: "3 invitations clients en attente de réponse",
			time: "Il y a 1h",
			unread: true,
			type: "invitation",
			priority: "medium",
			link: "/admin/invitations",
			client: "Système",
		},
		// Paiements/Factures en pause pour l'instant
		{
			id: 4,
			title: "Nouveau projet",
			message: "WebAgency souhaite un devis pour un site e-commerce",
			time: "Il y a 3h",
			unread: true,
			type: "project",
			priority: "high",
			link: "/admin/clients",
			client: "WebAgency",
		},
		{
			id: 5,
			title: "Ticket résolu",
			message: "Problème de facturation résolu pour MaStartup",
			time: "Il y a 4h",
			unread: false,
			type: "ticket",
			priority: "low",
			link: "/admin/tickets",
			client: "MaStartup",
		},
		{
			id: 6,
			title: "Maintenance planifiée",
			message: "Maintenance système prévue ce soir à 23h",
			time: "Il y a 6h",
			unread: true,
			type: "system",
			priority: "medium",
			link: "/admin/settings",
			client: "Système",
		},
	];

	const unreadCount = notifications.filter((n) => n.unread).length;

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "ticket":
				return <AlertCircle className="w-4 h-4" />;
			case "invitation":
				return <Users className="w-4 h-4" />;
			case "payment":
				return <CreditCard className="w-4 h-4" />;
			case "project":
				return <FileText className="w-4 h-4" />;
			case "system":
				return <Bell className="w-4 h-4" />;
			default:
				return <Bell className="w-4 h-4" />;
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "text-[#ef4444]";
			case "medium":
				return "text-[#f59e0b]";
			case "low":
				return "text-[#10b981]";
			default:
				return "text-[#a0a0a0]";
		}
	};

	const getPriorityLabel = (priority: string) => {
		switch (priority) {
			case "high":
				return "Élevée";
			case "medium":
				return "Moyenne";
			case "low":
				return "Faible";
			default:
				return "Normale";
		}
	};

	return (
		<>
			{/* Header avec navigation */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/admin" className="btn btn-secondary">
						<ArrowLeft className="w-4 h-4" />
						Retour
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Centre de Notifications
						</h1>
						<p className="text-[#a0a0a0]">
							{unreadCount} notification
							{unreadCount > 1 ? "s" : ""} non lue
							{unreadCount > 1 ? "s" : ""}
						</p>
					</div>
				</div>
				<div className="flex gap-3">
					<button className="btn btn-secondary">
						<CheckCircle className="w-4 h-4" />
						Tout marquer comme lu
					</button>
				</div>
			</div>

			{/* Filtres et recherche */}
			<div className="card mb-6">
				<div className="card-content">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
								<input
									type="text"
									placeholder="Rechercher dans les notifications..."
									className="form-input pl-10"
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<button className="btn btn-secondary">
								<Filter className="w-4 h-4" />
								Filtres
							</button>
							<select className="form-input form-select">
								<option value="">Tous les types</option>
								<option value="ticket">Tickets</option>
								<option value="invitation">Invitations</option>
								<option value="payment">Paiements</option>
								<option value="project">Projets</option>
								<option value="system">Système</option>
							</select>
							<select className="form-input form-select">
								<option value="">Toutes les priorités</option>
								<option value="high">Élevée</option>
								<option value="medium">Moyenne</option>
								<option value="low">Faible</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Liste des notifications */}
			<div className="card">
				<div className="card-header">
					<h3 className="card-title flex items-center gap-2">
						<Bell className="w-5 h-5" />
						Notifications ({notifications.length})
					</h3>
				</div>
				<div className="card-content p-0">
					{notifications.length === 0 ? (
						<div className="text-center py-12">
							<Bell className="w-16 h-16 mx-auto mb-4 text-[#666]" />
							<p className="text-[#a0a0a0] text-lg mb-2">
								Aucune notification
							</p>
							<p className="text-[#666]">Vous êtes à jour !</p>
						</div>
					) : (
						<div className="divide-y divide-[#333]">
							{notifications.map((notification) => (
								<div
									key={notification.id}
									className={`p-6 hover:bg-[#1a1a1a] transition-colors cursor-pointer ${
										notification.unread
											? "bg-[#0a0a0a]"
											: ""
									}`}
								>
									<div className="flex items-start gap-4">
										{/* Icône de type */}
										<div
											className={`mt-1 ${getPriorityColor(
												notification.priority
											)}`}
										>
											{getTypeIcon(notification.type)}
										</div>

										{/* Contenu principal */}
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between mb-2">
												<h4
													className={`font-medium text-sm ${
														notification.unread
															? "text-white"
															: "text-[#a0a0a0]"
													}`}
												>
													{notification.title}
												</h4>
												<div className="flex items-center gap-2">
													{/* Badge de priorité */}
													<span
														className={`text-xs px-2 py-1 rounded-full ${
															notification.priority ===
															"high"
																? "bg-[#ef4444]/20 text-[#ef4444]"
																: notification.priority ===
																  "medium"
																? "bg-[#f59e0b]/20 text-[#f59e0b]"
																: "bg-[#10b981]/20 text-[#10b981]"
														}`}
													>
														{getPriorityLabel(
															notification.priority
														)}
													</span>

													{/* Indicateur non lu */}
													{notification.unread && (
														<span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>
													)}
												</div>
											</div>

											<p className="text-[#a0a0a0] text-sm mb-3">
												{notification.message}
											</p>

											<div className="flex items-center gap-4 text-xs text-[#666]">
												<span className="flex items-center gap-1">
													<Users className="w-3 h-3" />
													{notification.client}
												</span>
												<span className="flex items-center gap-1">
													<Calendar className="w-3 h-3" />
													{notification.time}
												</span>
											</div>
										</div>

										{/* Actions */}
										<div className="flex items-center gap-2">
											{notification.unread && (
												<button
													className="btn btn-sm btn-secondary"
													title="Marquer comme lu"
												>
													<Eye className="w-3 h-3" />
												</button>
											)}
											<Link
												href={notification.link}
												className="btn btn-sm btn-primary"
												title="Voir les détails"
											>
												Voir
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Statistiques */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
				<div className="stat-card">
					<div className="stat-icon primary">
						<Bell />
					</div>
					<div className="stat-value">{notifications.length}</div>
					<div className="stat-label">Total Notifications</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon warning">
						<AlertCircle />
					</div>
					<div className="stat-value">
						{notifications.filter((n) => n.unread).length}
					</div>
					<div className="stat-label">Non Lues</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon danger">
						<Clock />
					</div>
					<div className="stat-value">
						{
							notifications.filter((n) => n.priority === "high")
								.length
						}
					</div>
					<div className="stat-label">Priorité Élevée</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon success">
						<CheckCircle />
					</div>
					<div className="stat-value">
						{notifications.filter((n) => !n.unread).length}
					</div>
					<div className="stat-label">Lues</div>
				</div>
			</div>
		</>
	);
}
