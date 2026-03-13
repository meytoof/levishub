"use client";
import { Input } from "@/components/ui/input";
import { StatefulButton } from "@/components/ui/stateful-button";
import { SplitHeading } from "@/components/ui/split-heading";
import { LineReveal } from "@/components/ui/line-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, useMotionValue } from "motion/react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useState, useCallback } from "react";
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

function FloatingInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required,
  accentColor,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  accentColor: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        htmlFor={id}
        className="absolute left-0 transition-all duration-300 pointer-events-none"
        style={{
          top: focused || hasValue ? "0px" : "20px",
          fontSize: focused || hasValue ? "10px" : "14px",
          letterSpacing: focused || hasValue ? "0.2em" : "0.05em",
          textTransform: "uppercase",
          color: focused ? accentColor : "rgba(255,255,255,0.3)",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={focused ? placeholder : ""}
        className="border-0 border-b bg-transparent px-0 pt-2 pb-3 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/20 rounded-none"
        style={{
          borderBottomColor: focused ? accentColor : "rgba(255,255,255,0.15)",
          borderBottomWidth: "1px",
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  accentColor,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  accentColor: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative pt-5">
      <label
        htmlFor={id}
        className="absolute left-0 transition-all duration-300 pointer-events-none"
        style={{
          top: focused || hasValue ? "0px" : "20px",
          fontSize: focused || hasValue ? "10px" : "14px",
          letterSpacing: focused || hasValue ? "0.2em" : "0.05em",
          textTransform: "uppercase",
          color: focused ? accentColor : "rgba(255,255,255,0.3)",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={focused ? placeholder : ""}
        className="mt-2 w-full resize-none bg-transparent pt-2 pb-3 text-base text-white placeholder:text-white/20 focus:outline-none min-h-[120px] border-b"
        style={{
          borderBottomColor: focused ? accentColor : "rgba(255,255,255,0.15)",
          borderBottomWidth: "1px",
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  async function handleSubmit() {
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
        toast.success("Message envoyé avec succès ! Nous vous répondrons rapidement.");
        form.reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'envoi";
      toast.error(errorMessage);
      throw error;
    }
  }

  return (
    <main className="bg-black text-white min-h-svh">
      <Script id="ld-json-contact" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact - LevisWeb",
          alternateName: "Levis Web",
          description: "Contactez LevisWeb pour votre projet de développement web",
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

      {/* Statement section — 60vh */}
      <section className="relative flex flex-col justify-center min-h-[60vh] px-8 md:px-16 lg:px-24 py-24 overflow-hidden">
        {/* SVG blob background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="blob-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <ellipse cx="400" cy="300" rx="350" ry="280" fill="url(#blob-grad)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl">
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-mono mb-8">Contact</p>
          <SplitHeading
            as="h1"
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8"
            triggerOnLoad
          >
            Parlons de votre projet.
          </SplitHeading>
          <LineReveal className="w-32" color="#8b5cf6" height={2} delay={0.8} />
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">
            Dites-moi en plus sur votre projet digital. Ensemble, construisons
            un site qui convertit vraiment vos visiteurs en clients.
          </p>
        </div>
      </section>

      {/* Split 50/50 */}
      <section className="flex min-h-svh flex-col lg:flex-row border-t border-white/10">
        {/* Left sticky — contact info */}
        <motion.div
          className="relative flex flex-col justify-center overflow-hidden bg-neutral-950 px-10 py-16 text-white lg:sticky lg:top-0 lg:h-svh lg:w-1/2 lg:px-16 lg:py-0"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onMouseMove={handleMouseMove}
        >
          {/* Radial gradient following mouse */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.12), transparent 60%)`,
            }}
          />

          {/* Giant background wordmark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
          >
            <span
              className="font-display block whitespace-nowrap text-[22vw] font-bold uppercase leading-none text-white lg:text-[12vw]"
              style={{ opacity: 0.05 }}
            >
              LevisWeb
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="mb-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">
                Nos coordonnées
              </p>
              <h2 className="font-display text-3xl font-bold text-white">
                On est là pour vous
              </h2>
            </div>

            <div className="space-y-8">
              {CONTACT_INFO.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="link"
                    className="group flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-1">
                      {item.label}
                    </span>
                    <span className="text-lg font-medium text-white group-hover:text-violet-300 transition-colors duration-200">
                      {item.value}
                    </span>
                    <div className="mt-1 h-px bg-white/10 group-hover:bg-violet-500 transition-colors duration-300" />
                  </a>
                ) : (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-1">
                      {item.label}
                    </span>
                    <span className="text-lg font-medium text-white">{item.value}</span>
                    <div className="mt-1 h-px bg-white/10" />
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Right — minimal form */}
        <motion.div
          className="flex flex-col gap-16 px-8 py-16 lg:w-1/2 lg:px-16 bg-black"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Écrivez-moi
            </h2>
            <p className="text-white/30 text-sm mb-10">
              Parlez-moi de vos objectifs, de votre contexte. Je réponds avec
              des premières pistes concrètes.
            </p>

            <form className="space-y-8">
              <FloatingInput
                id="name"
                name="name"
                label="Votre nom"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={(val) => setFormData((prev) => ({ ...prev, name: val }))}
                required
                accentColor="#8b5cf6"
              />

              <FloatingInput
                id="email"
                name="email"
                type="email"
                label="Votre email"
                placeholder="jean@entreprise.fr"
                value={formData.email}
                onChange={(val) => setFormData((prev) => ({ ...prev, email: val }))}
                required
                accentColor="#8b5cf6"
              />

              <FloatingTextarea
                id="message"
                name="message"
                label="Votre message"
                placeholder="Mon projet est..."
                value={formData.message}
                onChange={(val) => setFormData((prev) => ({ ...prev, message: val }))}
                required
                accentColor="#8b5cf6"
              />

              <div data-cursor="magnetic" className="pt-4">
                <MagneticButton>
                  <StatefulButton
                    onClick={handleSubmit}
                    className="h-14 w-full border border-violet-500/40 bg-transparent text-violet-400 font-semibold text-sm hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300 rounded-none"
                  >
                    Envoyer mon message →
                  </StatefulButton>
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Cal.com */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="border border-white/10 p-8"
          >
            <h2 className="font-display text-xl font-semibold text-white mb-2">
              Planifier un appel découverte
            </h2>
            <p className="text-sm text-white/30 mb-6">
              Choisissez un créneau pour un échange en visio (Google Meet).
              Nous ferons le point sur vos besoins, vos objectifs et les
              prochaines étapes possibles.
            </p>
            <div className="border border-white/10 bg-black/30 p-2">
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
      </section>
    </main>
  );
}
