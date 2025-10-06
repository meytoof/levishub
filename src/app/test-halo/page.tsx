"use client";

export default function TestHaloPage() {
	function toggleTheme() {
		const body = document.body as HTMLBodyElement;
		const current = body.dataset.theme;
		body.dataset.theme = current === "dark" ? "light" : "dark";
	}

	return (
		<div data-theme="dark" style={{ height: "100vh" }}>
			<div className="circle" />
			<button className="theme-toggle" onClick={toggleTheme}>
				Changer de thème
			</button>

			<style jsx>{`
				:root {
					--c1: #06b6d4;
					--c2: #0891b2;
					--c3: #0e7490;
					--bg: #ffffff;
				}

				[data-theme="dark"] {
					--c1: #a855f7;
					--c2: #ec4899;
					--c3: #f43f5e;
					--bg: #0a0a0a;
				}

				:global(body) {
					margin: 0;
					height: 100vh;
					background: var(--bg);
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: hidden;
				}

				.circle {
					position: relative;
					width: 300px;
					height: 300px;
					border-radius: 50%;
					background: conic-gradient(from 0deg, var(--c1), var(--c2), var(--c3), var(--c1));
					animation: spin 6s linear infinite;
					filter: blur(15px) brightness(1.2);
					box-shadow: 0 0 60px var(--c1), 0 0 90px var(--c2), 0 0 120px var(--c3);
				}

				.circle::before,
				.circle::after {
					content: "";
					position: absolute;
					top: -50px;
					left: -50px;
					width: 400px;
					height: 400px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 80%);
					filter: blur(60px);
					animation: smoke 12s ease-in-out infinite;
				}

				.circle::after {
					animation-delay: -6s;
					background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 80%);
				}

				@keyframes spin {
					0% {
						transform: rotate(0deg) scale(1);
					}
					50% {
						transform: rotate(180deg) scale(1.05);
					}
					100% {
						transform: rotate(360deg) scale(1);
					}
				}

				@keyframes smoke {
					0% {
						transform: scale(1) translate(0, 0);
						opacity: 0.6;
					}
					50% {
						transform: scale(1.1) translate(-20px, 20px);
						opacity: 0.3;
					}
					100% {
						transform: scale(1) translate(0, 0);
						opacity: 0.6;
					}
				}

				.theme-toggle {
					position: absolute;
					top: 20px;
					right: 20px;
					padding: 10px 20px;
					border: none;
					cursor: pointer;
					border-radius: 8px;
					font-weight: bold;
				}
			`}</style>
		</div>
	);
}


