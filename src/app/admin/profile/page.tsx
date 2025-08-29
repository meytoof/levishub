import { authOptions } from "@/lib/auth";
import {
	ArrowLeft,
	Calendar,
	Mail,
	Shield,
	ToggleLeft,
	User,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClientModeSwitch from "./ClientModeSwitch";
import ProfileForm from "./ProfileForm";

export default async function AdminProfilePage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

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
							Mon Profil
						</h1>
						<p className="text-[#a0a0a0]">
							Gérez vos informations personnelles et préférences
						</p>
					</div>
				</div>
			</div>

			{/* Switch Mode Client/Admin */}
			<div className="card mb-8">
				<div className="card-header">
					<h3 className="card-title flex items-center gap-2">
						<ToggleLeft className="w-5 h-5 text-[#3b82f6]" />
						Mode Test Client
					</h3>
				</div>
				<div className="card-content">
					<div className="flex items-center justify-between">
						<div>
							<h4 className="font-medium text-white mb-2">
								Basculer en mode Client
							</h4>
							<p className="text-sm text-[#a0a0a0]">
								Testez l'interface client pour développer de
								nouvelles fonctionnalités
							</p>
						</div>
						<ClientModeSwitch />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Informations personnelles */}
				<div className="lg:col-span-2">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<User className="w-5 h-5 text-[#3b82f6]" />
								Informations Personnelles
							</h3>
						</div>
						<div className="card-content">
							<ProfileForm />
						</div>
					</div>
				</div>

				{/* Informations système */}
				<div className="lg:col-span-1">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Shield className="w-5 h-5 text-[#3b82f6]" />
								Informations Système
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Shield className="w-4 h-4 text-[#10b981]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Rôle
										</p>
										<p className="font-medium text-white">
											Administrateur
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Calendar className="w-4 h-4 text-[#3b82f6]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Membre depuis
										</p>
										<p className="font-medium text-white">
											15 Août 2024
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<Mail className="w-4 h-4 text-[#f59e0b]" />
									<div>
										<p className="text-sm text-[#a0a0a0]">
											Email
										</p>
										<p className="font-medium text-white">
											{session.user.email}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Préférences email */}
					<div className="card mt-6">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Mail className="w-5 h-5 text-[#3b82f6]" />
								Préférences Email
							</h3>
						</div>
						<div className="card-content">
							<div className="space-y-3">
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										className="form-checkbox"
										defaultChecked
									/>
									<span className="text-sm text-white">
										Notifications de sécurité
									</span>
								</label>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										className="form-checkbox"
										defaultChecked
									/>
									<span className="text-sm text-white">
										Rapports hebdomadaires
									</span>
								</label>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										className="form-checkbox"
									/>
									<span className="text-sm text-white">
										Newsletter produit
									</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
