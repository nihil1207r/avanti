import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import anpcSal from "@/assets/anpc-sal.svg";
import anpcSol from "@/assets/anpc-sol.svg";

// TikTok icon (not in lucide-react, so we use a custom SVG)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-edge grid gap-10 py-16 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4 md:col-span-2">
          <img src={logo} alt="Avanti Pizza" className="h-14 brightness-0 invert opacity-90" />
          <p className="max-w-xs text-sm text-secondary-foreground/70 leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="https://www.facebook.com/avantipizzabt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/avantipizzabt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@avanti.pizza.bt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display text-lg mb-4 text-accent">{t("footer.quick")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/meniu" className="hover:text-accent transition-colors">{t("nav.menu")}</Link></li>
            <li><Link to="/alergeni" className="hover:text-accent transition-colors">{t("nav.allergens")}</Link></li>
            <li><Link to="/despre-noi" className="hover:text-accent transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="font-display text-lg mb-4 text-accent">{t("footer.legal")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/gdpr" className="hover:text-accent transition-colors">{t("legal.gdpr")}</Link></li>
            <li><Link to="/confidentialitate" className="hover:text-accent transition-colors">{t("legal.privacy")}</Link></li>
            <li><Link to="/termeni" className="hover:text-accent transition-colors">{t("legal.terms")}</Link></li>
            <li><Link to="/cookies" className="hover:text-accent transition-colors">{t("legal.cookies")}</Link></li>
          </ul>
        </div>

        {/* Bottom row: ANPC badges + contact */}
        <div className="md:col-span-4 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-secondary-foreground/15 pt-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ANPC - Soluționarea Alternativă a Litigiilor"
            >
              <img src={anpcSal} alt="ANPC SAL" className="h-[54px] w-auto object-contain" />
            </a>
            <a
              href="https://consumer-redress.ec.europa.eu/site-relocation_en?event=main.home2.show&lng=RO"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ANPC - Soluționarea Online a Litigiilor"
            >
              <img src={anpcSol} alt="ANPC SOL" className="h-[54px] w-auto object-contain" />
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-2 text-sm text-secondary-foreground/80">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" /> Botoșani, România
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 text-accent" /> 0745 383 256
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-foreground/10 py-5 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Avanti Pizza. {t("footer.rights")}
      </div>
    </footer>
  );
}