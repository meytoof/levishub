import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	Activity,
	AlertCircle,
	BarChart,
	CheckCircle,
	Clock,
	CreditCard,
	Edit,
	Eye,
	Plus,
	Trash2,
	TrendingUp,
	Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	const [
		users,
		clients,
		invitations,
		totalRevenue,
		recentTickets,
		recentInvoices,
	] = await Promise.all([
		prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: {
					select: { companyName: true },
				},
			},
		}),
		prisma.client.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
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
		prisma.invitation.findMany({
			where: { status: "PENDING" },
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: { select: { companyName: true } },
			},
		}),
		prisma.invoice.aggregate({
			where: { status: "PAID" },
			_sum: { amountPaid: true },
		}),
		prisma.ticket.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: { select: { companyName: true } },
				createdBy: { select: { name: true } },
			},
		}),
		prisma.invoice.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: { select: { companyName: true } },
			},
		}),
	]);

	const totalClients = clients.length;
	const totalUsers = users.length;
	const pendingInvitations = invitations.length;
	const revenue = totalRevenue._sum.amountPaid || 0;
	const totalTickets = recentTickets.length;
	const totalInvoices = recentInvoices.length;

	return (
		<>
			{/* Header avec actions rapides */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">
						Dashboard Administrateur
					</h1>
					<p className="text-[#a0a0a0]">
						Vue d'ensemble de votre plateforme et de vos clients
					</p>
				</div>
				<div className="flex gap-3">
					<Link href="/admin/clients/new" className="btn btn-primary">
						<Plus className="w-4 h-4" />
						Nouveau Client
					</Link>
				</div>
			</div>

			{/* Statistiques principales */}
			<div className="stats-grid">
				<div className="stat-card">
					<div className="stat-icon primary">
						<Users />
					</div>
					<div className="stat-value">{totalClients}</div>
					<div className="stat-label">Clients Actifs</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon success">
						<Users />
					</div>
					<div className="stat-value">{totalUsers}</div>
					<div className="stat-label">Utilisateurs Totaux</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon warning">
						<CreditCard />
					</div>
					<div className="stat-value">
						{(revenue / 100).toFixed(2)}€
					</div>
					<div className="stat-label">Revenus Totaux</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon danger">
						<Activity />
					</div>
					<div className="stat-value">{pendingInvitations}</div>
					<div className="stat-label">Invitations en Attente</div>
				</div>
			</div>

			{/* Actions rapides */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Link
					href="/admin/clients"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<Users className="w-12 h-12 mx-auto mb-4 text-[#3b82f6]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Gérer les Clients
						</h3>
						<p className="text-[#a0a0a0]">
							Créez et gérez vos clients
						</p>
					</div>
				</Link>

				<Link
					href="/admin/invitations"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<CreditCard className="w-12 h-12 mx-auto mb-4 text-[#10b981]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Invitations
						</h3>
						<p className="text-[#a0a0a0]">
							Gérez les invitations clients
						</p>
					</div>
				</Link>

				<Link
					href="/admin/analytics"
					className="card hover:transform hover:-translate-y-1 transition-all"
				>
					<div className="card-content text-center">
						<BarChart className="w-12 h-12 mx-auto mb-4 text-[#f59e0b]" />
						<h3 className="text-xl font-semibold text-white mb-2">
							Analytics
						</h3>
						<p className="text-[#a0a0a0]">
							Suivez vos performances
						</p>
					</div>
				</Link>
			</div>

			{/* Contenu principal en grille */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Derniers clients */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Derniers Clients
							<Link
								href="/admin/clients"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{clients.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucun client pour le moment
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{clients.map((client) => (
									<div
										key={client.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{client.companyName}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{client.primaryEmail}
											</p>
										</div>
										<div className="flex gap-2">
											<Link
												href={`/admin/clients/${client.id}`}
												className="btn btn-sm btn-secondary"
											>
												<Eye className="w-3 h-3" />
											</Link>
											<Link
												href={`/admin/clients/${client.id}/edit`}
												className="btn btn-sm btn-primary"
											>
												<Edit className="w-3 h-3" />
											</Link>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Invitations en attente */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center justify-between">
							Invitations en Attente
							<Link
								href="/admin/invitations"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{invitations.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucune invitation en attente
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{invitations.map((invitation) => (
									<div
										key={invitation.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{invitation.email}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{invitation.client.companyName}
											</p>
										</div>
										<div className="flex gap-2">
											<button className="btn btn-sm btn-success">
												<CheckCircle className="w-3 h-3" />
												Renvoyer
											</button>
											<button className="btn btn-sm btn-danger">
												<Trash2 className="w-3 h-3" />
											</button>
										</div>
									</div>
								))}
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
							Tickets Récents
							<Link
								href="/admin/tickets"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{recentTickets.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucun ticket récent
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{recentTickets.map((ticket) => (
									<div
										key={ticket.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{ticket.title}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{ticket.client.companyName} •{" "}
												{ticket.createdBy?.name}
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
							Factures Récentes
							<Link
								href="/admin/invoices"
								className="text-sm text-[#3b82f6] hover:underline"
							>
								Voir tout
							</Link>
						</h3>
					</div>
					<div className="card-content">
						{recentInvoices.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-[#a0a0a0]">
									Aucune facture récente
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{recentInvoices.map((invoice) => (
									<div
										key={invoice.id}
										className="flex items-center justify-between pb-3 border-b border-[#333] last:border-b-0"
									>
										<div>
											<span className="font-medium text-white">
												{invoice.stripeInvoiceId ??
													invoice.id}
											</span>
											<p className="text-sm text-[#a0a0a0]">
												{invoice.client.companyName}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-sm text-white font-medium">
												{(
													invoice.amountPaid / 100
												).toFixed(2)}
												€
											</span>
											<span
												className={`badge ${
													invoice.status === "PAID"
														? "badge-success"
														: invoice.status ===
																"OPEN" ||
														  invoice.status ===
																"DRAFT"
														? "badge-warning"
														: invoice.status ===
																"VOID" ||
														  invoice.status ===
																"UNCOLLECTIBLE"
														? "badge-danger"
														: "badge-neutral"
												}`}
											>
												{invoice.status}
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Graphique de tendance */}
			<div className="card">
				<div className="card-header">
					<h3 className="card-title flex items-center gap-2">
						<TrendingUp className="w-5 h-5" />
						Évolution des Clients
					</h3>
				</div>
				<div className="card-content">
					<div className="text-center py-12">
						<BarChart className="w-16 h-16 mx-auto mb-4 text-[#666]" />
						<p className="text-[#a0a0a0]">
							Graphique d'évolution à venir
						</p>
						<p className="text-sm text-[#666]">
							Intégration des analytics en cours
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
