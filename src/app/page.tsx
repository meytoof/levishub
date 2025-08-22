import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Link from "next/link";

export default function Home() {
	return (
		<TracingBeam className="w-full">
			<main className="min-h-svh">
				{/* Section MacbookScroll en haut */}
				<div className="flex justify-center items-center w-full overflow-hidden">
					<MacbookScroll
						title="Des sites qui attirent, convertissent et durent"
						badge={
							<span className="text-white inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
								En ligne
							</span>
						}
					/>
				</div>

				{/* Hero Section - Plein écran */}
				<section className="relative mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
					<div>
						<h1 className="text-5xl md:text-6xl font-bold tracking-tight opacity-0 animate-[fade-up_600ms_ease-out_forwards] text-gradient-cyan">
							Des sites qui attirent, convertissent et durent
						</h1>
						<p className="mt-6 text-lg md:text-xl text-muted-foreground opacity-0 animate-[fade-up_600ms_ease-out_120ms_forwards] leading-relaxed max-w-prose">
							LevisHub — développeur web freelance. Je conçois des
							sites vitrines, e-commerce et backoffices sur
							mesure, optimisés pour la performance et la
							visibilité.
						</p>
						<div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-[fade-up_600ms_ease-out_200ms_forwards]">
							<Link href="/contact">
								<Button className="btn-cyan-gradient shadow-lg hover:shadow-xl px-8 py-3 text-lg">
									Demander un devis
								</Button>
							</Link>
							<Link href="/services">
								<Button
									variant="outline"
									className="border-2 transition-all duration-200 hover:-translate-y-1 dark:hover:bg-neutral-800 px-8 py-3 text-lg"
									style={{
										borderImage:
											"linear-gradient(to right, var(--tw-gradient-from, lab(48.295% 38.3129 -81.9673)), var(--color-fuchsia-600)) 1",
										borderImageSlice: 1,
									}}
								>
									Voir mes services
								</Button>
							</Link>
						</div>
					</div>
					<div className="grid place-items-center">
						<CardContainer className="inter-var">
							<CardBody className="relative bg-gradient-to-br from-background/70 to-background/20 backdrop-blur-xl border border-neutral-500/50 shadow-xl ring-1 ring-black/5 w-[400px] md:w-[500px] h-[400px] rounded-2xl p-8">
								<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
								<CardItem
									translateZ="50"
									className="text-2xl font-bold tracking-tight text-center"
								>
									🚀 LevisHub
								</CardItem>
								<CardItem
									translateZ="60"
									className="text-sm text-muted-foreground mt-4 max-w-sm text-center"
								>
									Votre partenaire digital pour des solutions
									web modernes, performantes et rentables
								</CardItem>
								<CardItem translateZ="100" className="mt-8">
									<div className="h-48 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center">
										<div className="text-6xl">💻</div>
									</div>
								</CardItem>
								<CardItem
									translateZ="40"
									className="mt-6 flex gap-3 justify-center"
								>
									<div className="px-4 py-2 rounded-full text-xs badge-tech-1">
										React + Next.js
									</div>
									<div className="px-4 py-2 rounded-full text-xs badge-tech-2">
										Performance
									</div>
								</CardItem>
							</CardBody>
						</CardContainer>
					</div>
				</section>

				{/* Bloc Features - 3 cartes en grille */}
				<section className="relative mx-auto max-w-7xl px-6 py-24">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient-cyan">
							Solutions complètes
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Des outils web modernes qui transforment votre
							vision en réalité digitale
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Carte 1 */}
						<div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl feature-shadow-1">
							<div className="text-4xl mb-4">🎯</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								Vitrine + Backoffice
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Un site moderne + un espace admin simple à
								gérer. Paiements Stripe, analytics intégrés,
								rôles Admin/Client.
							</p>
						</div>

						{/* Carte 2 */}
						<div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl feature-shadow-2">
							<div className="text-4xl mb-4">🔒</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								Sécurité & Performance
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Auth sécurisée, sauvegardes auto, vitesse
								optimisée. Votre site reste rapide et protégé.
							</p>
						</div>

						{/* Carte 3 */}
						<div className="group relative bg-white/5 backdrop-blur-xl border border-neutral-500/30 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl feature-shadow-3">
							<div className="text-4xl mb-4">📈</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								Visibilité & Croissance
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								SEO, tracking, et intégration réseaux sociaux
								pour attirer vos clients et faire croître votre
								business.
							</p>
						</div>
					</div>
				</section>

				{/* Process en 3 étapes */}
				<section className="relative mx-auto max-w-7xl px-6 py-24">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient-cyan">
							Process simple et efficace
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							De l&apos;idée au lancement en 3 étapes claires
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Étape 1 */}
						<div className="text-center group">
							<div className="relative mb-6">
								<div className="w-20 h-20 mx-auto process-circle-1 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
									1
								</div>
								{/* Ligne de connexion */}
								<div className="hidden md:block absolute top-10 left-full w-full h-0.5 process-line-1"></div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-white">
								Diagnostic gratuit
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Audit rapide de vos besoins. Analyse de votre
								projet et recommandations personnalisées.
							</p>
						</div>

						{/* Étape 2 */}
						<div className="text-center group">
							<div className="relative mb-6">
								<div className="w-20 h-20 mx-auto process-circle-2 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
									2
								</div>
								{/* Ligne de connexion */}
								<div className="hidden md:block absolute top-10 left-full w-full h-0.5 process-line-2"></div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-white">
								Conception agile
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Maquettes + itérations rapides. Développement en
								mode agile avec feedback continu.
							</p>
						</div>

						{/* Étape 3 */}
						<div className="text-center group">
							<div className="relative mb-6">
								<div className="w-20 h-20 mx-auto process-circle-3 rounded-full flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
									3
								</div>
							</div>
							<h3 className="text-2xl font-bold mb-4 text-white">
								Lancement & croissance
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Suivi, SEO, optimisation. Accompagnement
								post-lancement pour maximiser vos résultats.
							</p>
						</div>
					</div>
				</section>

				{/* Call to action final - Full width */}
				<section className="relative mx-auto max-w-7xl px-6 py-24">
					<div className="text-center">
						<h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gradient-cyan">
							Prêt à lancer votre projet digital ?
						</h2>
						<p className="text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
							Transformez votre vision en réalité avec LevisHub.
							Des solutions web rapides, fiables et pensées pour
							générer des résultats.
						</p>
						<div className="flex justify-center">
							<Link href="/contact">
								<Button className="btn-cyan-gradient shadow-lg hover:shadow-xl px-10 py-4 text-xl">
									Parlons de votre projet
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</TracingBeam>
	);
}
