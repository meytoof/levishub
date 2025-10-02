import { MetadataRoute } from 'next'

export function GET(): Response {
	const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://levisweb.net/sitemap.xml

# Disallow admin and client areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /invite/
Disallow: /reset-password/

# Allow demo pages
Allow: /demo/
Allow: /projets-demo/

# Allow marketing pages
Allow: /services
Allow: /pricing
Allow: /contact
Allow: /projets-demo
`

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
