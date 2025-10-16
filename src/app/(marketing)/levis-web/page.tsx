import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Levis Web | LevisWeb",
  description: "Page d'alias 'Levis Web' redirigée vers l'accueil LevisWeb",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LevisWebAlias() {
  redirect("/");
}
