"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SimpleTestPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Pas de logs en production; laisser cette page pour dev manuel
  }, [theme]);

  if (!mounted) return <div>Chargement...</div>;

  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        color: isDark ? "#ffffff" : "#000000",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Test Simple du Thème
        </h1>

        <div style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Thème actuel:</strong> {theme}
          </p>
          <p>
            <strong>Classes HTML:</strong> {document.documentElement.className}
          </p>
          <p>
            <strong>Classe dark présente:</strong>{" "}
            {document.documentElement.classList.contains("dark")
              ? "Oui"
              : "Non"}
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => setTheme("light")}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Thème Clair
          </button>

          <button
            onClick={() => setTheme("dark")}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              backgroundColor: "#374151",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Thème Sombre
          </button>

          <button
            onClick={() => setTheme("system")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#059669",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Système
          </button>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: isDark ? "#374151" : "#f3f4f6",
            borderRadius: "0.5rem",
            border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Zone de Test</h2>
          <p>Cette zone change de couleur selon le thème sélectionné.</p>
          <p>Fond: {isDark ? "Gris foncé" : "Gris clair"}</p>
          <p>Texte: {isDark ? "Blanc" : "Noir"}</p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            fontSize: "0.875rem",
            opacity: 0.7,
          }}
        >
          <p>
            Si tu vois cette zone changer de couleur quand tu cliques sur les
            boutons, le thème fonctionne !
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "0.5rem",
          }}
        >
          <h3 style={{ color: "#92400e", marginBottom: "0.5rem" }}>
            Debug Info
          </h3>
          <p style={{ color: "#92400e", fontSize: "0.875rem" }}>
            <strong>Thème:</strong> {theme}
            <br />
            <strong>Classes HTML:</strong> {document.documentElement.className}
            <br />
            <strong>Classe dark:</strong>{" "}
            {document.documentElement.classList.contains("dark")
              ? "✅ Présente"
              : "❌ Absente"}
          </p>
        </div>
      </div>
    </div>
  );
}
