"use client";

import { BackofficeLayout } from "@/components/ui/backoffice-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Client {
	id: string;
	name: string;
	companyName: string;
	primaryEmail: string;
	isActive: boolean;
	createdAt: string;
	users: Array<{
		id: string;
		name: string;
		email: string;
		role: string;
	}>;
	_count: {
		sites: number;
		tickets: number;
		invoices: number;
	};
}

export default function AdminClientsPage() {
	const [clients, setClients] = useState<Client[]>([]);
	const [loading, setLoading] = useState(true);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		companyName: "",
		primaryEmail: "",
	});
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		fetchClients();
	}, []);

	async function fetchClients() {
		try {
			const response = await fetch("/api/admin/clients");
			if (response.ok) {
				const data = await response.json();
				setClients(data);
			}
		} catch (error) {
			console.error("Erreur lors de la récupération des clients:", error);
		} finally {
			setLoading(false);
		}
	}

	async function handleCreateClient(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/admin/clients", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setFormData({ name: "", companyName: "", primaryEmail: "" });
				setShowCreateForm(false);
				fetchClients();
			} else {
				const error = await response.json();
				alert(error.error || "Erreur lors de la création");
			}
		} catch (error) {
			console.error("Erreur:", error);
			alert("Erreur lors de la création du client");
		} finally {
			setSubmitting(false);
		}
	}

	if (loading) {
		return (
			<BackofficeLayout userRole="ADMIN">
				<div className="backoffice-container py-8">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-muted-foreground">
							Chargement des clients...
						</p>
					</div>
				</div>
			</BackofficeLayout>
		);
	}

	return (
		<BackofficeLayout userRole="ADMIN">
			<div className="backoffice-container py-8">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold text-foreground">
							Gestion des clients
						</h2>
						<p className="text-sm text-muted-foreground">
							Créez et gérez vos clients
						</p>
					</div>
					<Button
						onClick={() => setShowCreateForm(!showCreateForm)}
						className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md"
					>
						{showCreateForm ? "Annuler" : "Nouveau client"}
					</Button>
				</div>

				{showCreateForm && (
					<div className="backoffice-card animate-fade-in">
						<div className="backoffice-card-header">
							<h3 className="backoffice-card-title">
								Créer un nouveau client
							</h3>
						</div>
						<form
							onSubmit={handleCreateClient}
							className="space-y-6"
						>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="backoffice-label"
									>
										Nom du contact
									</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										required
										placeholder="Nom du contact principal"
										className="backoffice-input"
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="companyName"
										className="backoffice-label"
									>
										Nom de l'entreprise
									</Label>
									<Input
										id="companyName"
										value={formData.companyName}
										onChange={(e) =>
											setFormData({
												...formData,
												companyName: e.target.value,
											})
										}
										required
										placeholder="Nom de l'entreprise"
										className="backoffice-input"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="primaryEmail"
									className="backoffice-label"
								>
									Email principal
								</Label>
								<Input
									id="primaryEmail"
									type="email"
									value={formData.primaryEmail}
									onChange={(e) =>
										setFormData({
											...formData,
											primaryEmail: e.target.value,
										})
									}
									required
									placeholder="email@entreprise.com"
									className="backoffice-input"
								/>
							</div>
							<div className="flex gap-3">
								<Button
									type="submit"
									disabled={submitting}
									className="backoffice-btn backoffice-btn-primary"
								>
									{submitting
										? "Création..."
										: "Créer le client"}
								</Button>
								<Button
									type="button"
									onClick={() => setShowCreateForm(false)}
									className="backoffice-btn backoffice-btn-outline"
								>
									Annuler
								</Button>
							</div>
						</form>
					</div>
				)}

				<div className="backoffice-card">
					<div className="backoffice-card-header">
						<h3 className="backoffice-card-title">
							Liste des clients ({clients.length})
						</h3>
					</div>
					{clients.length === 0 ? (
						<div className="text-center py-12">
							<div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
								<Users className="h-12 w-12" />
							</div>
							<p className="text-muted-foreground mb-2">
								Aucun client créé pour le moment
							</p>
							<p className="text-sm text-muted-foreground">
								Commencez par créer votre premier client
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{clients.map((client) => (
								<div
									key={client.id}
									className="rounded-lg border border-border p-6 hover:bg-muted/30 transition-all duration-200"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-foreground mb-2">
												{client.companyName}
											</h3>
											<p className="text-muted-foreground mb-3">
												Contact: {client.name} (
												{client.primaryEmail})
											</p>
											<div className="flex flex-wrap gap-4 text-sm">
												<div className="flex items-center gap-2">
													<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-info/10 text-info border border-info/20">
														{client._count.users}{" "}
														utilisateurs
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-success/10 text-success border border-success/20">
														{client._count.sites}{" "}
														sites
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-warning/10 text-warning border border-warning/20">
														{client._count.tickets}{" "}
														tickets
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-info/10 text-info border border-info/20">
														{client._count.invoices}{" "}
														factures
													</span>
												</div>
											</div>
										</div>
										<div className="flex gap-2">
											<Button
												asChild
												size="sm"
												className="backoffice-btn backoffice-btn-outline"
											>
												<Link
													href={`/admin/clients/${client.id}`}
												>
													Détails
												</Link>
											</Button>
											<Button
												asChild
												size="sm"
												className="backoffice-btn backoffice-btn-primary"
											>
												<Link
													href={`/admin/clients/${client.id}/invite`}
												>
													Inviter
												</Link>
											</Button>
										</div>
									</div>
									<div className="mt-4 pt-4 border-t border-border">
										<p className="text-xs text-muted-foreground">
											Créé le{" "}
											{new Date(
												client.createdAt
											).toLocaleDateString("fr-FR")}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</BackofficeLayout>
	);
}
