import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	const [users, clients, invitations] = await Promise.all([
		prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: {
					select: { companyName: true },
				},
			},
		}),
		prisma.client.findMany({
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				_count: {
					select: { users: true, sites: true, tickets: true },
				},
			},
		}),
		prisma.invitation.findMany({
			where: { status: "PENDING" },
			orderBy: { createdAt: "desc" },
			take: 5,
			include: {
				client: { select: { companyName: true } },
			},
		}),
	]);

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 grid gap-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold tracking-tight">
					Admin — Tableau de bord
				</h2>
				<div className="flex gap-2">
					<Button asChild>
						<Link href="/admin/clients">Gérer les clients</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/admin/tickets">Tickets</Link>
					</Button>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							Clients
							<Link
								href="/admin/clients"
								className="text-sm text-blue-600 hover:underline"
							>
								Voir tout
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{clients.length}</p>
						<p className="text-sm text-muted-foreground">
							clients actifs
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							Utilisateurs
							<Link
								href="/admin/users"
								className="text-sm text-blue-600 hover:underline"
							>
								Voir tout
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{users.length}</p>
						<p className="text-sm text-muted-foreground">
							utilisateurs
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							Invitations
							<Link
								href="/admin/invitations"
								className="text-sm text-blue-600 hover:underline"
							>
								Voir tout
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">
							{invitations.length}
						</p>
						<p className="text-sm text-muted-foreground">
							en attente
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Derniers clients</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{clients.map((client) => (
								<li
									key={client.id}
									className="flex items-center justify-between border-b py-2"
								>
									<div>
										<span className="font-medium">
											{client.companyName}
										</span>
										<p className="text-sm text-muted-foreground">
											{client.primaryEmail}
										</p>
									</div>
									<div className="text-right text-sm text-muted-foreground">
										<p>
											{client._count.users} utilisateurs
										</p>
										<p>{client._count.sites} sites</p>
									</div>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Invitations en attente</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{invitations.map((invitation) => (
								<li
									key={invitation.id}
									className="flex items-center justify-between border-b py-2"
								>
									<div>
										<span className="font-medium">
											{invitation.email}
										</span>
										<p className="text-sm text-muted-foreground">
											{invitation.client.companyName}
										</p>
									</div>
									<span className="text-xs text-muted-foreground">
										{new Date(
											invitation.createdAt
										).toLocaleDateString("fr-FR")}
									</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
