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
				{isAdmin ? (
					<NavbarButton href="/admin" variant="primary">
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
			<button
				onClick={() => signIn(undefined, { callbackUrl: "/" })}
				className="px-4 py-2 rounded-md bg-white text-black text-sm font-bold hover:-translate-y-0.5 transition duration-200 shadow cursor-pointer"
			>
				Se connecter
			</button>
		</div>
	);
}
