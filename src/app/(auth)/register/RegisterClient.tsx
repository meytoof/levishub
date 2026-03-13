"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/ui/stateful-button";
import { SplitHeading } from "@/components/ui/split-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback, useState } from "react";
import { toast } from "sonner";
import gsap from "gsap";

interface Invitation {
  email: string;
  client: {
    name: string;
    companyName: string;
  };
}

function ParticlesOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const particles = container.querySelectorAll<HTMLDivElement>(".orbit-particle-r");
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
      });
      gsap.set(p, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-40 h-40 flex items-center justify-center">
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
            animation: "dash-draw-r 2s ease-in-out forwards",
          }}
        />
      </svg>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="orbit-particle-r absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: `hsl(${260 + i * 20}, 80%, ${60 + i * 5}%)`,
            opacity: 0.6 + i * 0.08,
          }}
        />
      ))}
      <style>{`
        @keyframes dash-draw-r {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function BrandPanel({ companyName }: { companyName?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
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

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, hsl(258 96% 67% / 0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(333 93% 56% / 0.15) 0%, transparent 50%)",
        }}
      />

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
  hint,
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
  hint?: string;
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
      {hint && <p className="text-xs text-white/20 mt-1">{hint}</p>}
    </div>
  );
}

export default function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  const token = searchParams.get("token");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "CLIENT") {
        router.push("/dashboard");
      }
    }
  }, [session, status, router]);

  useEffect(() => {
    if (token) {
      validateInvitation();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const validateInvitation = async () => {
    try {
      const response = await fetch(`/api/invitations/validate?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setInvitation(data.invitation as Invitation);
      } else {
        toast.error("Invitation invalide ou expirée");
        router.push("/login");
      }
    } catch {
      toast.error("Erreur lors de la validation de l'invitation");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (candidate: string) => {
    if (candidate.length < 8)
      return "Le mot de passe doit contenir au moins 8 caractères";
    if (!/[A-Z]/.test(candidate))
      return "Le mot de passe doit contenir au moins une majuscule";
    if (!/[a-z]/.test(candidate))
      return "Le mot de passe doit contenir au moins une minuscule";
    if (!/\d/.test(candidate))
      return "Le mot de passe doit contenir au moins un chiffre";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(candidate))
      return "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)";
    return null;
  };

  function shakeForm() {
    const el = formRef.current;
    if (!el) return;
    gsap.to(el, {
      keyframes: { x: [-12, 12, -8, 8, -4, 4, 0] },
      ease: "none",
      duration: 0.5,
    });
  }

  async function handleRegister() {
    setError(null);

    if (!invitation) {
      toast.error("Erreur : Invitation non trouvée");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Veuillez remplir tous les champs");
      shakeForm();
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      shakeForm();
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      shakeForm();
      return;
    }

    try {
      const requestData = {
        name: invitation.client.name,
        email: invitation.email,
        password,
        invitationToken: token,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success("Compte créé avec succès ! Connexion automatique...");

        const signInResult = await signIn("credentials", {
          email: invitation.email,
          password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/dashboard");
        } else {
          router.push(
            "/login?message=Compte créé avec succès. Veuillez vous connecter."
          );
        }
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la création du compte"
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la création du compte";
      toast.error(errorMessage);
      setError(errorMessage);
      shakeForm();
      throw err;
    }
  }

  const LoadingSpinner = () => (
    <div className="flex flex-1 items-center justify-center px-4 bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
        <p className="text-white/40 text-sm">Validation de l&apos;invitation...</p>
      </div>
    </div>
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-svh flex-col lg:flex-row">
        <BrandPanel />
        <LoadingSpinner />
      </div>
    );
  }

  if (!token) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <BrandPanel companyName={invitation?.client?.companyName} />

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16 bg-black">
        <div className="w-full max-w-md" ref={formRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="font-display text-3xl font-bold text-white mb-1">
              Créer votre compte
            </h2>
            {invitation && (
              <p className="text-sm text-white/30 mb-10">
                Bienvenue chez{" "}
                <span className="font-semibold text-white">
                  {invitation.client.companyName}
                </span>
              </p>
            )}

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <FloatingLabelInput
                id="password"
                name="new-password"
                type="password"
                label="Mot de passe"
                placeholder="Min. 8 car., maj., chiffre, symbole"
                value={password}
                onChange={setPassword}
                required
                autoFocus
                autoComplete="new-password"
                hint="Minimum 8 caractères, une majuscule, un chiffre et un caractère spécial"
              />

              <FloatingLabelInput
                id="confirmPassword"
                name="confirm-password"
                type="password"
                label="Confirmer le mot de passe"
                placeholder="Répétez votre mot de passe"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
                autoComplete="new-password"
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
                <StatefulButton
                  onClick={handleRegister}
                  className="w-full border border-violet-500/40 bg-transparent text-violet-400 h-12 font-semibold text-sm hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all duration-300 rounded-none"
                >
                  Créer mon compte →
                </StatefulButton>
              </MagneticButton>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/20">
                Vous avez déjà un compte ?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-violet-400 hover:text-violet-300"
                  onClick={() => router.push("/login")}
                >
                  Se connecter
                </Button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
