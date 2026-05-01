import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

async function fetchIsAdmin(userId: string): Promise<boolean> {
  try {
    const result = await Promise.race([
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 5000)
      ),
    ]);
    return !!result.data;
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // loading stays true until BOTH session AND admin role are fully resolved
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // onAuthStateChange fires INITIAL_SESSION on mount, covering the first
    // session load — no need for a separate getSession() call.
    // keeping loading=true until BOTH the session AND the admin role check
    // are resolved prevents Admin.tsx from briefly flashing "Not Admin"
    // after a successful sign-in while fetchIsAdmin is still in-flight.
    const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, s) => {
      if (cancelled) return;
      setLoading(true);
      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user) {
        const admin = await fetchIsAdmin(s.user.id);
        if (!cancelled) setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }

      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);