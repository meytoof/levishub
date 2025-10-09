"use client";
import ServicesSection from "@/components/sections/services-section";
import { HeroParallax } from "@/components/ui/hero-parallax-aceternity";

const demoProducts = [
	{
		title: "Vrac en Chartreuse",
		link: "https://vracenchartreuse.wuaze.com/?i=1",
		thumbnail: "/images/header/vracenchartreuse.jpg",
	},
	{
		title: "D&B Charpente",
		link: "http://www.dbcharpente.fr/",
		thumbnail: "/images/header/DBCharpente.jpg",
	},
	{
		title: "Oss'Alpes",
		link: "https://ossalpes.fr/",
		thumbnail: "/images/header/OssAlpes.jpg",
	},
	{
		title: "D&B Aménagements",
		link: "https://dbamenagements.com/",
		thumbnail: "/images/header/DBAmenagement.jpg",
	},
	{
		title: "Vrac en Chartreuse - 2",
		link: "https://vracenchartreuse.wuaze.com/?i=1",
		thumbnail: "/images/header/vracenchartreuse.jpg",
	},
	{
		title: "D&B Charpente - 2",
		link: "http://www.dbcharpente.fr/",
		thumbnail: "/images/header/DBCharpente.jpg",
	},
	{
		title: "Oss'Alpes - 2",
		link: "https://ossalpes.fr/",
		thumbnail: "/images/header/OssAlpes.jpg",
	},
	{
		title: "D&B Aménagements - 2",
		link: "https://dbamenagements.com/",
		thumbnail: "/images/header/DBAmenagement.jpg",
	},
	{
		title: "Vrac en Chartreuse - 3",
		link: "https://vracenchartreuse.wuaze.com/?i=1",
		thumbnail: "/images/header/vracenchartreuse.jpg",
	},
	{
		title: "D&B Charpente - 3",
		link: "http://www.dbcharpente.fr/",
		thumbnail: "/images/header/DBCharpente.jpg",
	},
	{
		title: "Oss'Alpes - 3",
		link: "https://ossalpes.fr/",
		thumbnail: "/images/header/OssAlpes.jpg",
	},
	{
		title: "D&B Aménagements - 3",
		link: "https://dbamenagements.com/",
		thumbnail: "/images/header/DBAmenagement.jpg",
	},
	{
		title: "Vrac en Chartreuse - 4",
		link: "https://vracenchartreuse.wuaze.com/?i=1",
		thumbnail: "/images/header/vracenchartreuse.jpg",
	},
	{
		title: "D&B Charpente - 4",
		link: "http://www.dbcharpente.fr/",
		thumbnail: "/images/header/DBCharpente.jpg",
	},
	{
		title: "Oss'Alpes - 4",
		link: "https://ossalpes.fr/",
		thumbnail: "/images/header/OssAlpes.jpg",
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
