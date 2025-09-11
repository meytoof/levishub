import SessionWrapper from "@/components/auth/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LevisWeb - Développement Web Freelance",
	description: "Sites modernes, rapides et animés avec backoffice sur mesure",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<SessionWrapper>{children}</SessionWrapper>
				<Toaster
					position="top-right"
					richColors
					closeButton
					duration={4000}
				/>
			</body>
		</html>
	);
}
