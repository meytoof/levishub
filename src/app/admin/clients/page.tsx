"use client";

import { StatefulButton } from "@/components/ui/stateful-button";
import {
	AlertCircle,
	ArrowLeft,
	Building2,
	Calendar,
	CheckCircle,
	Copy,
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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Client {
	id: string;
	name: string;
	companyName: string;
	primaryEmail: string;
	isActive: boolean;
	createdAt: string;
	users: { id: string; name: string; email: string }[];
	invitations: { id: string; email: string; token: string; status: string }[];
}

export default function ClientsPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [clients, setClients] = useState<Client[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [editingClient, setEditingClient] = useState<Client | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
		null
	);
	const [copiedToken, setCopiedToken] = useState<string | null>(null);

	// Vérifier l'authentification et les permissions
	useEffect(() => {
		if (status === "loading") return;

		if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
			router.push("/login");
			return;
		}

		fetchClients();
	}, [status, session, router]);

	const fetchClients = async () => {
		try {
			const response = await fetch("/api/admin/clients");
			if (response.ok) {
				const data = await response.json();
				setClients(data);
			} else {
				toast.error("Erreur lors du chargement des clients");
			}
		} catch (error) {
			toast.error("Erreur de connexion");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteClient = async (clientId: string) => {
		try {
			const response = await fetch(`/api/admin/clients/${clientId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				toast.success("Client supprimé avec succès");
				fetchClients();
			} else {
				const error = await response.json();
				toast.error(error.error || "Erreur lors de la suppression");
			}
		} catch (error) {
			toast.error("Erreur de connexion");
		}
		setShowDeleteConfirm(null);
	};

	const handleUpdateClient = async (clientId: string, data: any) => {
		try {
			const response = await fetch(`/api/admin/clients/${clientId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toast.success("Client mis à jour avec succès");
				setEditingClient(null);
				fetchClients();
			} else {
				const error = await response.json();
				toast.error(error.error || "Erreur lors de la mise à jour");
			}
		} catch (error) {
			toast.error("Erreur de connexion");
		}
	};

	const copyInvitationLink = async (token: string) => {
		const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3001";
		const invitationUrl = `${baseUrl}/invite/${token}`;

		try {
			await navigator.clipboard.writeText(invitationUrl);
			setCopiedToken(token);
			toast.success("Lien d'invitation copié !");
			setTimeout(() => setCopiedToken(null), 2000);
		} catch (error) {
			toast.error("Erreur lors de la copie");
		}
	};

	const filteredClients = clients.filter(
		(client) =>
			client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			client.companyName
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			client.primaryEmail.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (status === "loading" || loading) {
		return (
			<div className="loading">
				<div className="spinner"></div>
			</div>
		);
	}

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
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
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
					{filteredClients.length === 0 ? (
						<div className="text-center py-12">
							<Building2 className="w-16 h-16 mx-auto mb-4 text-[#666]" />
							<p className="text-[#a0a0a0] text-lg mb-2">
								{searchTerm
									? "Aucun client trouvé"
									: "Aucun client pour le moment"}
							</p>
							<p className="text-[#666] mb-4">
								{searchTerm
									? "Aucun client ne correspond à votre recherche."
									: "Commencez par créer votre premier client"}
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
									{filteredClients.map((client) => (
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
																client.users
																	.length
															}
														</span>
														<span className="text-[#a0a0a0]">
															utilisateurs
														</span>
													</div>
													<div className="flex items-center gap-1">
														<Mail className="w-3 h-3 text-[#10b981]" />
														<span className="text-white">
															{
																client
																	.invitations
																	.length
															}
														</span>
														<span className="text-[#a0a0a0]">
															invitations
														</span>
													</div>
													<div className="flex items-center gap-1">
														<Globe className="w-3 h-3 text-[#f59e0b]" />
														<span className="text-white">
															{client.isActive
																? "Actif"
																: "Inactif"}
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
													<button
														onClick={() =>
															setEditingClient(
																client
															)
														}
														className="btn btn-sm btn-primary"
														title="Modifier le client"
													>
														<Edit className="w-3 h-3" />
													</button>
													{/* Lien d'invitation pour admin uniquement */}
													{client.invitations.length >
														0 &&
														session?.user?.role ===
															"ADMIN" && (
															<button
																onClick={() =>
																	copyInvitationLink(
																		client
																			.invitations[0]
																			.token
																	)
																}
																className="btn btn-sm btn-secondary"
																title="Copier le lien d'invitation"
															>
																{copiedToken ===
																client
																	.invitations[0]
																	.token ? (
																	<CheckCircle className="w-3 h-3 text-[#10b981]" />
																) : (
																	<Copy className="w-3 h-3" />
																)}
															</button>
														)}
													<button
														onClick={() =>
															setShowDeleteConfirm(
																client.id
															)
														}
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
							(sum, client) => sum + client.users.length,
							0
						)}
					</div>
					<div className="stat-label">Utilisateurs Totaux</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon warning">
						<Mail />
					</div>
					<div className="stat-value">
						{clients.reduce(
							(sum, client) => sum + client.invitations.length,
							0
						)}
					</div>
					<div className="stat-label">Invitations Totales</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon danger">
						<CreditCard />
					</div>
					<div className="stat-value">
						{clients.filter((c) => c.isActive).length}
					</div>
					<div className="stat-label">Clients Actifs</div>
				</div>
			</div>

			{/* Modal d'édition */}
			{editingClient && (
				<div className="modal-overlay">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title">Modifier le client</h2>
							<p className="modal-subtitle">
								{editingClient.companyName}
							</p>
						</div>
						<div className="modal-body">
							<EditClientForm
								client={editingClient}
								onSave={(data) =>
									handleUpdateClient(editingClient.id, data)
								}
								onCancel={() => setEditingClient(null)}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Modal de confirmation de suppression */}
			{showDeleteConfirm && (
				<div className="modal-overlay">
					<div className="modal-content">
						<div className="modal-header">
							<h2 className="modal-title flex items-center gap-2">
								<AlertCircle className="w-5 h-5 text-[#ef4444]" />
								Confirmer la suppression
							</h2>
							<p className="modal-subtitle">
								Cette action est irréversible
							</p>
						</div>
						<div className="modal-body">
							<div className="alert alert-danger">
								Êtes-vous sûr de vouloir supprimer ce client ?
								Toutes les données associées seront également
								supprimées.
							</div>
							<div className="modal-actions">
								<button
									onClick={() => setShowDeleteConfirm(null)}
									className="btn btn-secondary"
								>
									Annuler
								</button>
								<StatefulButton
									onClick={() =>
										handleDeleteClient(showDeleteConfirm)
									}
									className="btn btn-danger"
								>
									Supprimer définitivement
								</StatefulButton>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// Composant de formulaire d'édition
function EditClientForm({
	client,
	onSave,
	onCancel,
}: {
	client: Client;
	onSave: (data: any) => void;
	onCancel: () => void;
}) {
	const [formData, setFormData] = useState({
		name: client.name,
		companyName: client.companyName,
		primaryEmail: client.primaryEmail,
		isActive: client.isActive,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="modal-section">
				<h3 className="modal-section-title">Informations générales</h3>
				<div className="form-group">
					<label className="form-label">Nom de l'entreprise</label>
					<input
						type="text"
						value={formData.companyName}
						onChange={(e) =>
							setFormData({
								...formData,
								companyName: e.target.value,
							})
						}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Nom du contact</label>
					<input
						type="text"
						value={formData.name}
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label className="form-label">Email principal</label>
					<input
						type="email"
						value={formData.primaryEmail}
						onChange={(e) =>
							setFormData({
								...formData,
								primaryEmail: e.target.value,
							})
						}
						className="form-input"
						required
					/>
				</div>
				<div className="form-group">
					<label className="form-label">
						<input
							type="checkbox"
							checked={formData.isActive}
							onChange={(e) =>
								setFormData({
									...formData,
									isActive: e.target.checked,
								})
							}
							className="form-checkbox"
						/>
						<span className="ml-2">Client actif</span>
					</label>
				</div>
			</div>
			<div className="modal-actions">
				<button
					type="button"
					onClick={onCancel}
					className="btn btn-secondary"
				>
					Annuler
				</button>
				<StatefulButton
					type="submit"
					onClick={handleSubmit}
					className="btn btn-primary"
				>
					Enregistrer les modifications
				</StatefulButton>
			</div>
		</form>
	);
}
