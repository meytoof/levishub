import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const base = "https://levisweb.net";
	return {
		rules: [
			{
				userAgent: "*",
				allow: [
					"/",
					"/demo/",
					"/projets-demo/",
					"/services",
					"/pricing",
					"/contact",
					"/projets-demo",
				],
				disallow: [
					"/admin/",
					"/dashboard/",
					"/api/",
					"/invite/",
					"/reset-password/",
				],
			},
		],
		sitemap: `${base}/sitemap.xml`,
		host: base,
	};
}
