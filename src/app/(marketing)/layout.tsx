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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LevisWeb - Développement Web Freelance",
	description: "Sites modernes, rapides et animés avec backoffice sur mesure",
};

export default async function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	const navItems = [
		{ name: "Services", link: "/services" },
		{ name: "Projets Démo", link: "/projets-demo" },
		{ name: "Tarifs", link: "/pricing" },
		{ name: "Contact", link: "/contact" },
	];

	return (
		<div className={`${inter.className} flex flex-col min-h-screen`}>
			<ThemeProvider>
				<SessionProvider session={session}>
					<Navbar>
						<NavBody
							className="shadow-none levisweb-nav"
							shrinkOnScroll={!session}
						>
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
					<main className="flex-1">{children}</main>
					<Footer />
				</SessionProvider>
			</ThemeProvider>
		</div>
	);
}
