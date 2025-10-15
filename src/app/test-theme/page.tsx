"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TestThemePage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log(
      "TestThemePage mounted, theme:",
      theme,
      "resolvedTheme:",
      resolvedTheme
    );
  }, [theme, resolvedTheme]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#111827" : "#ffffff",
        color: isDark ? "#ffffff" : "#000000",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "4xl", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            color: isDark ? "#ffffff" : "#000000",
          }}
        >
          Test des Thèmes
        </h1>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            borderRadius: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            État du Thème
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ color: isDark ? "#d1d5db" : "#374151" }}>
              <strong>Thème sélectionné:</strong> {theme}
            </p>
            <p style={{ color: isDark ? "#d1d5db" : "#374151" }}>
              <strong>Thème résolu:</strong> {resolvedTheme}
            </p>
            <p style={{ color: isDark ? "#d1d5db" : "#374151" }}>
              <strong>Mounted:</strong> {mounted ? "Oui" : "Non"}
            </p>
            <p style={{ color: isDark ? "#d1d5db" : "#374151" }}>
              <strong>Classes HTML:</strong>{" "}
              {document.documentElement.className}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                // no-op log
                setTheme("light");
              }}
              style={{
                padding: "0.5rem 1rem",
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
              onClick={() => {
                // no-op log
                setTheme("dark");
              }}
              style={{
                padding: "0.5rem 1rem",
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
              onClick={() => {
                // no-op log
                setTheme("system");
              }}
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
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            borderRadius: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            Test des Couleurs
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                backgroundColor: isDark ? "#374151" : "#f9fafb",
                border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "0.375rem",
              }}
            >
              <p
                style={{
                  color: isDark ? "#ffffff" : "#000000",
                }}
              >
                Background
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "0.375rem",
              }}
            >
              <p
                style={{
                  color: isDark ? "#ffffff" : "#000000",
                }}
              >
                Card
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: isDark ? "#4b5563" : "#f3f4f6",
                border: `1px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                borderRadius: "0.375rem",
              }}
            >
              <p
                style={{
                  color: isDark ? "#d1d5db" : "#374151",
                }}
              >
                Muted
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: isDark ? "#1e3a8a" : "#dbeafe",
                border: `1px solid ${isDark ? "#1e40af" : "#93c5fd"}`,
                borderRadius: "0.375rem",
              }}
            >
              <p
                style={{
                  color: isDark ? "#dbeafe" : "#1e3a8a",
                }}
              >
                Accent
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            borderRadius: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            Test des Textes
          </h3>

          <p
            style={{
              color: isDark ? "#ffffff" : "#000000",
              marginBottom: "0.5rem",
            }}
          >
            Ceci est un texte principal avec la couleur foreground.
          </p>

          <p
            style={{
              color: isDark ? "#d1d5db" : "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Ceci est un texte secondaire avec la couleur muted-foreground.
          </p>

          <p style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            Ceci est un texte de carte avec la couleur card-foreground.
          </p>
        </div>
      </div>
    </div>
  );
}
