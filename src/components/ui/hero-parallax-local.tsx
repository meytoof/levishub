"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ParallaxItem = {
	title: string;
	link: string;
	thumbnail: string;
};

type Props = {
	products: ParallaxItem[];
};

// Lightweight parallax inspired by Aceternity Hero Parallax (no external deps)
export default function HeroParallaxLocal({ products }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			setMouse({
				x: e.clientX - rect.left - rect.width / 2,
				y: e.clientY - rect.top - rect.height / 2,
			});
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24"
		>
			<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/90 mb-8">
				Projets mis en avant
			</h2>
			<div className="relative h-[520px] sm:h-[640px]">
				{products.map((p, i) => {
					// grille libre: 3 colonnes virtuelles, 2 rangées
					const col = i % 3;
					const row = Math.floor(i / 3) % 2;
					const baseX = [-220, 0, 220][col];
					const baseY = [-80, 120][row];
					const depth = 1 + (i % 5) * 0.25; // varier la profondeur
					const tx = baseX + (mouse.x / 40) * (1 / depth);
					const ty = baseY + (mouse.y / 60) * (1 / depth);

					return (
						<Link
							key={i}
							href={p.link}
							className="group absolute left-1/2 top-1/2"
							style={{ transform: `translate(${tx}px, ${ty}px)` }}
						>
							<div className="w-[180px] sm:w-[220px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
								<div className="relative aspect-[4/3]">
									<Image
										src={p.thumbnail}
										alt={p.title}
										fill
										sizes="220px"
										className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="px-4 py-3 text-white/90 text-sm font-medium tracking-tight group-hover:text-white">
									{p.title}
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
