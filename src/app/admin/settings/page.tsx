import { authOptions } from "@/lib/auth";
import { ArrowLeft, Bell, Globe, Palette, Shield } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";
import RegionalSettings from "./RegionalSettings";
import SecuritySettings from "./SecuritySettings";

export default async function AdminSettingsPage() {
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
							Paramètres
						</h1>
						<p className="text-[#a0a0a0]">
							Personnalisez votre expérience et sécurisez votre
							compte
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Sécurité */}
				<div className="space-y-6">
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Shield className="w-5 h-5 text-[#ef4444]" />
								Sécurité
							</h3>
						</div>
						<div className="card-content">
							<SecuritySettings />
						</div>
					</div>

					{/* Notifications */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Bell className="w-5 h-5 text-[#3b82f6]" />
								Notifications
							</h3>
						</div>
						<div className="card-content">
							<NotificationSettings />
						</div>
					</div>
				</div>

				{/* Apparence et Régional */}
				<div className="space-y-6">
					{/* Apparence */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Palette className="w-5 h-5 text-[#10b981]" />
								Apparence
							</h3>
						</div>
						<div className="card-content">
							<AppearanceSettings />
						</div>
					</div>

					{/* Paramètres régionaux */}
					<div className="card">
						<div className="card-header">
							<h3 className="card-title flex items-center gap-2">
								<Globe className="w-5 h-5 text-[#f59e0b]" />
								Paramètres Régionaux
							</h3>
						</div>
						<div className="card-content">
							<RegionalSettings />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
