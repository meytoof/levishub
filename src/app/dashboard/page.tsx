import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");

	const isAdmin = session.user?.role === "ADMIN";

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 grid gap-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-tight">
					Bienvenue {session.user?.name ?? "client"}
				</h2>
				{isAdmin && (
					<Button asChild>
						<Link href="/dashboard/admin">Dashboard Admin</Link>
					</Button>
				)}
			</div>

			{isAdmin ? (
				<Card>
					<CardHeader>
						<CardTitle>Accès Administrateur</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-4">
							Vous êtes connecté en tant qu'administrateur.
							Accédez au dashboard admin pour gérer les clients,
							invitations et tickets.
						</p>
						<div className="flex gap-2">
							<Button asChild>
								<Link href="/dashboard/admin">
									Dashboard Admin
								</Link>
							</Button>
							<Button asChild variant="outline">
								<Link href="/admin/clients">
									Gérer les clients
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="grid md:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Visiteurs</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">—</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Disponibilité</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">—</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Prochaine facture</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">—</p>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
