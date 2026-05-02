import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import "./lib/i18n";

// ✅ PERF: Route-level code splitting with React.lazy
// Each page is its own JS chunk — users only download the page they visit.
// Home is NOT lazy so the first paint has zero extra round-trip.
import Home from "./pages/Home";

const Menu      = lazy(() => import("./pages/Menu"));
const About     = lazy(() => import("./pages/About"));
const Contact   = lazy(() => import("./pages/Contact"));
const Allergens = lazy(() => import("./pages/Allergens"));
const Gdpr      = lazy(() => import("./pages/Gdpr"));
const Privacy   = lazy(() => import("./pages/Privacy"));
const Terms     = lazy(() => import("./pages/Terms"));
const Cookies   = lazy(() => import("./pages/Cookies"));
const Auth      = lazy(() => import("./pages/Auth"));
const Admin     = lazy(() => import("./pages/Admin"));
const NotFound  = lazy(() => import("./pages/NotFound"));

// ✅ PERF: Optimized QueryClient — aggressive stale time cuts redundant network calls
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes — no re-fetch on every component mount
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Only retry once on failure (default is 3 — causes slow error UX)
      retry: 1,
    },
  },
});

// Minimal loading fallback — keeps layout stable, no spinner flash
function PageFallback() {
  return (
    <div
      className="min-h-screen bg-background"
      aria-hidden="true"
    />
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/"                   element={<Layout><Home /></Layout>} />
                <Route path="/meniu"              element={<Layout><Menu /></Layout>} />
                <Route path="/despre-noi"         element={<Layout><About /></Layout>} />
                <Route path="/contact"            element={<Layout><Contact /></Layout>} />
                <Route path="/alergeni"           element={<Layout><Allergens /></Layout>} />
                <Route path="/gdpr"               element={<Layout><Gdpr /></Layout>} />
                <Route path="/confidentialitate"  element={<Layout><Privacy /></Layout>} />
                <Route path="/termeni"            element={<Layout><Terms /></Layout>} />
                <Route path="/cookies"            element={<Layout><Cookies /></Layout>} />
                <Route path="/auth"               element={<Auth />} />
                <Route path="/admin"              element={<Layout><Admin /></Layout>} />
                <Route path="*"                   element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
