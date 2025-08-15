import {
	MobileNavigation,
	Navbar,
	NavbarButton,
	NavbarLogo,
	NavBody,
	NavItems,
} from "@/components/ui/resizable-navbar";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LevisHub - Développement Web Freelance",
	description: "Sites modernes, rapides et animés avec backoffice sur mesure",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	const navItems = [
		{ name: "Tarifs", link: "/pricing" },
		{ name: "À propos", link: "/about" },
	];

	return (
		<html lang="fr">
			<body className={inter.className}>
				<Navbar>
					<NavBody>
						<NavbarLogo />
						<NavItems items={navItems} />
						{session ? (
							<div className="flex items-center gap-2">
								<NavbarButton
									href="/dashboard"
									variant="secondary"
								>
									Espace client
								</NavbarButton>
								<NavbarButton
									href="/api/auth/signout"
									variant="dark"
								>
									Déconnexion
								</NavbarButton>
							</div>
						) : (
							<NavbarButton href="/login" variant="primary">
								Se connecter
							</NavbarButton>
						)}
					</NavBody>
					<MobileNavigation />
				</Navbar>
				{children}
			</body>
		</html>
	);
}
