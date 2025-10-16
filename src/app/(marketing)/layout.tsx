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
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://levisweb.net"),
  title:
    "LevisWeb - Développement Web Freelance | Sites Modernes & Optimisés SEO",
  description:
    "Développeur web freelance spécialisé dans la création de sites vitrines, e-commerce et backoffices sur mesure. Optimisation SEO, performance et conversion garanties.",
  keywords:
    "développeur web freelance, création site internet, e-commerce, backoffice sur mesure, optimisation SEO, performance web, conversion",
  openGraph: {
    title: "LevisWeb - Développement Web Freelance",
    description:
      "Sites modernes, rapides et optimisés SEO avec backoffice sur mesure",
    url: "https://levisweb.net",
    siteName: "LevisWeb",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "LevisWeb - Développement Web Freelance",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LevisWeb - Développement Web Freelance",
    description:
      "Sites modernes, rapides et optimisés SEO avec backoffice sur mesure",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
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
          {/* Organization JSON-LD global pour SEO avec alternateName */}
          <Script id="ld-json-organization-global" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LevisWeb",
              alternateName: ["Levis Web", "LevisWeb"],
              url: "https://levisweb.net",
              logo: "/favicon.ico",
              sameAs: [
                "https://www.instagram.com/levisweb",
                "https://twitter.com/levisweb",
              ],
            })}
          </Script>
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
            <MobileNavigation items={navItems} authButtons={<AuthButtons />} />
          </Navbar>
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
}
