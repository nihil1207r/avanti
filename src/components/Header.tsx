import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith("en") ? "ro" : "en");

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/meniu", label: t("nav.menu") },
    { to: "/despre-noi", label: t("nav.about") },
    { to: "/alergeni", label: t("nav.allergens") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const onDarkOverlay = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav py-2 shadow-sm" : "bg-transparent py-4",
      )}
    >
      <div className="container-edge flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Avanti Pizza">
          <img src={logo} alt="Avanti Pizza" className={cn("transition-all", scrolled ? "h-10" : "h-12")} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium tracking-wide story-link transition-colors",
                  onDarkOverlay ? "text-white/95 hover:text-white" : "text-foreground hover:text-primary",
                  isActive && "text-primary",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleLang}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
              onDarkOverlay
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-border text-foreground hover:bg-muted",
            )}
            aria-label="Toggle language"
          >
            <Globe className="size-3.5" />
            {i18n.language.startsWith("en") ? "EN" : "RO"}
          </button>
        </div>

        <button
          className={cn("md:hidden p-2 rounded-lg", onDarkOverlay ? "text-white" : "text-foreground")}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-out",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-edge mt-3 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl p-4 shadow-elegant">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 px-2">
              <button onClick={toggleLang} className="flex items-center gap-2 text-sm font-semibold uppercase">
                <Globe className="size-4" /> {i18n.language.startsWith("en") ? "English" : "Română"}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}