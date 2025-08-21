import { AuthButtons } from "@/components/auth/AuthButtons";
import SessionProvider from "@/components/auth/SessionProvider";
import { Footer } from "@/components/ui/footer";
import {
	MobileNavigation,
	Navbar,
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
		{ name: "Contact", link: "/contact" },
	];

	return (
		<html lang="fr">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<Navbar>
						<NavBody className="shadow-none">
							<NavbarLogo />
							<NavItems items={navItems} />
							<AuthButtons />
						</NavBody>
						<MobileNavigation />
					</Navbar>
					<div className="h-16 lg:h-20" />
					{children}
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
