import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/Seo";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

// Simple client-side rate limiter: max 5 attempts per 60 s
const attempts: number[] = [];
function isRateLimited(): boolean {
  const now = Date.now();
  // Remove entries older than 60 s
  while (attempts.length && attempts[0] < now - 60_000) attempts.shift();
  if (attempts.length >= 5) return true;
  attempts.push(now);
  return false;
}

const Auth = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRateLimited()) {
      toast.error("Too many attempts. Please wait a moment before trying again.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success(t("auth.signedIn"));
      nav("/admin");
    } catch (err: unknown) {
      // Deliberately vague message to avoid user enumeration
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Autentificare — Avanti Pizza" description="Autentificare admin Avanti Pizza" path="/auth" />
      <section className="min-h-screen grid place-items-center bg-gradient-warm pt-24 pb-12 px-4">
        <div className="w-full max-w-md rounded-2xl bg-card shadow-elegant border border-border p-8">
          <img src={logo} alt="Avanti" className="h-14 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-center mb-1">{t("auth.signin")}</h1>
          <p className="text-center text-sm text-muted-foreground mb-6">Avanti Pizza Admin</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-glow"
              size="lg"
            >
              {loading ? "..." : t("auth.signinBtn")}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Auth;
