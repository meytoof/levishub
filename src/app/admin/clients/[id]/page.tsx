"use client";

import { StatefulButton } from "@/components/ui/stateful-button";
import {
	AlertCircle,
	ArrowLeft,
	Building2,
	CheckCircle,
	Copy,
	CreditCard,
	Edit,
	Globe,
	Mail,
	Ticket,
	Trash2,
	Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Client {
	id: string;
	name: string;
	companyName: string;
	primaryEmail: string;
	isActive: boolean;
	createdAt: string;
	users: {
		id: string;
		name: string;
		email: string;
		role: string;
		createdAt: string;
	}[];
	invitations: {
		id: string;
		email: string;
		token: string;
		status: string;
		expiresAt: string;
		createdAt: string;
	}[];
	tickets: {
		id: string;
		title: string;
		status: string;
		priority: string;
		createdAt: string;
	}[];
	sites: {
		id: string;
		name: string;
		domain: string;
		isActive: boolean;
		createdAt: string;
	}[];
	invoices: {
		id: string;
		status: string;
		amountDue: number;
		amountPaid: number;
		createdAt: string;
	}[];
}

export default function ClientDetailPage() {
	const router = useRouter();
	const params = useParams();
	const { data: session, status } = useSession();
	const [client, setClient] = useState<Client | null>(null);
	const [loading, setLoading] = useState(true);
	const [copiedToken, setCopiedToken] = useState<string | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	// Vérifier l'authentification et les permissions
	useEffect(() => {
		if (status === "loading") return;

		if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
			router.push("/login");
			return;
		}

		if (params.id) {
			fetchClient();
		}
	}, [status, session, router, params.id]);

	const fetchClient = async () => {
		try {
			const response = await fetch(`/api/admin/clients/${params.id}`);
			if (response.ok) {
				const data = await response.json();
				setClient(data);
			} else {
				toast.error("Client non trouvé");
				router.push("/admin/clients");
			}
		} catch (error) {
			toast.error("Erreur de connexion");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteClient = async () => {
		try {
			const response = await fetch(`/api/admin/clients/${params.id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				toast.success("Client supprimé avec succès");
				router.push("/admin/clients");
			} else {
				const error = await response.json();
				toast.error(error.error || "Erreur lors de la suppression");
			}
		} catch (error) {
			toast.error("Erreur de connexion");
		}
		setShowDeleteConfirm(false);
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

	const getStatusColor = (status: string) => {
		switch (status) {
			case "PENDING":
				return "badge-warning";
			case "ACCEPTED":
				return "badge-success";
			case "EXPIRED":
				return "badge-danger";
			default:
				return "badge-neutral";
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "LOW":
				return "badge-success";
			case "MEDIUM":
				return "badge-warning";
			case "HIGH":
				return "badge-danger";
			case "URGENT":
				return "badge-danger";
			default:
				return "badge-neutral";
		}
	};

	if (status === "loading" || loading) {
		return (
			<div className="loading">
				<div className="spinner"></div>
			</div>
		);
	}

	if (!client) {
		return null;
	}

	return (
		<>
			{/* Header avec navigation */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/admin/clients" className="btn btn-secondary">
						<ArrowLeft className="w-4 h-4" />
						Retour
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">
							{client.companyName}
						</h1>
						<p className="text-[#a0a0a0]">Détails du client</p>
					</div>
				</div>
				<div className="flex gap-2">
					<button
						onClick={() =>
							router.push(`/admin/clients/${client.id}/edit`)
						}
						className="btn btn-primary"
					>
						<Edit className="w-4 h-4" />
						Modifier
					</button>
					<button
						onClick={() => setShowDeleteConfirm(true)}
						className="btn btn-danger"
					>
						<Trash2 className="w-4 h-4" />
						Supprimer
					</button>
				</div>
			</div>

			{/* Statistiques */}
			<div className="stats-grid mb-8">
				<div className="stat-card">
					<div className="stat-icon primary">
						<Users />
					</div>
					<div className="stat-value">{client.users.length}</div>
					<div className="stat-label">Utilisateurs</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon warning">
						<Ticket />
					</div>
					<div className="stat-value">{client.tickets.length}</div>
					<div className="stat-label">Tickets</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon success">
						<Globe />
					</div>
					<div className="stat-value">{client.sites.length}</div>
					<div className="stat-label">Sites</div>
				</div>
				<div className="stat-card">
					<div className="stat-icon danger">
						<CreditCard />
					</div>
					<div className="stat-value">{client.invoices.length}</div>
					<div className="stat-label">Factures</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Informations du client */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center gap-2">
							<Building2 className="w-5 h-5" />
							Informations du client
						</h3>
					</div>
					<div className="card-content">
						<div className="space-y-4">
							<div>
								<label className="form-label">
									Nom de l'entreprise
								</label>
								<p className="text-white font-medium">
									{client.companyName}
								</p>
							</div>
							<div>
								<label className="form-label">
									Contact principal
								</label>
								<p className="text-white font-medium">
									{client.name}
								</p>
							</div>
							<div>
								<label className="form-label">
									Email principal
								</label>
								<p className="text-white font-medium">
									{client.primaryEmail}
								</p>
							</div>
							<div>
								<label className="form-label">Statut</label>
								<div className="mt-1">
									{client.isActive ? (
										<span className="badge badge-success">
											Actif
										</span>
									) : (
										<span className="badge badge-danger">
											Inactif
										</span>
									)}
								</div>
							</div>
							<div>
								<label className="form-label">
									Date de création
								</label>
								<p className="text-[#a0a0a0]">
									{new Date(
										client.createdAt
									).toLocaleDateString("fr-FR")}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Invitations */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center gap-2">
							<Mail className="w-5 h-5" />
							Invitations ({client.invitations.length})
						</h3>
					</div>
					<div className="card-content">
						{client.invitations.length === 0 ? (
							<p className="text-[#a0a0a0] text-center py-4">
								Aucune invitation
							</p>
						) : (
							<div className="space-y-3">
								{client.invitations.map((invitation) => (
									<div
										key={invitation.id}
										className="flex items-center justify-between p-3 bg-[#222] rounded-lg border border-[#333]"
									>
										<div className="flex-1">
											<p className="text-sm font-medium text-white">
												{invitation.email}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<span
													className={`badge ${getStatusColor(
														invitation.status
													)}`}
												>
													{invitation.status}
												</span>
												<span className="text-xs text-[#666]">
													Expire le{" "}
													{new Date(
														invitation.expiresAt
													).toLocaleDateString(
														"fr-FR"
													)}
												</span>
											</div>
										</div>
										{/* Lien d'invitation pour admin uniquement */}
										{session?.user?.role === "ADMIN" && (
											<button
												onClick={() =>
													copyInvitationLink(
														invitation.token
													)
												}
												className="btn btn-sm btn-secondary"
												title="Copier le lien d'invitation"
											>
												{copiedToken ===
												invitation.token ? (
													<CheckCircle className="w-4 h-4 text-[#10b981]" />
												) : (
													<Copy className="w-4 h-4" />
												)}
											</button>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Utilisateurs */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center gap-2">
							<Users className="w-5 h-5" />
							Utilisateurs ({client.users.length})
						</h3>
					</div>
					<div className="card-content">
						{client.users.length === 0 ? (
							<p className="text-[#a0a0a0] text-center py-4">
								Aucun utilisateur
							</p>
						) : (
							<div className="space-y-3">
								{client.users.map((user) => (
									<div
										key={user.id}
										className="flex items-center justify-between p-3 bg-[#222] rounded-lg border border-[#333]"
									>
										<div>
											<p className="text-sm font-medium text-white">
												{user.name}
											</p>
											<p className="text-xs text-[#666]">
												{user.email} • {user.role}
											</p>
										</div>
										<span className="text-xs text-[#666]">
											{new Date(
												user.createdAt
											).toLocaleDateString("fr-FR")}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Tickets récents */}
				<div className="card">
					<div className="card-header">
						<h3 className="card-title flex items-center gap-2">
							<Ticket className="w-5 h-5" />
							Tickets récents ({client.tickets.length})
						</h3>
					</div>
					<div className="card-content">
						{client.tickets.length === 0 ? (
							<p className="text-[#a0a0a0] text-center py-4">
								Aucun ticket
							</p>
						) : (
							<div className="space-y-3">
								{client.tickets.map((ticket) => (
									<div
										key={ticket.id}
										className="flex items-center justify-between p-3 bg-[#222] rounded-lg border border-[#333]"
									>
										<div className="flex-1">
											<p className="text-sm font-medium text-white">
												{ticket.title}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<span
													className={`badge ${getPriorityColor(
														ticket.priority
													)}`}
												>
													{ticket.priority}
												</span>
												<span className="text-xs text-[#666]">
													{ticket.status}
												</span>
											</div>
										</div>
										<span className="text-xs text-[#666]">
											{new Date(
												ticket.createdAt
											).toLocaleDateString("fr-FR")}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

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
								Êtes-vous sûr de vouloir supprimer le client{" "}
								<strong>{client.companyName}</strong> ? Toutes
								les données associées seront également
								supprimées.
							</div>
							<div className="modal-actions">
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="btn btn-secondary"
								>
									Annuler
								</button>
								<StatefulButton
									onClick={handleDeleteClient}
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
