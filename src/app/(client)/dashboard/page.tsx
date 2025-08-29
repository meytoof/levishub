import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	Activity,
	AlertCircle,
	BarChart,
	CheckCircle,
	Clock,
	CreditCard,
	Download,
	Eye,
	Globe,
	LifeBuoy,
	Plus,
	Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ClientDashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "CLIENT") redirect("/");

	// Récupérer les données du client connecté
	const clientId = session.user.clientId;
	if (!clientId) redirect("/");

	const [client, sites, analytics, invoices, tickets, subscription] =
		await Promise.all([
			prisma.client.findUnique({
				where: { id: clientId },
				include: {
					_count: {
						select: {
							users: true,
							sites: true,
							tickets: true,
							invoices: true,
						},
					},
				},
			}),
			prisma.site.findMany({
				where: { clientId },
				orderBy: { createdAt: "desc" },
				take: 5,
			}),
			prisma.analyticsEvent.findMany({
				where: { site: { clientId } },
				orderBy: { occurredAt: "desc" },
				take: 10,
			}),
			prisma.invoice.findMany({
				where: { clientId },
				orderBy: { createdAt: "desc" },
				take: 5,
			}),
			prisma.ticket.findMany({
				where: { clientId },
				orderBy: { createdAt: "desc" },
				take: 5,
			}),
			prisma.subscription.findFirst({
				where: { clientId },
				orderBy: { createdAt: "desc" },
			}),
		]);

	if (!client) redirect("/");

	const totalSites = client._count.sites;
	const totalUsers = client._count.users;
	const totalTickets = client._count.tickets;
	const totalInvoices = client._count.invoices;

	// Calculer les statistiques d'analytics
	const totalVisits = analytics.filter(
		(e) => e.eventType === "PAGEVIEW"
	).length;
	const uniqueVisitors = new Set(
		analytics.filter((e) => e.eventType === "PAGEVIEW").map((e) => e.userId)
	).size;

	return (
		<>
			{/* Header avec actions rapides */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">
						Espace Client - {client.companyName}
					</h1>
					<p className="text-[#a0a0a0]">
						Bienvenue dans votre espace de gestion
					</p>
				</div>
				<div className="flex gap-3">
					<Link
						href="/dashboard/tickets/new"
						className="btn btn-primary"
					>
						<Plus className="w-4 h-4" />
						Nouveau Ticket
					</Link>
					<Link
						href="/dashboard/sites/new"
						className="btn btn-secondary"
					>
						<Plus className="w-4 h-4" />
						Nouveau Site
					</Link>
				</div>
			</div>

			{/* Statistiques principales */}
			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-icon primary">
						<Globe />
					</div>
					<div className="stat-value">{totalSites}</div>
					<div className="stat-label">Sites Actifs</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon success">
						<Users />
					</div>
					<div className="stat-value">{totalUsers}</div>
					<div className="stat-label">Utilisateurs</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon warning">
						<BarChart />
					</div>
					<div className="stat-value">{totalVisits}</div>
					<div className="stat-label">Visites Total</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon danger">
						<LifeBuoy />
					</div>
					<div className="stat-value">{totalTickets}</div>
					<div className="stat-label">Tickets Support</div>
				</div>
			</div>

			{/* Actions rapides */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Link
					href="/dashboard/analytics"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<BarChart className="w-12 h-12 mx-auto mb-4 text-[#3b82f6]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Analytics SEO
						</h3>
						<p className="text-[#a0a0a0]">
							Suivez vos performances
						</p>
					</div>
				</Link>

				<Link
					href="/dashboard/invoices"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<CreditCard className="w-12 h-12 mx-auto mb-4 text-[#10b981]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Factures & Paiements
						</h3>
						<p className="text-[#a0a0a0]">Gérez vos abonnements</p>
					</div>
				</Link>

				<Link
					href="/dashboard/tickets"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<LifeBuoy className="w-12 h-12 mx-auto mb-4 text-[#f59e0b]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Support
						</h3>
						<p className="text-[#a0a0a0]">Créez des tickets</p>
					</div>
				</Link>
			</div>

			{/* Contenu principal en grille */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Sites actifs */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Mes Sites
							<Link
								href="/dashboard/sites"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{sites.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucun site pour le moment
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{sites.map((site) => (
									<div
										key={site.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{site.name}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{site.url}
											</p>
										</div>
										<div className="flex gap-2">
											<Link
												href={`/dashboard/sites/${site.id}`}
												className="btn btn-sm btn-secondary"
											>
												<Eye className="w-3 h-3" />
											</Link>
											<Link
												href={`/dashboard/sites/${site.id}/analytics`}
												className="btn btn-sm btn-primary"
											>
												<BarChart className="w-3 h-3" />
											</Link>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Abonnement actuel */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Mon Abonnement
							<Link
								href="/dashboard/subscription"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Gérer
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{subscription ? (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-[#a0a0a0]">
										Plan actuel
									</span>
									<span className="font-medium text-white">
										{subscription.planName}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-[#a0a0a0]">
										Statut
									</span>
									<span
										className={`badge ${
											subscription.status === "ACTIVE"
												? "badge-success"
												: subscription.status ===
												  "PENDING"
												? "badge-warning"
												: subscription.status ===
												  "CANCELLED"
												? "badge-danger"
												: "badge-neutral"
										}`}
									>
										{subscription.status}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-[#a0a0a0]">
										Prochaine facturation
									</span>
									<span className="text-white">
										{new Date(
											subscription.nextBillingDate
										).toLocaleDateString("fr-FR")}
									</span>
								</div>
							</div>
						) : (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucun abonnement actif
								</p>
								<Link
									href="/pricing"
									className="btn btn-primary mt-4"
								>
									Choisir un plan
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Tickets et Factures récents */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Tickets récents */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Mes Tickets Support
							<Link
								href="/dashboard/tickets"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{tickets.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucun ticket récent
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{tickets.map((ticket) => (
									<div
										key={ticket.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{ticket.title}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{ticket.description?.substring(
													0,
													50
												)}
												...
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span
												className={`badge ${
													ticket.status === "OPEN"
														? "badge-warning"
														: ticket.status ===
														  "IN_PROGRESS"
														? "badge-primary"
														: ticket.status ===
														  "RESOLVED"
														? "badge-success"
														: "badge-neutral"
												}`}
											>
												{ticket.status === "OPEN" ? (
													<Clock className="w-3 h-3" />
												) : ticket.status ===
												  "IN_PROGRESS" ? (
													<Activity className="w-3 h-3" />
												) : ticket.status ===
												  "RESOLVED" ? (
													<CheckCircle className="w-3 h-3" />
												) : (
													<AlertCircle className="w-3 h-3" />
												)}
												{ticket.status}
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Factures récentes */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Mes Factures
							<Link
								href="/dashboard/invoices"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{invoices.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucune facture récente
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{invoices.map((invoice) => (
									<div
										key={invoice.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{invoice.invoiceNumber}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{new Date(
													invoice.createdAt
												).toLocaleDateString("fr-FR")}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm text-white font-medium">
												{(invoice.amount / 100).toFixed(
													2
												)}
												€
											</span>
											<span
												className={`badge ${
													invoice.status === "PAID"
														? "badge-success"
														: invoice.status ===
														  "PENDING"
														? "badge-warning"
														: invoice.status ===
														  "OVERDUE"
														? "badge-danger"
														: "badge-neutral"
												}`}
											>
												{invoice.status}
											</span>
											<button className="btn btn-sm btn-secondary">
												<Download className="w-3 h-3" />
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Analytics récents */}
			<div className="card">
				<div className="card-header">
					<h3 className="card-title flex items-center gap-2">
						<BarChart className="w-5 h-5" />
						Analytics Récents
					</h3>
				</div>
				<div className="card-content">
					{analytics.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-[#a0a0a0]">
								Aucune donnée analytics disponible
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="text-2xl font-bold text-white mb-2">
									{totalVisits}
								</div>
								<div className="text-[#a0a0a0]">
									Visites Total
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white mb-2">
									{uniqueVisitors}
								</div>
								<div className="text-[#a0a0a0]">
									Visiteurs Uniques
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white mb-2">
									{totalSites}
								</div>
								<div className="text-[#a0a0a0]">
									Sites Actifs
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
