import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	return (
		<div className="mx-auto max-w-6xl px-4 py-10 grid gap-6">
			<h2 className="text-2xl font-semibold tracking-tight">
				Bienvenue {session.user?.name ?? "client"}
			</h2>
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
		</div>
	);
}
