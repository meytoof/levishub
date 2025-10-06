import { Button } from "@/components/ui/button";
import SectionSmoke from "@/components/ui/section-smoke";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Link from "next/link";

export default function HomeParallaxDemo() {
	return (
		<TracingBeam className="w-full">
			<main className="min-h-svh">
				{/* Section 1 – fond noir + fumée locale + Hero Parallax (à brancher ensuite) */}
				<section
					className="relative w-full"
					style={{ background: "#0a0a0a" }}
				>
					<div className="absolute inset-0">
						<SectionSmoke />
					</div>
					<div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-24 sm:py-40 text-center">
						<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
							Section Hero Demo (Parallax + Fumée)
						</h1>
						<p className="mt-4 text-white/80 max-w-2xl mx-auto">
							Ceci est une page de démonstration, copie de la
							home, destinée à tester l'intégration du composant
							Hero Parallax d'Aceternity sur la 1ère section.
						</p>
						<div className="mt-8 flex justify-center gap-3">
							<Link href="/contact">
								<Button className="px-6 py-3">
									Demander un devis
								</Button>
							</Link>
							<Link href="/">
								<Button
									variant="outline"
									className="px-6 py-3 text-white border-white/30"
								>
									Retour à l'accueil
								</Button>
							</Link>
						</div>
					</div>
				</section>

				{/* Sections suivantes – placeholders simples pour garder le contexte */}
				<section className="mx-auto max-w-7xl px-6 sm:px-8 py-20">
					<h2 className="text-3xl font-bold">
						Contenu de démonstration
					</h2>
					<p className="mt-2 text-muted-foreground">
						Le reste de l'application n'est pas impacté. Cette page
						sert de sandbox.
					</p>
				</section>
			</main>
		</TracingBeam>
	);
}
