import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen grid place-items-center p-6 text-sm text-muted-foreground">
					Chargement…
				</div>
			}
		>
			<RegisterClient />
		</Suspense>
	);
}
