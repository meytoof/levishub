"use client";

import { useEffect } from "react";

export default function SmokeDemoPage() {
	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	return (
		<iframe
			src="https://codepen.io/jayesh24/full/xxmraNp"
			title="Smoke Simulation"
			style={{
				position: "fixed",
				inset: 0,
				width: "100%",
				height: "100%",
				border: 0,
			}}
		/>
	);
}
