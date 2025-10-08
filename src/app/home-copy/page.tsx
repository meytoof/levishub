"use client";
import ServicesSection from "@/components/sections/services-section";
import { HeroParallax } from "@/components/ui/hero-parallax-aceternity";

const demoProducts = [
	{
		title: "Site Vitrine Moderne",
		link: "/demo/vitrine",
		thumbnail:
			"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop",
	},
	{
		title: "E-commerce Premium",
		link: "/demo/ecommerce",
		thumbnail:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
	},
	{
		title: "Blog Personnel",
		link: "/demo/blog",
		thumbnail:
			"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop",
	},
	{
		title: "Portfolio Créatif",
		link: "/demo/portfolio",
		thumbnail:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
	},
	{
		title: "Landing SaaS",
		link: "/demo/landing-saas",
		thumbnail:
			"https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop",
	},
	{
		title: "Dashboard Analytics",
		link: "/demo/dashboard",
		thumbnail:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
	},
	{
		title: "Site Corporate",
		link: "/demo/com-digital",
		thumbnail:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
	},
	{
		title: "Application Mobile",
		link: "/demo/mobile",
		thumbnail:
			"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop",
	},
	{
		title: "Plateforme Web",
		link: "/demo/platform",
		thumbnail:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
	},
	{
		title: "Marketplace",
		link: "/demo/marketplace",
		thumbnail:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
	},
	{
		title: "Réseau Social",
		link: "/demo/social",
		thumbnail:
			"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop",
	},
	{
		title: "Application Fintech",
		link: "/demo/fintech",
		thumbnail:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
	},
	{
		title: "Plateforme E-learning",
		link: "/demo/elearning",
		thumbnail:
			"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop",
	},
	{
		title: "Site Immobilier",
		link: "/demo/realestate",
		thumbnail:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=600&fit=crop",
	},
	{
		title: "Application Fitness",
		link: "/demo/fitness",
		thumbnail:
			"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
	},
];

export default function HomeCopy() {
	return (
		<div>
			{/* Hero parallax en haut */}
			<HeroParallax products={demoProducts} />

			{/* Section Services */}
			<ServicesSection />

			{/* Section avec espace vide pour tester le hover */}
			<section
				style={{
					height: "100vh",
					background: "#1a1a1a",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "2rem",
				}}
			>
				<div style={{ textAlign: "center", maxWidth: "800px" }}>
					<h2
						style={{
							color: "#fff",
							fontSize: "3rem",
							marginBottom: "2rem",
						}}
					>
						Espace de test
					</h2>
					<p
						style={{
							color: "#ccc",
							fontSize: "1.2rem",
							lineHeight: "1.6",
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
					<p
						style={{
							color: "#ccc",
							fontSize: "1.2rem",
							lineHeight: "1.6",
							marginTop: "1rem",
						}}
					>
						Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</section>
		</div>
	);
}
