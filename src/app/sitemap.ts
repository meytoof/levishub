import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = "https://levisweb.net";
	return [
		{ url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
		{ url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
		{ url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
		{ url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
		{ url: `${base}/projets-demo`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
	];
}


