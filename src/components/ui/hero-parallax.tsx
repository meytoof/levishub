"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import React from "react";

function Parallax({
	products,
}: {
	products: { title: string; link: string; thumbnail: string }[];
}) {
	const firstRow = products.slice(0, 5);
	const secondRow = products.slice(5, 10);
	const thirdRow = products.slice(10, 15);
	const ref = React.useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const springCfg = { stiffness: 300, damping: 30, bounce: 100 };
	const tx = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springCfg
	);
	const txRev = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springCfg
	);
	const rX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springCfg
	);
	const rZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springCfg
	);
	const o = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springCfg
	);
	const tY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
		springCfg
	);
	const rootStyle: React.CSSProperties = {
		height: "300vh",
		overflow: "hidden",
		position: "relative",
		perspective: "1000px",
		transformStyle: "preserve-3d",
	};
	const rowStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		gap: 80,
		marginBottom: 80,
	};
	const rowReverseStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row-reverse",
		gap: 80,
		marginBottom: 80,
	};
	const cardStyle: React.CSSProperties = {
		position: "relative",
		height: 384,
		width: 480,
		flexShrink: 0,
		overflow: "hidden",
	};
	const imgStyle: React.CSSProperties = {
		position: "absolute",
		inset: 0,
		width: "100%",
		height: "100%",
		objectFit: "cover",
		objectPosition: "left top",
	};
	const overlayStyle: React.CSSProperties = {
		position: "absolute",
		inset: 0,
		background: "rgba(0,0,0,0)",
		pointerEvents: "none",
		transition: "opacity 200ms ease",
	};
	const titleStyle: React.CSSProperties = {
		position: "absolute",
		left: 16,
		bottom: 16,
		color: "#fff",
		opacity: 0,
		transition: "opacity 200ms ease, transform 200ms ease",
		transform: "translateY(4px)",
		fontSize: "18px",
		fontWeight: "600",
	};
	const cardContainerStyle: React.CSSProperties = { position: "relative" };
	return (
		<div ref={ref} style={rootStyle}>
			<motion.div
				style={{
					rotateX: rX,
					rotateZ: rZ,
					translateY: tY,
					opacity: o as unknown as number,
				}}
			>
				<motion.div style={rowReverseStyle}>
					{firstRow.map((p) => (
						<motion.a
							key={p.title}
							href={p.link}
							style={cardContainerStyle}
						>
							<motion.div
								style={{
									...cardStyle,
									x: tx as unknown as number,
								}}
								onMouseEnter={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0.6)";
									if (title) {
										title.style.opacity = "1";
										title.style.transform = "translateY(0)";
									}
								}}
								onMouseLeave={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0)";
									if (title) {
										title.style.opacity = "0";
										title.style.transform =
											"translateY(4px)";
									}
								}}
							>
								<img
									src={p.thumbnail}
									alt={p.title}
									style={imgStyle}
								/>
								<div data-overlay style={overlayStyle} />
								<h2 data-title style={titleStyle}>
									{p.title}
								</h2>
							</motion.div>
						</motion.a>
					))}
				</motion.div>
				<motion.div style={rowStyle}>
					{secondRow.map((p) => (
						<motion.a
							key={p.title}
							href={p.link}
							style={cardContainerStyle}
						>
							<motion.div
								style={{
									...cardStyle,
									x: txRev as unknown as number,
								}}
								onMouseEnter={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0.6)";
									if (title) {
										title.style.opacity = "1";
										title.style.transform = "translateY(0)";
									}
								}}
								onMouseLeave={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0)";
									if (title) {
										title.style.opacity = "0";
										title.style.transform =
											"translateY(4px)";
									}
								}}
							>
								<img
									src={p.thumbnail}
									alt={p.title}
									style={imgStyle}
								/>
								<div data-overlay style={overlayStyle} />
								<h2 data-title style={titleStyle}>
									{p.title}
								</h2>
							</motion.div>
						</motion.a>
					))}
				</motion.div>
				<motion.div style={rowReverseStyle}>
					{thirdRow.map((p) => (
						<motion.a
							key={p.title}
							href={p.link}
							style={cardContainerStyle}
						>
							<motion.div
								style={{
									...cardStyle,
									x: tx as unknown as number,
								}}
								onMouseEnter={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0.6)";
									if (title) {
										title.style.opacity = "1";
										title.style.transform = "translateY(0)";
									}
								}}
								onMouseLeave={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											"[data-overlay]"
										) as HTMLElement;
									const title = e.currentTarget.querySelector(
										"[data-title]"
									) as HTMLElement;
									if (overlay)
										overlay.style.background =
											"rgba(0,0,0,0)";
									if (title) {
										title.style.opacity = "0";
										title.style.transform =
											"translateY(4px)";
									}
								}}
							>
								<img
									src={p.thumbnail}
									alt={p.title}
									style={imgStyle}
								/>
								<div data-overlay style={overlayStyle} />
								<h2 data-title style={titleStyle}>
									{p.title}
								</h2>
							</motion.div>
						</motion.a>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
}

export function HeroParallax({
	products,
}: {
	products: { title: string; link: string; thumbnail: string }[];
}) {
	return (
		<div className="relative overflow-hidden">
			<Parallax products={products} />
		</div>
	);
}
