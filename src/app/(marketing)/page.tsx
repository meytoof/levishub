"use client";
import ServicesSection from "@/components/sections/services-section";
import { HeroParallax } from "@/components/ui/hero-parallax-aceternity";
import Script from "next/script";

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

export default function Home() {
	return (
		<>
			{/* Structured Data pour SEO */}
			<Script id="ld-json-org" type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "LevisWeb",
					url: "https://levisweb.net",
					logo: "/favicon.ico",
					contactPoint: {
						"@type": "ContactPoint",
						contactType: "customer service",
						email: "quentinlevis@gmail.com",
						availableLanguage: "French",
					},
					sameAs: [
						"https://www.instagram.com/levisweb",
						"https://twitter.com/levisweb",
					],
				})}
			</Script>
			<Script id="ld-json-localbusiness" type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					name: "LevisWeb",
					image: "https://levisweb.net/favicon.ico",
					url: "https://levisweb.net",
					telephone: "+33783422676",
					email: "quentinlevis@gmail.com",
					address: {
						"@type": "PostalAddress",
						streetAddress: "30 Place Centrale",
						postalCode: "38380",
						addressLocality: "Entre-Deux-Guiers",
						addressCountry: "FR",
					},
					openingHoursSpecification: [
						{
							"@type": "OpeningHoursSpecification",
							dayOfWeek: [
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
							],
							opens: "09:00",
							closes: "18:00",
						},
					],
					areaServed: [{ "@type": "Country", name: "France" }],
					priceRange: "€€€",
					description:
						"Développement web freelance - Sites modernes, rapides et optimisés SEO avec backoffice sur mesure",
					hasOfferCatalog: {
						"@type": "OfferCatalog",
						name: "Services LevisWeb",
						itemListElement: [
							{
								"@type": "Offer",
								itemOffered: {
									"@type": "Service",
									name: "Développement de sites web",
								},
							},
							{
								"@type": "Offer",
								itemOffered: {
									"@type": "Service",
									name: "E-commerce",
								},
							},
							{
								"@type": "Offer",
								itemOffered: {
									"@type": "Service",
									name: "Backoffice sur mesure",
								},
							},
							{
								"@type": "Offer",
								itemOffered: {
									"@type": "Service",
									name: "Optimisation SEO",
								},
							},
							{
								"@type": "Offer",
								itemOffered: {
									"@type": "Service",
									name: "Maintenance web",
								},
							},
						],
					},
				})}
			</Script>
			<Script id="ld-json-website" type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					url: "https://levisweb.net",
					name: "LevisWeb",
					potentialAction: {
						"@type": "SearchAction",
						target: "https://levisweb.net/search?q={search_term_string}",
						query: "required name=search_term_string",
					},
					// Sitelinks pour enrichir la position 0
					mainEntity: {
						"@type": "ItemList",
						name: "Navigation principale",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Services",
								url: "https://levisweb.net/services",
								description:
									"Développement web, e-commerce et backoffice sur mesure",
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Projets Démo",
								url: "https://levisweb.net/projets-demo",
								description:
									"Découvrez nos réalisations et exemples concrets",
							},
							{
								"@type": "ListItem",
								position: 3,
								name: "Tarifs",
								url: "https://levisweb.net/pricing",
								description:
									"Tarifs transparents pour sites web et services",
							},
							{
								"@type": "ListItem",
								position: 4,
								name: "Contact",
								url: "https://levisweb.net/contact",
								description:
									"Contactez-nous pour votre projet web",
							},
						],
					},
				})}
			</Script>

			{/* Hero parallax avec structure SEO optimisée */}
			<main>
				<section aria-label="Hero section avec présentation des services">
					<HeroParallax products={demoProducts} />
				</section>

				{/* Section Services avec structure sémantique */}
				<section aria-label="Services de développement web">
					<ServicesSection />
				</section>
			</main>
		</>
	);
}
