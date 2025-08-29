import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
	ArrowLeft,
	Building2,
	Calendar,
	CreditCard,
	Edit,
	Eye,
	Filter,
	Globe,
	Mail,
	Plus,
	Search,
	Trash2,
	Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	const clients = await prisma.client.findMany({
		orderBy: { createdAt: "desc" },
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
	});

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
							Gestion des Clients
						</h1>
						<p className="text-[#a0a0a0]">
							{clients.length} client
							{clients.length > 1 ? "s" : ""} actif
							{clients.length > 1 ? "s" : ""}
						</p>
					</div>
				</div>
				<Link href="/admin/clients/new" className="btn btn-primary">
					<Plus className="w-4 h-4" />
					Nouveau Client
				</Link>
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
									placeholder="Rechercher un client..."
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
								<option>Tous les statuts</option>
								<option>Actif</option>
								<option>Inactif</option>
								<option>En attente</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Liste des clients */}
			<div className="card">
				<div className="card-header">
					<h3 className="card-title">Clients</h3>
				</div>
				<div className="card-content p-0">
					{clients.length === 0 ? (
						<div className="text-center py-12">
							<Building2 className="w-16 h-16 mx-auto mb-4 text-[#666]" />
							<p className="text-[#a0a0a0] text-lg mb-2">
								Aucun client pour le moment
							</p>
							<p className="text-[#666] mb-4">
								Commencez par créer votre premier client
							</p>
							<Link
								href="/admin/clients/new"
								className="btn btn-primary"
							>
								<Plus className="w-4 h-4" />
								Créer un Client
							</Link>
						</div>
					) : (
						<div className="table-container">
							<table className="table">
								<thead>
									<tr>
										<th>Client</th>
										<th>Contact</th>
										<th>Statistiques</th>
										<th>Dernière activité</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{clients.map((client) => (
										<tr key={client.id}>
											<td>
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center text-white font-bold">
														{client.companyName.charAt(
															0
														)}
													</div>
													<div>
														<div className="font-medium text-white">
															{client.companyName}
														</div>
														<div className="text-sm text-[#a0a0a0]">
															ID:{" "}
															{client.id.slice(
																-8
															)}
														</div>
													</div>
												</div>
											</td>
											<td>
												<div className="text-sm">
													<div className="text-white">
														{client.primaryEmail}
													</div>
													<div className="text-[#a0a0a0]">
														{client.name}
													</div>
												</div>
											</td>
											<td>
												<div className="flex items-center gap-4 text-sm">
													<div className="flex items-center gap-1">
														<Users className="w-3 h-3 text-[#3b82f6]" />
														<span className="text-white">
															{
																client._count
																	.users
															}
														</span>
														<span className="text-[#a0a0a0]">
															utilisateurs
														</span>
													</div>
													<div className="flex items-center gap-1">
														<Globe className="w-3 h-3 text-[#10b981]" />
														<span className="text-white">
															{
																client._count
																	.sites
															}
														</span>
														<span className="text-[#a0a0a0]">
															sites
														</span>
													</div>
													<div className="flex items-center gap-1">
														<CreditCard className="w-3 h-3 text-[#f59e0b]" />
														<span className="text-white">
															{
																client._count
																	.invoices
															}
														</span>
														<span className="text-[#a0a0a0]">
															factures
														</span>
													</div>
												</div>
											</td>
											<td>
												<div className="text-sm text-[#a0a0a0]">
													<Calendar className="w-3 h-3 inline mr-1" />
													{new Date(
														client.createdAt
													).toLocaleDateString(
														"fr-FR"
													)}
												</div>
											</td>
											<td>
												<div className="flex items-center gap-2">
													<Link
														href={`/admin/clients/${client.id}`}
														className="btn btn-sm btn-secondary"
														title="Voir le client"
													>
														<Eye className="w-3 h-3" />
													</Link>
													<Link
														href={`/admin/clients/${client.id}/edit`}
														className="btn btn-sm btn-primary"
														title="Modifier le client"
													>
														<Edit className="w-3 h-3" />
													</Link>
													<button
														className="btn btn-sm btn-secondary"
														title="Envoyer un email"
													>
														<Mail className="w-3 h-3" />
													</button>
													<button
														className="btn btn-sm btn-danger"
														title="Supprimer le client"
													>
														<Trash2 className="w-3 h-3" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{/* Statistiques globales */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
				<div className="stat-card">
					<div className="stat-icon primary">
						<Building2 />
					</div>
					<div className="stat-value">{clients.length}</div>
					<div className="stat-label">Clients Totaux</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon success">
						<Users />
					</div>
					<div className="stat-value">
						{clients.reduce(
							(sum, client) => sum + client._count.users,
							0
						)}
					</div>
					<div className="stat-label">Utilisateurs Totaux</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon warning">
						<Globe />
					</div>
					<div className="stat-value">
						{clients.reduce(
							(sum, client) => sum + client._count.sites,
							0
						)}
					</div>
					<div className="stat-label">Sites Totaux</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon danger">
						<CreditCard />
					</div>
					<div className="stat-value">
						{clients.reduce(
							(sum, client) => sum + client._count.invoices,
							0
						)}
					</div>
					<div className="stat-label">Factures Totales</div>
				</div>
			</div>
		</>
	);
}
