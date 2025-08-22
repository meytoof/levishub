"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// Éviter l'hydratation
	useEffect(() => {
		setMounted(true);
		console.log("ThemeToggle mounted, current theme:", theme);
	}, [theme]);

	useEffect(() => {
		// Debug: vérifier les classes HTML
		console.log("HTML classes:", document.documentElement.className);
		console.log("Body classes:", document.body.className);
		console.log("Theme state:", theme);
	}, [theme]);

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				className="w-9 h-9 rounded-md"
				disabled
			>
				<Sun className="h-4 w-4" />
				<span className="sr-only">Changer le thème</span>
			</Button>
		);
	}

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		console.log("Changing theme from", theme, "to", newTheme);
		setTheme(newTheme);

		// Debug: vérifier immédiatement après le changement
		setTimeout(() => {
			console.log(
				"After theme change - HTML classes:",
				document.documentElement.className
			);
			console.log(
				"After theme change - Body classes:",
				document.body.className
			);
			console.log("After theme change - Theme state:", theme);

			// Vérifier si la classe dark est présente
			const hasDarkClass =
				document.documentElement.classList.contains("dark");
			console.log("Has dark class:", hasDarkClass);
		}, 100);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="w-9 h-9 rounded-md hover:bg-accent hover:text-accent-foreground"
			onClick={toggleTheme}
			title={`Thème actuel: ${theme}`}
		>
			{theme === "light" ? (
				<Moon className="h-4 w-4 text-white" />
			) : (
				<Sun className="h-4 w-4" />
			)}
			<span className="sr-only">
				{theme === "light"
					? "Passer au thème sombre"
					: "Passer au thème clair"}
			</span>
		</Button>
	);
}
