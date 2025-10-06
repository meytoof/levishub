"use client";

import { useEffect, useRef, useState } from "react";

type FluidInstance = {
	destroy?: () => void;
	resize?: () => void;
	setSize?: (w: number, h: number) => void;
};

export default function SmokeDemoLocal() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const fluidRef = useRef<FluidInstance | null>(null);
	const [ready, setReady] = useState(false);
	const [density, setDensity] = useState(0.985);
	const [curl, setCurl] = useState(30);
	const [radius, setRadius] = useState(0.28);

	useEffect(() => {
		let mounted = true;
		(async () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			try {
				const { default: WebGLFluidEnhanced } = await import(
					"webgl-fluid-enhanced"
				);
				if (!mounted) return;
				const instance: any = new WebGLFluidEnhanced(canvas, {
					DYE_RESOLUTION: 1024,
					CAPTURE_RESOLUTION: 256,
					DENSITY_DISSIPATION: density,
					VELOCITY_DISSIPATION: 0.995,
					PRESSURE_DISSIPATION: 0.8,
					PRESSURE_ITERATIONS: 25,
					CURL: curl,
					SPLAT_RADIUS: radius,
					COLORFUL: true,
					PAUSED: false,
				});
				fluidRef.current = instance as FluidInstance;
				const onResize = () => {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
					if (instance.resize) instance.resize();
					else if (instance.setSize)
						instance.setSize(canvas.width, canvas.height);
				};
				onResize();
				window.addEventListener("resize", onResize);
				setReady(true);
				return () => {
					window.removeEventListener("resize", onResize);
				};
			} catch (e) {
				console.error("Failed to init fluid", e);
			}
		})();
		return () => {
			mounted = false;
			fluidRef.current?.destroy?.();
		};
	}, []);

	useEffect(() => {
		// Reconfigure on change by recreating instance quickly
		if (!ready) return;
		const canvas = canvasRef.current;
		fluidRef.current?.destroy?.();
		fluidRef.current = null;
		(async () => {
			if (!canvas) return;
			const { default: WebGLFluidEnhanced } = await import(
				"webgl-fluid-enhanced"
			);
			const instance: any = new WebGLFluidEnhanced(canvas, {
				DYE_RESOLUTION: 1024,
				CAPTURE_RESOLUTION: 256,
				DENSITY_DISSIPATION: density,
				VELOCITY_DISSIPATION: 0.995,
				PRESSURE_DISSIPATION: 0.8,
				PRESSURE_ITERATIONS: 25,
				CURL: curl,
				SPLAT_RADIUS: radius,
				COLORFUL: true,
				PAUSED: false,
			});
			fluidRef.current = instance as FluidInstance;
		})();
	}, [density, curl, radius, ready]);

	return (
		<div style={{ position: "fixed", inset: 0, background: "#000" }}>
			<canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
			<div
				style={{
					position: "fixed",
					top: 16,
					right: 16,
					background: "rgba(17,17,17,0.7)",
					border: "1px solid rgba(255,255,255,0.12)",
					backdropFilter: "blur(6px)",
					color: "#fff",
					padding: 12,
					borderRadius: 10,
					width: 260,
					fontSize: 12,
				}}
			>
				<div style={{ fontWeight: 700, marginBottom: 8 }}>
					Contrôles fumée (local)
				</div>
				<label style={{ display: "grid", gap: 4, marginBottom: 8 }}>
					<span>Densité (dissipation)</span>
					<input
						type="range"
						min={0.95}
						max={0.995}
						step={0.001}
						value={density}
						onChange={(e) => setDensity(parseFloat(e.target.value))}
					/>
					<span>{density.toFixed(3)}</span>
				</label>
				<label style={{ display: "grid", gap: 4, marginBottom: 8 }}>
					<span>Curl</span>
					<input
						type="range"
						min={0}
						max={60}
						step={1}
						value={curl}
						onChange={(e) => setCurl(parseFloat(e.target.value))}
					/>
					<span>{curl}</span>
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Rayon des splats</span>
					<input
						type="range"
						min={0.1}
						max={0.5}
						step={0.01}
						value={radius}
						onChange={(e) => setRadius(parseFloat(e.target.value))}
					/>
					<span>{radius.toFixed(2)}</span>
				</label>
			</div>
		</div>
	);
}
