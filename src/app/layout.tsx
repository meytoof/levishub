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
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
		<html lang="fr" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider>
					<SessionProvider session={session}>
						<Navbar>
							<NavBody className="shadow-none">
								<NavbarLogo />
								<NavItems items={navItems} />
								<div className="flex items-center gap-2">
									<ThemeToggle />
									<AuthButtons />
								</div>
							</NavBody>
							<MobileNavigation />
						</Navbar>
						<div className="h-16 lg:h-20" />
						{children}
						<Footer />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
