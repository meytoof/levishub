import BackofficeLayoutDark from "@/components/ui/backoffice/BackofficeLayoutDark";
import "@/components/ui/backoffice/backoffice-dark.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	if (session.user.role !== "CLIENT") {
		redirect("/");
	}

	return (
		<BackofficeLayoutDark userRole="CLIENT">
			{children}
		</BackofficeLayoutDark>
	);
}
