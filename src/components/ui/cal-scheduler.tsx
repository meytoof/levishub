"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";

type CalSchedulerProps = {
  // Votre nom d'utilisateur Cal.com ou slug d'équipe
  calSlug: string;
  // Nom de l'évènement (ex: 30min)
  eventSlug?: string;
  // Couleurs pour s'intégrer au design marketing (fond sombre possible)
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  // Prefill du meeting
  prefillName?: string;
  prefillEmail?: string;
  prefillNotes?: string;
};

export default function CalScheduler({
  calSlug,
  eventSlug = "30min",
  accentColor = "#6366f1",
  backgroundColor = "transparent",
  textColor = "#e5e7eb",
  prefillName,
  prefillEmail,
  prefillNotes,
}: CalSchedulerProps) {
  const calRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initCal = async () => {
      try {
        const cal = await getCalApi();

        if (cal && calRef.current) {
          // Configuration des styles (branding uniquement supporté)
          cal("ui", {
            styles: {
              branding: { brandColor: accentColor },
            },
          });

          // Créer l'embed inline
          cal("inline", {
            elementOrSelector: calRef.current,
            calLink: `${calSlug}/${eventSlug}`,
            config: {
              layout: "month_view",
              theme: "dark",
            },
            prefill: {
              name: prefillName || undefined,
              email: prefillEmail || undefined,
              notes: prefillNotes || undefined,
            },
          });

          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de Cal.com:", error);
      }
    };

    initCal();
  }, [
    calSlug,
    eventSlug,
    accentColor,
    backgroundColor,
    textColor,
    prefillName,
    prefillEmail,
    prefillNotes,
  ]);

  return (
    <div className="w-full">
      {!isLoaded && (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Chargement du calendrier...
        </div>
      )}
      <div
        ref={calRef}
        className="cal-embed"
        style={{
          width: "100%",
          height: "min(600px, 70vh)",
          minHeight: "300px",
          maxHeight: "70vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          zIndex: 0,
          display: isLoaded ? "block" : "none",
        }}
      />
    </div>
  );
}
