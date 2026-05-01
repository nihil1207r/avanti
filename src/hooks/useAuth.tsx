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
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // loading stays true until BOTH session AND admin role are fully resolved
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Initial session load — resolve everything before clearing loading
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (cancelled) return;
      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user) {
        const admin = await fetchIsAdmin(s.user.id);
        if (!cancelled) setIsAdmin(admin);
      }

      if (!cancelled) setLoading(false);
    });

    // Subscribe to future auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, s) => {
      if (cancelled) return;
      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user) {
        const admin = await fetchIsAdmin(s.user.id);
        if (!cancelled) setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
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
