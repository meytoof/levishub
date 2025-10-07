"use client";
import { AboutSection } from "@/components/sections/about-section";
import { HeroParallax } from "@/components/ui/hero-parallax-aceternity";
import React from "react";

export default function HomeCopy() {
	const products = [
		{
			title: "Site Vitrine Premium",
			link: "/services",
			thumbnail: "/globe.svg",
		},
		{
			title: "E-commerce Moderne",
			link: "/services",
			thumbnail: "/vercel.svg",
		},
		{
			title: "Backoffice Sur Mesure",
			link: "/services",
			thumbnail: "/next.svg",
		},
		{
			title: "Landing Page SaaS",
			link: "/projets-demo",
			thumbnail: "/window.svg",
		},
		{
			title: "Portfolio Créatif",
			link: "/projets-demo",
			thumbnail: "/file.svg",
		},
		{
			title: "Dashboard Analytics",
			link: "/services",
			thumbnail: "/globe.svg",
		},
		{
			title: "App Mobile",
			link: "/services",
			thumbnail: "/vercel.svg",
		},
		{
			title: "API Rest",
			link: "/services",
			thumbnail: "/next.svg",
		},
		{
			title: "Intégration Stripe",
			link: "/services",
			thumbnail: "/window.svg",
		},
		{
			title: "SEO Avancé",
			link: "/services",
			thumbnail: "/file.svg",
		},
		{
			title: "Performance 95+",
			link: "/services",
			thumbnail: "/globe.svg",
		},
		{
			title: "Design System",
			link: "/services",
			thumbnail: "/vercel.svg",
		},
		{
			title: "Maintenance Pro",
			link: "/services",
			thumbnail: "/next.svg",
		},
		{
			title: "Formation Client",
			link: "/contact",
			thumbnail: "/window.svg",
		},
		{
			title: "Support 24/7",
			link: "/contact",
			thumbnail: "/file.svg",
		},
	];
	const section2: React.CSSProperties = {
		maxWidth: 1200,
		margin: "0 auto",
		padding: "80px 24px",
	};
	const h2Style: React.CSSProperties = {
		fontSize: "clamp(24px,4vw,36px)",
		fontWeight: 700,
		color: "#fff",
		margin: 0,
	};
	const p2Style: React.CSSProperties = {
		color: "rgba(255,255,255,0.7)",
		marginTop: 8,
	};
	return (
		<main className="min-h-screen bg-black">
			{/* Composant HeroParallax d'Aceternity avec notre contenu LevisWeb */}
			<HeroParallax products={products} />

			{/* Section À propos - Nouvelle direction artistique */}
			<AboutSection />

			<section style={section2}>
				<h2 style={h2Style}>Contenu de démonstration</h2>
				<p style={p2Style}>
					Le reste de l&apos;application n&apos;est pas impacté. Cette
					page sert de sandbox.
				</p>
			</section>
		</main>
	);
}
