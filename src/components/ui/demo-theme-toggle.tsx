"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface DemoThemeToggleProps {
	variant?: "light" | "dark" | "auto";
	className?: string;
}

export function DemoThemeToggle({
	variant = "auto",
	className = "",
}: DemoThemeToggleProps) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${className}`}
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</button>
	);
}
