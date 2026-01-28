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
          "Message envoyé avec succès ! Nous vous répondrons rapidement.",
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
    <main className="min-h-svh">
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

      <section className="relative mx-auto max-w-6xl px-6 sm:px-8 py-16 sm:py-24">
        <header className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-black/10 px-4 py-1 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-cyan-300 mb-4">
            Parlons de votre projet
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-cyan mb-4">
            Contactez <span className="navbar-logo">LevisWeb</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Dites-nous en plus sur votre projet digital. Ensemble, construisons
            un site qui convertit vraiment vos visiteurs en clients.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-start">
          {/* Bloc formulaire */}
          <div className="relative z-0 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-neutral-500/30 shadow-xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
              Écrivez-moi un message
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Parlez-moi de votre projet : vos objectifs, vos attentes, votre
              contexte. Je vous réponds rapidement avec des premières pistes
              concrètes.
            </p>

            <form className="grid gap-4">
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
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="min-h-32 w-full rounded-md border border-input bg-background p-3 text-sm text-foreground shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-ring"
                  required
                />
              </div>
              <StatefulButton
                onClick={handleSubmit}
                className="h-11 rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:from-indigo-600 hover:to-fuchsia-600"
              >
                Envoyer mon message
              </StatefulButton>
              {ok && <p className="text-sm mt-2 text-foreground">{ok}</p>}
            </form>
          </div>

          {/* Bloc planning d'appel */}
          <div className="relative z-0 rounded-2xl bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-neutral-500/30 shadow-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Planifier un appel découverte
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Choisissez un créneau pour un échange en visio (Google&nbsp;Meet).
              Nous ferons le point sur vos besoins, vos objectifs et les
              prochaines étapes possibles.
            </p>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-2 sm:p-3">
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
        </div>
      </section>
    </main>
  );
}
