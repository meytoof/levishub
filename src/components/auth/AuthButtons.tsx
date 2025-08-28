"use client";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";
	const isAdmin = session?.user?.role === "ADMIN";

	if (isAuthenticated) {
		return (
			<div className="flex items-center gap-3">
				<span className="flex items-center gap-1 text-sm text-green-600">
					<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
					Connecté
				</span>
				{isAdmin ? (
					<NavbarButton href="/dashboard/admin" variant="primary">
						Dashboard Admin
					</NavbarButton>
				) : (
					<NavbarButton href="/dashboard" variant="primary">
						Espace client
					</NavbarButton>
				)}
				<button
					onClick={() => signOut({ callbackUrl: "/" })}
					className="px-4 py-2 rounded-md bg-black text-white text-sm font-bold hover:-translate-y-0.5 transition duration-200 cursor-pointer"
				>
					Déconnexion
				</button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<span className="flex items-center gap-1 text-sm text-zinc-500">
				<span className="inline-block h-2 w-2 rounded-full bg-zinc-400" />
				Hors ligne
			</span>
			<button
				onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
				className="px-4 py-2 rounded-md bg-white text-black text-sm font-bold hover:-translate-y-0.5 transition duration-200 shadow cursor-pointer"
			>
				Se connecter
			</button>
		</div>
	);
}
