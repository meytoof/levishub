"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TicketForm } from "@/components/ui/ticket-form";
import {
	CheckCircle,
	ChevronDown,
	ChevronRight,
	Clock,
	MessageSquare,
	Plus,
	Reply,
	XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
	const [messageDrafts, setMessageDrafts] = useState<Record<string, string>>(
		{}
	);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [conversation, setConversation] = useState<
		Array<{
			id: string;
			body: string;
			createdAt: string;
			sender: {
				id: string;
				name: string | null;
				email: string | null;
				role: "ADMIN" | "CLIENT";
			};
		}>
	>([]);
	const [sending, setSending] = useState(false);

	// Animation modale (ouverture/fermeture)
	const [modalVisible, setModalVisible] = useState(false);
	const [modalClosing, setModalClosing] = useState(false);
	useEffect(() => {
		if (selectedTicket) {
			setModalVisible(true);
			setModalClosing(false);
		}
	}, [selectedTicket]);

	const closeModal = () => {
		setModalClosing(true);
		setTimeout(() => {
			setSelectedTicket(null);
			setModalVisible(false);
		}, 200);
	};

	// Scroll automatique en bas (modale)
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (selectedTicket && messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [selectedTicket, conversation]);

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

	const loadConversation = async (ticketId: string) => {
		try {
			const res = await fetch(`/api/tickets/${ticketId}/messages`);
			if (res.ok) {
				const data = await res.json();
				setConversation(data.messages);
			}
		} catch (e) {
			console.error("Erreur chargement conversation:", e);
		}
	};

	const sendMessage = async (ticketId: string) => {
		const body = (messageDrafts[ticketId] || "").trim();
		if (!body || sending) return;
		setSending(true);
		try {
			const res = await fetch(`/api/tickets/${ticketId}/messages`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ body }),
			});
			if (res.ok) {
				setMessageDrafts((prev) => ({ ...prev, [ticketId]: "" }));
				await loadConversation(ticketId);
				toast.success("Message envoyé");
			} else {
				toast.error("Envoi échoué");
			}
		} catch (e) {
			console.error("Erreur envoi message:", e);
			toast.error("Erreur lors de l'envoi du message");
		} finally {
			setSending(false);
		}
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
					className="flex items-center gap-2 btn-primary p-btn"
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
										<div className="flex items-center gap-2 ml-4">
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													setSelectedTicket(ticket);
													loadConversation(ticket.id);
												}}
												className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-700 p-btn"
											>
												<Reply className="w-3 h-3" />
												Répondre
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													toggleTicketExpansion(
														ticket.id
													)
												}
											>
												{isExpanded ? (
													<ChevronDown className="w-4 h-4" />
												) : (
													<ChevronRight className="w-4 h-4" />
												)}
											</Button>
										</div>
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
														"L&apos;équipe travaille sur votre demande"}
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
														notification dès
														qu&apos;il y aura une
														mise à jour.
													</p>
												</div>
											)}

											{status.label === "RESOLVED" && (
												<div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
													<p className="text-sm text-green-800 dark:text-green-200">
														✅ Votre demande a été
														résolue !
														<br />
														Si vous avez
														d&apos;autres questions,
														n&apos;hésitez pas à
														créer un nouveau ticket.
													</p>
												</div>
											)}

											{/* Composer de message */}
											<div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
												<h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
													Envoyer un message
													complémentaire
												</h4>
												<Textarea
													placeholder="Décrivez votre mise à jour..."
													value={
														messageDrafts[
															ticket.id
														] || ""
													}
													onChange={(e) =>
														setMessageDrafts(
															(prev) => ({
																...prev,
																[ticket.id]:
																	e.target
																		.value,
															})
														)
													}
													rows={3}
													className="mb-2"
													style={{ padding: 10 }}
												/>
												<div className="flex justify-end">
													<Button
														size="sm"
														className="btn-primary p-btn"
														onClick={() =>
															sendMessage(
																ticket.id
															)
														}
													>
														Envoyer
													</Button>
												</div>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						);
					})
				)}

				{/* Modale de conversation (client) */}
				{selectedTicket && (
					<div
						className={`fixed inset-0 flex items-start justify-center p-4 pt-24 z-[9999] transition-opacity duration-200 ${
							modalClosing
								? "bg-black/0"
								: "bg-black/60 backdrop-blur-sm"
						}`}
						onClick={closeModal}
					>
						<div
							className={`bg-gray-900 rounded-xl max-w-5xl w-[92vw] max-h-[90vh] overflow-hidden border border-gray-700 transition-all duration-200 ease-out transform ${
								modalVisible && !modalClosing
									? "opacity-100 translate-y-0 scale-100"
									: "opacity-0 translate-y-4 scale-95"
							}`}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-8">
								<div className="flex items-center justify-between mb-8">
									<div>
										<h2 className="text-xl font-bold text-white mb-2">
											💬 Conversation du ticket
										</h2>
										<p className="text-gray-400 text-sm">
											Ticket: {selectedTicket.title}
										</p>
									</div>
									<Button
										variant="outline"
										onClick={closeModal}
										className="border-gray-600 text-white hover:bg-gray-800 p-btn"
									>
										✕ Fermer
									</Button>
								</div>

								<div className="space-y-6">
									<div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
										<h3 className="font-semibold mb-3 text-white">
											📋 Détails
										</h3>
										<p className="text-gray-300 text-sm whitespace-pre-wrap">
											{selectedTicket.description}
										</p>
									</div>

									<div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
										<h3 className="font-semibold mb-4 text-white">
											💬 Messages
										</h3>
										{conversation.length === 0 ? (
											<p className="text-gray-400 text-sm">
												Aucun message pour l’instant.
											</p>
										) : (
											<div className="space-y-3 max-h-[36vh] overflow-y-auto pr-2">
												{conversation.map((m) => {
													const isAdmin =
														m.sender.role ===
														"ADMIN";
													return (
														<div
															key={m.id}
															className={`flex ${
																isAdmin
																	? "justify-end"
																	: "justify-start"
															}`}
														>
															<div
																className={`max-w-[80%] px-4 py-2 rounded-2xl border text-sm whitespace-pre-wrap ${
																	isAdmin
																		? "bg-blue-600 text-white border-blue-500 rounded-br-none"
																		: "bg-gray-900/60 text-gray-100 border-gray-700 rounded-bl-none"
																}`}
																style={{
																	padding: 10,
																}}
															>
																{m.body}
																<div
																	className={`mt-1 text-[11px] opacity-80 ${
																		isAdmin
																			? "text-white/80 text-right"
																			: "text-gray-400"
																	}`}
																>
																	{isAdmin
																		? "Admin"
																		: "Client"}{" "}
																	•{" "}
																	{new Date(
																		m.createdAt
																	).toLocaleString(
																		"fr-FR"
																	)}
																</div>
															</div>
														</div>
													);
												})}
												<div ref={messagesEndRef} />
											</div>
										)}
									</div>

									<div>
										<Textarea
											placeholder="Écrire un message..."
											value={
												messageDrafts[
													selectedTicket.id
												] || ""
											}
											onChange={(e) =>
												setMessageDrafts((prev) => ({
													...prev,
													[selectedTicket.id]:
														e.target.value,
												}))
											}
											onKeyDown={(e) => {
												if (
													e.key === "Enter" &&
													!e.shiftKey
												) {
													e.preventDefault();
													if (
														selectedTicket &&
														!sending
													) {
														sendMessage(
															selectedTicket.id
														);
													}
												}
											}}
											rows={3}
											className="mb-5"
											style={{
												padding: 10,
												marginBottom: 20,
											}}
										/>
										<div className="flex justify-end">
											<Button
												size="sm"
												className="bg-blue-600 hover:bg-blue-700 text-white py-3 p-btn"
												onClick={() =>
													sendMessage(
														selectedTicket.id
													)
												}
												disabled={
													sending ||
													!(
														messageDrafts[
															selectedTicket.id
														] || ""
													).trim()
												}
											>
												{sending
													? "Envoi..."
													: "Envoyer"}
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
