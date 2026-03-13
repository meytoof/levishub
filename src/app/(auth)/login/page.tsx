"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SplitHeading } from "@/components/ui/split-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useCallback, useState } from "react";
import { toast } from "sonner";
import gsap from "gsap";

function ParticlesOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const particles = container.querySelectorAll<HTMLDivElement>(".orbit-particle");
    particles.forEach((p, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const radius = 80 + i * 15;
      const duration = 8 + i * 2;
      gsap.to(p, {
        rotate: 360,
        duration,
        repeat: -1,
        ease: "none",
        transformOrigin: `${-radius}px 0px`,
        svgOrigin: `${radius}px 0px`,
      });
      gsap.set(p, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-40 h-40 flex items-center justify-center">
      {/* Center SVG L */}
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="relative z-10">
        <path
          d="M10 10 L10 60 L50 60"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: 0,
            animation: "dash-draw 2s ease-in-out forwards",
          }}
        />
      </svg>

      {/* Orbiting particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="orbit-particle absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: `hsl(${260 + i * 20}, 80%, ${60 + i * 5}%)`,
            opacity: 0.6 + i * 0.08,
          }}
        />
      ))}

      <style>{`
        @keyframes dash-draw {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function AuthLeftPanel({ companyName }: { companyName?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={panelRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-10 py-16 text-white lg:sticky lg:top-0 lg:h-svh lg:w-1/2 lg:py-0"
      style={{ background: "#050505" }}
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
          background: `radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.15), transparent 60%)`,
        }}
      />

      {/* Static gradient base */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, hsl(258 96% 67% / 0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(333 93% 56% / 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Background wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
      >
        <span
          className="font-display block whitespace-nowrap text-[28vw] font-bold uppercase leading-none text-white lg:text-[14vw]"
          style={{ opacity: 0.04 }}
        >
          LevisWeb
        </span>
      </div>

      <div className="relative z-10 text-center">
        <ParticlesOrbit />
        <div className="mt-8">
          <SplitHeading
            as="span"
            className="font-display block text-5xl font-bold text-white lg:text-6xl"
            triggerOnLoad
            delay={0.3}
          >
            LevisWeb
          </SplitHeading>
          <p className="mt-4 text-sm text-neutral-500">
            {companyName ? (
              <>Invitation pour <span className="font-semibold text-white">{companyName}</span></>
            ) : (
              "Agence Digitale — Savoie & Chartreuse"
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingLabelInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required,
  autoFocus,
  autoComplete,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
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
          textTransform: "uppercase" as const,
          color: focused ? "#8b5cf6" : "rgba(255,255,255,0.3)",
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
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={focused ? placeholder : ""}
        className="border-0 border-b bg-transparent px-0 pt-2 pb-3 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/20 rounded-none"
        style={{
          borderBottomColor: focused ? "#8b5cf6" : "rgba(255,255,255,0.15)",
          borderBottomWidth: "1px",
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      toast.success(message);
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const redirectPath =
        session.user.role === "ADMIN" ? "/admin" : "/dashboard";
      router.push(redirectPath);
    }
  }, [session, status, router]);

  function shakeForm() {
    const el = formRef.current;
    if (!el) return;
    gsap.to(el, {
      keyframes: { x: [-12, 12, -8, 8, -4, 4, 0] },
      ease: "none",
      duration: 0.5,
    });
  }

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      toast.error("Veuillez remplir tous les champs");
      shakeForm();
      return;
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Connexion réussie !");
        const newSession = await getSession();
        const redirectPath =
          newSession?.user?.role === "ADMIN" ? "/admin" : "/dashboard";
        router.push(redirectPath);
      } else {
        throw new Error("Identifiants invalides");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur de connexion";
      toast.error(errorMessage);
      setError(errorMessage);
      shakeForm();
      throw err;
    }
  }

  async function handleForgotPassword() {
    if (!forgotPasswordEmail.trim()) {
      toast.error("Veuillez entrer votre email");
      return;
    }
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });
      if (response.ok) {
        toast.success(
          "Si cet email existe, un lien de réinitialisation a été envoyé."
        );
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de l'envoi";
      toast.error(errorMessage);
      throw err;
    }
  }

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
          <p className="text-white/40 text-sm">Vérification de la session...</p>
        </div>
      </div>
    );
  }
  if (status === "authenticated") return null;

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16 bg-black">
      <div className="w-full max-w-md" ref={formRef}>
        <AnimatePresence mode="wait">
          {!showForgotPassword ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-white mb-1">
                Connexion
              </h2>
              <p className="text-sm text-white/30 mb-10">
                Accès réservé aux utilisateurs autorisés
              </p>

              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <FloatingLabelInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="vous@exemple.fr"
                  value={email}
                  onChange={setEmail}
                  required
                  autoFocus
                  autoComplete="email"
                />

                <FloatingLabelInput
                  id="password"
                  name="password"
                  type="password"
                  label="Mot de passe"
                  placeholder="••••••••"
                  value={password}
                  onChange={setPassword}
                  required
                  autoComplete="current-password"
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="text-sm text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <MagneticButton>
                  <button
                    type="submit"
                    className="w-full border border-violet-500/40 text-violet-400 h-12 font-semibold text-sm hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300 px-8"
                  >
                    Se connecter →
                  </button>
                </MagneticButton>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-white/20 hover:text-violet-400 transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <h2 className="font-display text-3xl font-bold text-white mb-1">
                Mot de passe oublié
              </h2>
              <p className="text-sm text-white/30 mb-10">
                Renseignez votre email, nous vous enverrons un lien de
                réinitialisation.
              </p>

              <div className="space-y-8">
                <div className="space-y-2">
                  <Label
                    htmlFor="forgotEmail"
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30"
                  >
                    Email
                  </Label>
                  <div
                    className="border-b pb-2 focus-within:border-violet-500 transition-colors duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <Input
                      id="forgotEmail"
                      type="email"
                      name="forgotEmail"
                      autoComplete="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      placeholder="vous@exemple.fr"
                      required
                      className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/20"
                    />
                  </div>
                </div>

                <MagneticButton>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="w-full border border-violet-500/40 text-violet-400 h-12 font-semibold text-sm hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300 px-8"
                  >
                    Envoyer le lien →
                  </button>
                </MagneticButton>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-white/20 hover:text-violet-400 transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Retour à la connexion
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <AuthLeftPanel />
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center bg-black">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
              <p className="text-white/40 text-sm">Chargement...</p>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
