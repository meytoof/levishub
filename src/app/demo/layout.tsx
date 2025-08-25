import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import "./demo-common.css";

export const metadata: Metadata = {
	title: "Démo - LevisHub",
	description: "Démonstrations de projets web",
};

export default function DemoLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
