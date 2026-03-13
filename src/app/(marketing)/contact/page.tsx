"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/ui/stateful-button";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";
import { toast } from "sonner";

const CalScheduler = dynamic(() => import("@/components/ui/cal-scheduler"), {
  ssr: false,
});

const CONTACT_INFO = [
  {
    label: "Téléphone",
    value: "07 83 42 26 76",
    href: "tel:+33783422676",
  },
  {
    label: "Email",
    value: "contact@levisweb.fr",
    href: "mailto:contact@levisweb.fr",
  },
  {
    label: "Localisation",
    value: "Entre-Deux-Guiers, Chartreuse",
    href: null,
  },
];

export default function ContactPage() {
  const [ok, setOk] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit() {
    setOk(null);

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
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'envoi";
      toast.error(errorMessage);
      throw error;
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

      {/* Split screen layout */}
      <div className="flex min-h-svh flex-col lg:flex-row">
        {/* Left panel — brand + tagline */}
        <motion.div
          className="relative flex flex-col justify-center overflow-hidden bg-neutral-950 px-10 py-16 text-white lg:sticky lg:top-0 lg:h-svh lg:w-1/2 lg:px-16 lg:py-0"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Mesh gradient background */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, hsl(258 96% 67% / 0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(333 93% 56% / 0.25) 0%, transparent 50%)",
            }}
          />

          {/* Animated background grain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Giant background wordmark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
          >
            <span
              className="font-display block whitespace-nowrap text-[22vw] font-bold uppercase leading-none text-white lg:text-[12vw]"
              style={{ opacity: 0.06 }}
            >
              LevisWeb
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            {/* Tagline — split text reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">
                Parlons de votre projet
              </p>
              <h1 className="font-display mb-8 text-4xl font-bold leading-tight tracking-tight lg:text-5xl xl:text-6xl">
                Votre projet{" "}
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  mérite
                </span>{" "}
                le meilleur.
              </h1>
              <p className="text-base leading-relaxed text-neutral-400 lg:text-lg">
                Dites-moi en plus sur votre projet digital. Ensemble, construisons
                un site qui convertit vraiment vos visiteurs en clients.
              </p>
            </motion.div>

            {/* Contact info with hover effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="mt-12 space-y-5"
            >
              {CONTACT_INFO.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="Tel"
                    className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">
                      {item.label}
                    </span>
                    <span className="mt-1 text-base font-medium text-white group-hover:text-violet-300 transition-colors duration-200">
                      {item.value}
                    </span>
                  </a>
                ) : (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">
                      {item.label}
                    </span>
                    <span className="mt-1 text-base font-medium text-white">
                      {item.value}
                    </span>
                  </div>
                )
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Right panel — form + Cal.com */}
        <motion.div
          className="flex flex-col gap-10 px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Form block */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Écrivez-moi
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Parlez-moi de vos objectifs, de votre contexte. Je réponds avec
                des premières pistes concrètes.
              </p>
            </div>

            <form className="space-y-6">
              {/* Name */}
              <div className="group relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                <Label
                  htmlFor="name"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                >
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
                  className="mt-1 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div className="group relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                >
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
                  className="mt-1 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                  placeholder="jean@entreprise.fr"
                />
              </div>

              {/* Message */}
              <div className="group relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                <Label
                  htmlFor="message"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                >
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
                  className="mt-1 min-h-28 w-full resize-none bg-transparent px-0 py-1 text-base text-foreground placeholder:text-neutral-400 focus:outline-none"
                  required
                  placeholder="Mon projet est..."
                />
              </div>

              <div data-cursor="Envoyer">
                <StatefulButton
                  onClick={handleSubmit}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:from-violet-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30"
                >
                  Envoyer mon message
                </StatefulButton>
              </div>
              {ok && <p className="text-sm mt-2 text-foreground">{ok}</p>}
            </form>
          </div>

          {/* Cal.com block — slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-0 rounded-2xl bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-neutral-500/30 shadow-xl p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-2 sm:text-2xl">
              Planifier un appel découverte
            </h2>
            <p className="text-sm text-muted-foreground mb-4 sm:text-base">
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
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
