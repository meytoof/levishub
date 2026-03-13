"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/ui/stateful-button";
import { motion, AnimatePresence } from "motion/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Invitation {
  email: string;
  client: {
    name: string;
    companyName: string;
  };
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
  const [shake, setShake] = useState(false);

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
      const response = await fetch(
        `/api/invitations/validate?token=${token}`
      );
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

  async function handleRegister() {
    setError(null);

    if (!invitation) {
      toast.error("Erreur : Invitation non trouvée");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      setShake(true);
      setTimeout(() => setShake(false), 500);
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
      setShake(true);
      setTimeout(() => setShake(false), 500);
      throw err;
    }
  }

  const LoadingSpinner = () => (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">
          Validation de l&apos;invitation...
        </p>
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
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md">
          <motion.div
            animate={shake ? { x: [0, -10, 10, -8, 8, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Créer votre compte
            </h2>
            {invitation && (
              <p className="text-sm text-muted-foreground mb-8">
                Bienvenue chez{" "}
                <span className="font-semibold text-foreground">
                  {invitation.client.companyName}
                </span>
              </p>
            )}

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
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
                    name="new-password"
                    autoComplete="new-password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                    placeholder="Min. 8 car., maj., chiffre, symbole"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum 8 caractères, une majuscule, un chiffre et un
                  caractère spécial
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500"
                >
                  Confirmer le mot de passe
                </Label>
                <div className="relative border-b border-neutral-300 pb-2 focus-within:border-violet-500 transition-colors duration-300 dark:border-neutral-700 dark:focus-within:border-violet-400">
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-neutral-400"
                    placeholder="Répétez votre mot de passe"
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

              <StatefulButton
                onClick={handleRegister}
                className="w-full rounded-full h-12 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:from-violet-700 hover:to-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30"
              >
                Créer mon compte
              </StatefulButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-violet-500 hover:text-violet-600"
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

function BrandPanel({ companyName }: { companyName?: string }) {
  return (
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
        {companyName && (
          <p className="mt-4 text-sm text-neutral-400">
            Invitation pour{" "}
            <span className="font-semibold text-white">{companyName}</span>
          </p>
        )}
        {!companyName && (
          <p className="mt-4 text-sm text-neutral-400">
            Agence Digitale — Savoie &amp; Chartreuse
          </p>
        )}
      </div>
    </motion.div>
  );
}
