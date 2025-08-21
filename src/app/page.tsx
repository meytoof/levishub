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
						title="Des sites modernes, rapides et animés"
						badge={
							<span className="text-white inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
								En ligne
							</span>
						}
					/>
				</div>

				{/* Section principale avec titre et CTA */}
				<section className="relative mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h1 className="text-5xl md:text-6xl font-semibold tracking-tight opacity-0 animate-[fade-up_600ms_ease-out_forwards] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
							Des sites modernes, rapides et animés
						</h1>
						<p className="mt-5 text-base md:text-lg text-muted-foreground opacity-0 animate-[fade-up_600ms_ease-out_120ms_forwards] leading-relaxed max-w-prose">
							LevisHub — votre partenaire freelance pour un site
							vitrine, une boutique ou un backoffice sur mesure.
						</p>
						<div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-[fade-up_600ms_ease-out_200ms_forwards]">
							<Link href="/pricing">
								<Button className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
									Trouver mon abonnement
								</Button>
							</Link>
							<Link href="/login">
								<Button
									variant="outline"
									className="border-2 transition-all duration-200 hover:-translate-y-1 dark:hover:bg-neutral-800"
									style={{
										borderImage:
											"linear-gradient(to right, var(--tw-gradient-from, lab(48.295% 38.3129 -81.9673)), var(--color-fuchsia-600)) 1",
										borderImageSlice: 1,
									}}
								>
									Espace client
								</Button>
							</Link>
						</div>
					</div>
					<div className="grid place-items-center">
						<CardContainer className="inter-var">
							<CardBody className="relative bg-gradient-to-br from-background/70 to-background/20 backdrop-blur-xl border border-neutral-500/50 shadow-xl ring-1 ring-black/5 w-[360px] md:w-[460px] h-[360px] rounded-2xl p-6">
								<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10" />
								<CardItem
									translateZ="50"
									className="text-xl font-medium tracking-tight"
								>
									Vitrine + Backoffice
								</CardItem>
								<CardItem
									translateZ="60"
									className="text-sm text-muted-foreground mt-2 max-w-sm"
								>
									Paiements Stripe, authentification animée,
									analytics, rôles Admin/Client.
								</CardItem>
								<CardItem translateZ="100" className="mt-6">
									<div className="h-48 rounded-lg bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30" />
								</CardItem>
								<CardItem
									translateZ="40"
									className="mt-6 flex gap-3"
								>
									<Link href="/login">
										<Button
											size="sm"
											className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
										>
											Se connecter
										</Button>
									</Link>
									<Link href="/register">
										<Button
											size="sm"
											variant="outline"
											className="border-2 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-200 hover:-translate-y-1"
										>
											Créer un compte
										</Button>
									</Link>
								</CardItem>
							</CardBody>
						</CardContainer>
					</div>
				</section>
			</main>
		</TracingBeam>
	);
}
