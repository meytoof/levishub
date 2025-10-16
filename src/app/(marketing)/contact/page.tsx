"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/ui/stateful-button";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";
import { toast } from "sonner";

const CalScheduler = dynamic(() => import("@/components/ui/cal-scheduler"), {
  ssr: false,
});

export default function ContactPage() {
  const [ok, setOk] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit() {
    setOk(null);

    // Récupérer les données du formulaire
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) {
      toast.error("Formulaire non trouvé");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          "Message envoyé avec succès ! Nous vous répondrons rapidement."
        );
        form.reset();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'envoi";
      toast.error(errorMessage);
      throw error; // Re-throw pour que le StatefulButton reste en état d'erreur
    }
  }

  return (
    <main className="container py-16">
      <Script id="ld-json-contact" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact - LevisWeb",
          alternateName: "Levis Web",
          description:
            "Contactez LevisWeb pour votre projet de développement web",
          url: "https://levisweb.net/contact",
          mainEntity: {
            "@type": "Organization",
            name: "LevisWeb",
            url: "https://levisweb.net",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "quentinlevis@gmail.com",
              availableLanguage: "French",
            },
          },
        })}
      </Script>
      <h1 className="text-3xl font-semibold text-foreground">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Dites-nous en plus sur votre projet, nous revenons vers vous rapidement.
      </p>
      <div className="mt-8 space-y-6 relative z-0">
        <form className="grid gap-4 max-w-xl">
          <div>
            <Label htmlFor="name" className="text-foreground">
              Votre nom
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">
              Votre email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground">
              Votre message
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-ring"
              required
            />
          </div>
          <StatefulButton
            onClick={handleSubmit}
            className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:from-indigo-600 hover:to-fuchsia-600"
          >
            Envoyer
          </StatefulButton>
          {ok && <p className="text-sm mt-2 text-foreground">{ok}</p>}
        </form>

        <div className="rounded-xl border border-border bg-card/40 backdrop-blur p-4 relative z-0">
          <h2 className="text-xl font-semibold text-foreground">
            Planifier un appel
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Choisissez un créneau pour un appel Google&nbsp;Meet.
          </p>
          <CalScheduler
            calSlug="levisweb"
            eventSlug="30min"
            accentColor="#8b5cf6"
            backgroundColor="transparent"
            textColor="#e5e7eb"
            prefillName={formData.name || undefined}
            prefillEmail={formData.email || undefined}
            prefillNotes={formData.message || undefined}
          />
        </div>
      </div>
    </main>
  );
}
