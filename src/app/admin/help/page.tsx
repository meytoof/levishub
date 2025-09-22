import { authOptions } from "@/lib/auth";
import {
	ArrowLeft,
	BarChart,
	BookOpen,
	Clock,
	CreditCard,
	ExternalLink,
	FileText,
	HelpCircle,
	Mail,
	MessageCircle,
	MessageSquare,
	Phone,
	Play,
	Search,
	Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminHelpPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	// Page désactivée temporairement
	redirect("/admin");

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
							Centre d'Aide
						</h1>
						<p className="text-[#a0a0a0]">
							Trouvez rapidement l'aide dont vous avez besoin
						</p>
					</div>
				</div>
			</div>

			{/* Barre de recherche */}
			<div className="card mb-8">
				<div className="card-content">
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666]" />
						<input
							type="text"
							placeholder="Rechercher dans l'aide..."
							className="form-input pl-10 text-lg"
						/>
					</div>
				</div>
			</div>

			{/* Actions rapides */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<Link
					href="#documentation"
					className="card hover:border-[#3b82f6] transition-all cursor-pointer"
				>
					<div className="card-content text-center">
						<BookOpen className="w-12 h-12 mx-auto mb-4 text-[#3b82f6]" />
						<h3 className="font-medium text-white mb-2">
							Documentation
						</h3>
						<p className="text-sm text-[#a0a0a0]">
							Guides détaillés et tutoriels
						</p>
					</div>
				</Link>

				<Link
					href="#chat"
					className="card hover:border-[#10b981] transition-all cursor-pointer"
				>
					<div className="card-content text-center">
						<MessageCircle className="w-12 h-12 mx-auto mb-4 text-[#10b981]" />
						<h3 className="font-medium text-white mb-2">
							Chat Support
						</h3>
						<p className="text-sm text-[#a0a0a0]">
							Assistance en temps réel
						</p>
					</div>
				</Link>

				<Link
					href="#tutorials"
					className="card hover:border-[#f59e0b] transition-all cursor-pointer"
				>
					<div className="card-content text-center">
						<Play className="w-12 h-12 mx-auto mb-4 text-[#f59e0b]" />
						<h3 className="font-medium text-white mb-2">
							Tutoriels Vidéo
						</h3>
						<p className="text-sm text-[#a0a0a0]">
							Apprendre par l'exemple
						</p>
					</div>
				</Link>

				<Link
					href="#faq"
					className="card hover:border-[#ef4444] transition-all cursor-pointer"
				>
					<div className="card-content text-center">
						<HelpCircle className="w-12 h-12 mx-auto mb-4 text-[#ef4444]" />
						<h3 className="font-medium text-white mb-2">FAQ</h3>
						<p className="text-sm text-[#a0a0a0]">
							Questions fréquentes
						</p>
					</div>
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Articles d'aide par catégorie */}
				<div className="lg:col-span-2 space-y-6">
					{/* Gestion des clients */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Users className="w-5 h-5 text-[#3b82f6]" />
								Gestion des Clients
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<HelpArticle
									title="Comment créer un nouveau client ?"
									description="Guide étape par étape pour ajouter un nouveau client au système"
									link="#"
									tags={["clients", "création", "débutant"]}
								/>
								<HelpArticle
									title="Gérer les invitations clients"
									description="Processus d'invitation et suivi des réponses"
									link="#"
									tags={["invitations", "workflow", "suivi"]}
								/>
								<HelpArticle
									title="Voir les statistiques clients"
									description="Analyser les performances et l'activité des clients"
									link="#"
									tags={[
										"statistiques",
										"analytics",
										"performance",
									]}
								/>
							</div>
						</div>
					</div>

					{/* Paiements et facturation */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<CreditCard className="w-5 h-5 text-[#10b981]" />
								Paiements et Facturation
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<HelpArticle
									title="Configurer Stripe"
									description="Intégration et configuration des paiements"
									link="#"
									tags={[
										"stripe",
										"paiements",
										"configuration",
									]}
								/>
								<HelpArticle
									title="Gérer les factures"
									description="Création, édition et suivi des factures"
									link="#"
									tags={["factures", "billing", "suivi"]}
								/>
								<HelpArticle
									title="Remboursements et ajustements"
									description="Gérer les remboursements et ajustements de facturation"
									link="#"
									tags={[
										"remboursements",
										"ajustements",
										"billing",
									]}
								/>
							</div>
						</div>
					</div>

					{/* Support et tickets */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<MessageSquare className="w-5 h-5 text-[#f59e0b]" />
								Support et Tickets
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<HelpArticle
									title="Traiter un ticket client"
									description="Workflow de résolution des tickets de support"
									link="#"
									tags={["tickets", "support", "workflow"]}
								/>
								<HelpArticle
									title="Prioriser les demandes"
									description="Système de priorité et gestion des urgences"
									link="#"
									tags={["priorité", "urgences", "gestion"]}
								/>
								<HelpArticle
									title="Templates de réponses"
									description="Réponses standardisées pour les questions fréquentes"
									link="#"
									tags={[
										"templates",
										"réponses",
										"standardisation",
									]}
								/>
							</div>
						</div>
					</div>

					{/* Analytics et rapports */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<BarChart className="w-5 h-5 text-[#8b5cf6]" />
								Analytics et Rapports
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<HelpArticle
									title="Tableau de bord principal"
									description="Comprendre les métriques clés et KPIs"
									link="#"
									tags={["dashboard", "métriques", "KPIs"]}
								/>
								<HelpArticle
									title="Exporter les données"
									description="Générer et télécharger des rapports personnalisés"
									link="#"
									tags={["export", "rapports", "données"]}
								/>
								<HelpArticle
									title="Configurer les alertes"
									description="Paramétrer les notifications automatiques"
									link="#"
									tags={[
										"alertes",
										"notifications",
										"automatisation",
									]}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Contact et support */}
				<div className="lg:col-span-1 space-y-6">
					{/* Contact direct */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Mail className="w-5 h-5 text-[#3b82f6]" />
								Nous Contacter
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Mail className="w-4 h-4 text-[#3b82f6]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Email
										</p>
										<a
											href="mailto:support@levisweb.com"
											className="text-white hover:text-[#3b82f6]"
										>
											support@levisweb.com
										</a>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="w-4 h-4 text-[#10b981]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Téléphone
										</p>
										<a
											href="tel:+33123456789"
											className="text-white hover:text-[#10b981]"
										>
											+33 1 23 45 67 89
										</a>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<MessageSquare className="w-4 h-4 text-[#f59e0b]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Chat en direct
										</p>
										<button className="text-white hover:text-[#f59e0b]">
											Ouvrir le chat
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Horaires de support */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Clock className="w-5 h-5 text-[#f59e0b]" />
								Horaires de Support
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-3 text-sm">
								<div className="flex justify-between">
									<span className="text-[#a0a0a0]">
										Lundi - Vendredi
									</span>
									<span className="text-white">9h - 18h</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#a0a0a0]">
										Samedi
									</span>
									<span className="text-white">
										10h - 16h
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#a0a0a0]">
										Dimanche
									</span>
									<span className="text-white">Fermé</span>
								</div>
								<div className="pt-2 border-t border-[#333]">
									<p className="text-[#666] text-xs">
										Support d'urgence disponible 24h/24 pour
										les clients premium
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Ressources utiles */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<FileText className="w-5 h-5 text-[#10b981]" />
								Ressources Utiles
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-3">
								<a
									href="#"
									className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white transition-colors"
								>
									<ExternalLink className="w-3 h-3" />
									Guide de démarrage rapide
								</a>
								<a
									href="#"
									className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white transition-colors"
								>
									<ExternalLink className="w-3 h-3" />
									Vidéos de formation
								</a>
								<a
									href="#"
									className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white transition-colors"
								>
									<ExternalLink className="w-3 h-3" />
									Base de connaissances
								</a>
								<a
									href="#"
									className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-white transition-colors"
								>
									<ExternalLink className="w-3 h-3" />
									Communauté utilisateurs
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// Composant pour un article d'aide
function HelpArticle({
	title,
	description,
	link,
	tags,
}: {
	title: string;
	description: string;
	link: string;
	tags: string[];
}) {
	return (
		<div className="p-4 border border-[#333] rounded-lg hover:border-[#555] transition-colors">
			<h4 className="font-medium text-white mb-2">{title}</h4>
			<p className="text-sm text-[#a0a0a0] mb-3">{description}</p>
			<div className="flex items-center justify-between">
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<span
							key={index}
							className="px-2 py-1 text-xs bg-[#333] text-[#a0a0a0] rounded"
						>
							{tag}
						</span>
					))}
				</div>
				<Link
					href={link}
					className="text-[#3b82f6] hover:text-[#2563eb] text-sm"
				>
					Lire plus →
				</Link>
			</div>
		</div>
	);
}
