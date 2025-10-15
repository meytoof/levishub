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
  }, [theme]);

  useEffect(() => {
    // Pas de logs en production
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
    setTheme(newTheme);

    // Aucun log nécessaire
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
        {theme === "light" ? "Passer au thème sombre" : "Passer au thème clair"}
      </span>
    </Button>
  );
}
