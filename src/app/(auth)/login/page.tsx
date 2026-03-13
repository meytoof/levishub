"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "motion/react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [shake, setShake] = useState(false);

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

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password.trim()) {
      toast.error("Veuillez remplir tous les champs");
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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur de connexion";
      toast.error(errorMessage);
      setError(errorMessage);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      throw error;
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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'envoi";
      toast.error(errorMessage);
      throw error;
    }
  }

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">
            Vérification de la session...
          </p>
        </div>
      </div>
    );
  }
  if (status === "authenticated") return null;

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
      <div className="w-full max-w-md">
        <motion.div
          animate={shake ? { x: [0, -10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              >
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  Connexion
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Accès réservé aux utilisateurs autorisés
                </p>

                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Email
                    </Label>
                    <div className="relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                        placeholder="vous@exemple.fr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Mot de passe
                    </Label>
                    <div className="relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-sm text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="w-full rounded-full h-12 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    Se connecter
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-neutral-500 hover:text-violet-500 transition-colors duration-200 underline-offset-4 hover:underline"
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
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  Mot de passe oublié
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Renseignez votre email, nous vous enverrons un lien de
                  réinitialisation.
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="forgotEmail"
                      className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                    >
                      Email
                    </Label>
                    <div className="relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                      <Input
                        id="forgotEmail"
                        type="email"
                        name="forgotEmail"
                        autoComplete="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        placeholder="vous@exemple.fr"
                        required
                        className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="w-full rounded-full h-12 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    Envoyer le lien
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-sm text-neutral-500 hover:text-violet-500 transition-colors duration-200 underline-offset-4 hover:underline"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      {/* Left brand panel */}
      <motion.div
        className="relative flex flex-col items-center justify-center overflow-hidden bg-neutral-950 px-10 py-16 text-white lg:sticky lg:top-0 lg:h-svh lg:w-1/2 lg:py-0"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Mesh gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, hsl(258 96% 67% / 0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, hsl(333 93% 56% / 0.3) 0%, transparent 50%)",
          }}
        />

        {/* Background wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
        >
          <span
            className="font-display block whitespace-nowrap text-[28vw] font-bold uppercase leading-none text-white lg:text-[14vw]"
            style={{ opacity: 0.06 }}
          >
            LevisWeb
          </span>
        </div>

        {/* Orbiting decorative element */}
        <div className="relative z-10 text-center">
          <motion.div
            className="mx-auto mb-8 h-20 w-20 rounded-full border border-violet-500/30 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-2 w-2 rounded-full bg-violet-400" />
          </motion.div>
          <span className="font-display block text-5xl font-bold navbar-logo lg:text-6xl">
            LevisWeb
          </span>
          <p className="mt-4 text-sm text-neutral-400">
            Agence Digitale — Savoie &amp; Chartreuse
          </p>
        </div>
      </motion.div>

      {/* Right form panel */}
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Chargement...</p>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
