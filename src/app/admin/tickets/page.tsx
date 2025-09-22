"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	CheckCircle,
	Clock,
	MessageSquare,
	Reply,
	Trash2,
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
		id: string;
		companyName: string;
		primaryEmail: string;
	};
	createdBy: {
		id: string;
		name: string;
		email: string;
	};
}

const statusConfig = {
	OPEN: { label: "Ouvert", icon: Clock, color: "bg-blue-200 text-blue-900" },
	IN_PROGRESS: {
		label: "En cours",
		icon: MessageSquare,
		color: "bg-yellow-200 text-yellow-900",
	},
	RESOLVED: {
		label: "Résolu",
		icon: CheckCircle,
		color: "bg-green-200 text-green-900",
	},
	CLOSED: {
		label: "Fermé",
		icon: XCircle,
		color: "bg-gray-200 text-gray-900",
	},
};

const priorityConfig = {
	LOW: { label: "Faible", color: "bg-green-200 text-green-900" },
	MEDIUM: { label: "Moyenne", color: "bg-yellow-200 text-yellow-900" },
	HIGH: { label: "Élevée", color: "bg-orange-200 text-orange-900" },
	URGENT: { label: "Urgente", color: "bg-red-200 text-red-900" },
};

export default function AdminTicketsPage() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [adminReply, setAdminReply] = useState("");
	const [updating, setUpdating] = useState(false);
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

	// Animation modale
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

	// Scroll automatique en bas de la liste de messages
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
		const matchesSearch =
			ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			ticket.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			ticket.client.companyName
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

		return matchesSearch;
	});

	// Statistiques
	const stats = {
		total: tickets.length,
		open: tickets.filter((t) => t.status === "OPEN").length,
		inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,
		resolved: tickets.filter((t) => t.status === "RESOLVED").length,
		closed: tickets.filter((t) => t.status === "CLOSED").length,
		urgent: tickets.filter((t) => t.priority === "URGENT").length,
	};

	// Répondre à un ticket
    const replyToTicket = async (ticketId: string, newStatus: string) => {
        if (!adminReply.trim()) {
            alert("Veuillez saisir une réponse avant de mettre à jour le statut.");
            return;
        }

		setUpdating(true);
		try {
			const response = await fetch(`/api/tickets/${ticketId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status: newStatus,
					adminMessage: adminReply.trim(),
				}),
			});

			if (response.ok) {
				await loadTickets();
				await loadConversation(ticketId);
				setAdminReply("");
				toast.success("Réponse envoyée avec succès");
			}
		} catch (error) {
			console.error("Erreur mise à jour ticket:", error);
			toast.error("Erreur lors de l'envoi de la réponse");
		} finally {
			setUpdating(false);
		}
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

	// Supprimer un ticket
	const deleteTicket = async (ticketId: string) => {
		if (!confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) return;

		try {
			const response = await fetch(`/api/tickets/${ticketId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				await loadTickets();
				toast.success("Ticket supprimé");
			}
		} catch (error) {
			console.error("Erreur suppression ticket:", error);
			toast.error("Erreur lors de la suppression du ticket");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<div className="spinner mx-auto mb-4"></div>
					<p className="text-muted-foreground">
						Chargement des tickets...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-8">
			{/* Header compact avec titre et statistiques en ligne */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
				<div>
					<h1 className="text-2xl font-bold text-white">
						🎫 Tickets Support
					</h1>
					<p className="text-muted-foreground">
						{filteredTickets.length} ticket(s) sur {tickets.length}{" "}
						total
					</p>
				</div>

				{/* Statistiques épurées */}
				<div className="flex flex-wrap gap-6">
					<div className="truc flex items-center gap-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/50 rounded-2xl min-w-[180px]">
						<MessageSquare className="w-6 h-6 text-blue-400 flex-shrink-0 ml-6" />
						<div className="flex items-baseline gap-2 mr-6">
							<span className="text-blue-300 font-bold text-3xl">
								{stats.total}
							</span>
							<span className="text-blue-400/70 text-sm font-medium">
								Total
							</span>
						</div>
					</div>
					<div className="truc flex items-center gap-4 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-700/50 rounded-2xl min-w-[180px]">
						<Clock className="w-6 h-6 text-yellow-400 flex-shrink-0 ml-6" />
						<div className="flex items-baseline gap-2 mr-6">
							<span className="text-yellow-300 font-bold text-3xl">
								{stats.open + stats.inProgress}
							</span>
							<span className="text-yellow-400/70 text-sm font-medium">
								À traiter
							</span>
						</div>
					</div>
					<div className="truc flex items-center gap-4 bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/50 rounded-2xl min-w-[180px]">
						<CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 ml-6" />
						<div className="flex items-baseline gap-2 mr-6">
							<span className="text-green-300 font-bold text-3xl">
								{stats.resolved + stats.closed}
							</span>
							<span className="text-green-400/70 text-sm font-medium">
								Terminés
							</span>
						</div>
					</div>
					{stats.urgent > 0 && (
						<div className="truc flex items-center gap-4 bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/50 rounded-2xl min-w-[180px]">
							<XCircle className="w-6 h-6 text-red-400 flex-shrink-0 ml-6" />
							<div className="flex items-baseline gap-2 mr-6">
								<span className="text-red-300 font-bold text-3xl">
									{stats.urgent}
								</span>
								<span className="text-red-400/70 text-sm font-medium">
									Urgents
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Barre de recherche simplifiée */}
			<div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
				<Input
					placeholder="Rechercher par titre, description ou client..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full py-3 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 text-base p5"
				/>
			</div>

			{/* Liste des tickets simplifiée */}
			<div className="space-y-4 p-2">
				{filteredTickets.length === 0 ? (
					<Card className="bg-gray-800/50 border-gray-700">
						<CardContent className="p-16 text-center">
							<MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">
								Aucun ticket trouvé
							</h3>
							<p className="text-muted-foreground">
								Aucun ticket ne correspond aux critères de
								recherche.
							</p>
						</CardContent>
					</Card>
				) : (
					filteredTickets.map((ticket) => {
						const status = statusConfig[ticket.status];
						const priority = priorityConfig[ticket.priority];
						const StatusIcon = status.icon;

						return (
							<Card
								key={ticket.id}
								className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
							>
								<CardContent className="p-8">
									<div className="flex flex-col lg:flex-row lg:items-start gap-8">
										{/* Informations principales */}
										<div className="flex-1 min-w-0">
											<div className="flex flex-wrap items-center gap-3 mb-4">
												<h3 className="text-lg font-semibold text-white truncate">
													{ticket.title}
												</h3>
												<Badge className={status.color}>
													<StatusIcon className="w-3 h-3 mr-1 status-icon" />
													{status.label}
												</Badge>
												<Badge
													className={priority.color}
												>
													{priority.label}
												</Badge>
											</div>

											<p className="text-muted-foreground text-sm mb-4 line-clamp-2">
												{ticket.description}
											</p>

											<div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
												<div className="flex items-center gap-2">
													<span className="font-medium">
														🏢
													</span>
													<span className="truncate">
														{
															ticket.client
																.companyName
														}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-medium">
														📅
													</span>
													<span>
														{new Date(
															ticket.createdAt
														).toLocaleDateString(
															"fr-FR"
														)}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="font-medium">
														📧
													</span>
													<span className="truncate">
														{
															ticket.client
																.primaryEmail
														}
													</span>
												</div>
											</div>
										</div>

										{/* Actions */}
										<div className="flex flex-row lg:flex-col gap-3 lg:w-auto">
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
												variant="outline"
												size="sm"
												onClick={() =>
													deleteTicket(ticket.id)
												}
												className="flex items-center gap-2 border-red-600 text-red-400 hover:bg-red-900/20 p-btn"
											>
												<Trash2 className="w-3 h-3" />
												Supprimer
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})
				)}
			</div>

			{/* Modal de réponse simplifié */}
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
							{/* Header du modal */}
							<div className="flex items-center justify-between mb-8">
								<div>
									<h2 className="text-xl font-bold text-white mb-2">
										💬 Répondre au ticket
									</h2>
									<p className="text-gray-400 text-sm">
										Ticket de{" "}
										{selectedTicket.client.companyName}
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
								{/* Détails du ticket */}
								<div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
									<h3 className="font-semibold mb-3 text-white">
										📋 {selectedTicket.title}
									</h3>
									<p className="text-gray-300 text-sm">
										{selectedTicket.description}
									</p>
								</div>

								{/* Conversation */}
								<div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
									<h3 className="font-semibold mb-4 text-white">
										💬 Conversation
									</h3>
									{conversation.length === 0 ? (
										<p className="text-gray-400 text-sm">
											Aucun message pour l’instant.
										</p>
									) : (
										<div className="space-y-3 max-h-[36vh] overflow-y-auto pr-2">
											{conversation.map((m) => {
												const isAdmin =
													m.sender.role === "ADMIN";
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

								{/* Zone de réponse */}
								<div>
									<Textarea
										placeholder="Tapez votre réponse au client..."
										value={adminReply}
										onChange={(e) =>
											setAdminReply(e.target.value)
										}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" &&
												!e.shiftKey
											) {
												e.preventDefault();
												if (
													selectedTicket &&
													adminReply.trim()
												) {
													replyToTicket(
														selectedTicket.id,
														"IN_PROGRESS"
													);
												}
											}
										}}
										rows={4}
										className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
										style={{
											marginBottom: 20,
											padding: 10,
										}}
										required
									/>
								</div>

								{/* Actions */}
								<div className="flex gap-3 pt-6">
                            <Button
                                onClick={() => replyToTicket(selectedTicket.id, "IN_PROGRESS")}
                                disabled={updating || !adminReply.trim()}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3"
                            >
										{updating ? (
											"⏳ Envoi..."
										) : (
											<>
												<Clock className="w-4 h-4 mr-2" />
												Marquer en cours
											</>
										)}
									</Button>

                            <Button
                                onClick={() => replyToTicket(selectedTicket.id, "RESOLVED")}
                                disabled={updating || !adminReply.trim()}
                                className="flex-1 bg-green-600 hover:bg-green-700 py-3"
                            >
										{updating ? (
											"⏳ Envoi..."
										) : (
											<>
												<CheckCircle className="w-4 h-4 mr-2" />
												Marquer résolu
											</>
										)}
									</Button>

                            <Button
                                onClick={closeModal}
                                disabled={updating}
                                className="flex-1 bg-gray-700 hover:bg-gray-800 py-3"
                                type="button"
                            >
                                <>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Fermer
                                </>
                            </Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
