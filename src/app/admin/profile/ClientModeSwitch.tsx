"use client";

import Link from "next/link";
import { useState } from "react";

export default function ClientModeSwitch() {
	const [isClientMode, setIsClientMode] = useState(false);

	const toggleMode = () => {
		setIsClientMode(!isClientMode);
		// Ici vous pourriez stocker l'état dans localStorage ou context
		// pour persister le choix de l'utilisateur
	};

	return (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<span
					className={`text-sm font-medium ${
						!isClientMode ? "text-white" : "text-[#a0a0a0]"
					}`}
				>
					Admin
				</span>
				<button
					onClick={toggleMode}
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
						isClientMode ? "bg-[#3b82f6]" : "bg-[#666]"
					}`}
				>
					<span
						className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
							isClientMode ? "translate-x-6" : "translate-x-1"
						}`}
					/>
				</button>
				<span
					className={`text-sm font-medium ${
						isClientMode ? "text-white" : "text-[#a0a0a0]"
					}`}
				>
					Client
				</span>
			</div>
			{isClientMode && (
				<Link href="/dashboard" className="btn btn-primary btn-sm">
					Accéder au Dashboard Client
				</Link>
			)}
		</div>
	);
}
