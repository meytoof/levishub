"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TicketForm } from "@/components/ui/ticket-form";
import {
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Clock,
	MessageSquare,
	Plus,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Ticket {
	id: string;
	title: string;
	description: string;
	status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
	priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
	createdAt: string;
	updatedAt: string;
	client: {
		companyName: string;
		primaryEmail: string;
	};
}

const statusConfig = {
	OPEN: { label: "Ouvert", icon: Clock, color: "bg-blue-100 text-blue-800" },
	IN_PROGRESS: {
		label: "En cours",
		icon: MessageSquare,
		color: "bg-yellow-100 text-yellow-800",
	},
	RESOLVED: {
		label: "Résolu",
		icon: CheckCircle,
		color: "bg-green-100 text-green-800",
	},
	CLOSED: {
		label: "Fermé",
		icon: XCircle,
		color: "bg-gray-100 text-gray-800",
	},
};

const priorityConfig = {
	LOW: { label: "Faible", color: "bg-green-100 text-green-800" },
	MEDIUM: { label: "Moyenne", color: "bg-yellow-100 text-yellow-800" },
	HIGH: { label: "Élevée", color: "bg-orange-100 text-orange-800" },
	URGENT: { label: "Urgente", color: "bg-red-100 text-red-800" },
};

export default function ClientTicketsPage() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [filter, setFilter] = useState<string>("all");
	const [expandedTickets, setExpandedTickets] = useState<Set<string>>(
		new Set()
	);

	// Charger les tickets
	const loadTickets = async () => {
		try {
			const response = await fetch("/api/tickets");
			if (response.ok) {
				const data = await response.json();
				setTickets(data.tickets);
			}
		} catch (error) {
			console.error("Erreur chargement tickets:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTickets();
	}, []);

	// Filtrer les tickets
	const filteredTickets = tickets.filter((ticket) => {
		if (filter === "all") return true;
		return ticket.status === filter;
	});

	// Statistiques
	const stats = {
		total: tickets.length,
		open: tickets.filter((t) => t.status === "OPEN").length,
		inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,
		resolved: tickets.filter((t) => t.status === "RESOLVED").length,
		closed: tickets.filter((t) => t.status === "CLOSED").length,
	};

	const handleTicketCreated = () => {
		loadTickets();
		setShowForm(false);
	};

	const toggleTicketExpansion = (ticketId: string) => {
		const newExpanded = new Set(expandedTickets);
		if (newExpanded.has(ticketId)) {
			newExpanded.delete(ticketId);
		} else {
			newExpanded.add(ticketId);
		}
		setExpandedTickets(newExpanded);
	};

	if (loading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">
						🎫 Mes Tickets de Support
					</h1>
				</div>
				<div className="text-center py-12">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-muted-foreground">
						Chargement des tickets...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">
					🎫 Mes Tickets de Support
				</h1>
				<Button
					onClick={() => setShowForm(!showForm)}
					className="flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					{showForm ? "Masquer le formulaire" : "Nouveau ticket"}
				</Button>
			</div>

			{/* Formulaire de création */}
			{showForm && (
				<div className="mb-8">
					<TicketForm onTicketCreated={handleTicketCreated} />
				</div>
			)}

			{/* Statistiques */}
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-blue-600">
							{stats.total}
						</div>
						<div className="text-sm text-muted-foreground">
							Total
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-blue-600">
							{stats.open}
						</div>
						<div className="text-sm text-muted-foreground">
							En attente
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-yellow-600">
							{stats.inProgress}
						</div>
						<div className="text-sm text-muted-foreground">
							En cours
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-green-600">
							{stats.resolved}
						</div>
						<div className="text-sm text-muted-foreground">
							Résolus
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-gray-600">
							{stats.closed}
						</div>
						<div className="text-sm text-muted-foreground">
							Fermés
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filtres */}
			<div className="flex gap-2">
				<Button
					variant={filter === "all" ? "default" : "outline"}
					onClick={() => setFilter("all")}
				>
					Tous ({stats.total})
				</Button>
				<Button
					variant={filter === "OPEN" ? "default" : "outline"}
					onClick={() => setFilter("OPEN")}
				>
					En attente ({stats.open})
				</Button>
				<Button
					variant={filter === "IN_PROGRESS" ? "default" : "outline"}
					onClick={() => setFilter("IN_PROGRESS")}
				>
					En cours ({stats.inProgress})
				</Button>
				<Button
					variant={filter === "RESOLVED" ? "default" : "outline"}
					onClick={() => setFilter("RESOLVED")}
				>
					Résolus ({stats.resolved})
				</Button>
				<Button
					variant={filter === "CLOSED" ? "default" : "outline"}
					onClick={() => setFilter("CLOSED")}
				>
					Fermés ({stats.closed})
				</Button>
			</div>

			{/* Liste des tickets avec conversations */}
			<div className="space-y-4">
				{filteredTickets.length === 0 ? (
					<Card>
						<CardContent className="p-8 text-center">
							<MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">
								{filter === "all"
									? "Aucun ticket"
									: "Aucun ticket dans cette catégorie"}
							</h3>
							<p className="text-muted-foreground">
								{filter === "all"
									? "Vous n'avez pas encore créé de ticket de support."
									: "Aucun ticket ne correspond à ce filtre."}
							</p>
							{filter === "all" && (
								<Button
									onClick={() => setShowForm(true)}
									className="mt-4"
								>
									Créer votre premier ticket
								</Button>
							)}
						</CardContent>
					</Card>
				) : (
					filteredTickets.map((ticket) => {
						const status = statusConfig[ticket.status];
						const priority = priorityConfig[ticket.priority];
						const StatusIcon = status.icon;
						const isExpanded = expandedTickets.has(ticket.id);

						return (
							<Card
								key={ticket.id}
								className="hover:shadow-md transition-shadow"
							>
								<CardContent className="p-6">
									{/* En-tête du ticket */}
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-3">
												<h3 className="text-lg font-semibold">
													{ticket.title}
												</h3>
												<Badge className={status.color}>
													<StatusIcon className="w-3 h-3 mr-1" />
													{status.label}
												</Badge>
												<Badge
													className={priority.color}
												>
													{priority.label}
												</Badge>
											</div>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span>
													Crée le{" "}
													{new Date(
														ticket.createdAt
													).toLocaleDateString(
														"fr-FR"
													)}
												</span>
												{ticket.updatedAt !==
													ticket.createdAt && (
													<span>
														Mis à jour le{" "}
														{new Date(
															ticket.updatedAt
														).toLocaleDateString(
															"fr-FR"
														)}
													</span>
												)}
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												toggleTicketExpansion(ticket.id)
											}
											className="ml-4"
										>
											{isExpanded ? (
												<ChevronDown className="w-4 h-4" />
											) : (
												<ChevronRight className="w-4 h-4" />
											)}
										</Button>
									</div>

									{/* Contenu détaillé (expandable) */}
									{isExpanded && (
										<div className="border-t pt-4 space-y-4">
											{/* Description initiale */}
											<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
												<h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
													Votre demande initiale :
												</h4>
												<p className="text-gray-600 dark:text-gray-400">
													{ticket.description}
												</p>
											</div>

											{/* Statut actuel */}
											<div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
												<div>
													<span className="font-medium">
														Statut actuel :{" "}
													</span>
													<span className="text-blue-600 dark:text-blue-400">
														{status.label}
													</span>
												</div>
												<div className="text-sm text-gray-500">
													{status.label === "OPEN" &&
														"En attente de réponse de l'équipe"}
													{status.label ===
														"IN_PROGRESS" &&
														"L'équipe travaille sur votre demande"}
													{status.label ===
														"RESOLVED" &&
														"Votre demande a été résolue"}
													{status.label ===
														"CLOSED" &&
														"Ticket fermé"}
												</div>
											</div>

											{/* Actions selon le statut */}
											{status.label === "OPEN" && (
												<div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
													<p className="text-sm text-yellow-800 dark:text-yellow-200">
														⏳ Votre ticket est en
														attente de traitement
														par notre équipe.
														<br />
														Nous vous répondrons
														dans les plus brefs
														délais.
													</p>
												</div>
											)}

											{status.label === "IN_PROGRESS" && (
												<div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
													<p className="text-sm text-blue-800 dark:text-blue-200">
														🔄 Notre équipe
														travaille actuellement
														sur votre demande.
														<br />
														Vous recevrez une
														notification dès qu'il y
														aura une mise à jour.
													</p>
												</div>
											)}

											{status.label === "RESOLVED" && (
												<div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
													<p className="text-sm text-green-800 dark:text-green-200">
														✅ Votre demande a été
														résolue !
														<br />
														Si vous avez d'autres
														questions, n'hésitez pas
														à créer un nouveau
														ticket.
													</p>
												</div>
											)}
										</div>
									)}
								</CardContent>
							</Card>
						);
					})
				)}
			</div>
		</div>
	);
}
