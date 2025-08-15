import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");
	const users = await prisma.user.findMany({
		orderBy: { createdAt: "desc" },
		take: 10,
	});
	return (
		<div className="mx-auto max-w-6xl px-4 py-10 grid gap-6">
			<h2 className="text-2xl font-semibold tracking-tight">
				Admin — Aperçu
			</h2>
			<Card>
				<CardHeader>
					<CardTitle>Derniers utilisateurs</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{users.map((u) => (
							<li
								key={u.id}
								className="flex items-center justify-between border-b py-2"
							>
								<span>{u.email ?? u.name}</span>
								<span className="text-xs text-muted-foreground">
									{u.role}
								</span>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
