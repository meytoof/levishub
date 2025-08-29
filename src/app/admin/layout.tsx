import BackofficeLayoutDark from "@/components/ui/backoffice/BackofficeLayoutDark";
import "@/components/ui/backoffice/backoffice-dark.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	if (session.user.role !== "ADMIN") redirect("/");

	return (
		<BackofficeLayoutDark userRole="ADMIN">{children}</BackofficeLayoutDark>
	);
}
