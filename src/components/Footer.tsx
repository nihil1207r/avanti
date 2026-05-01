import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="container-edge grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <img src={logo} alt="Avanti Pizza" className="h-14 brightness-0 invert opacity-90" />
          <p className="max-w-xs text-sm text-secondary-foreground/70 leading-relaxed">{t("footer.tagline")}</p>
          <div className="flex gap-3 pt-2">
            <a href="https://facebook.com" aria-label="Facebook" className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all">
              <Facebook className="size-4" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all">
              <Instagram className="size-4" />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok" className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-accent">{t("footer.quick")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/meniu" className="hover:text-accent transition-colors">{t("nav.menu")}</Link></li>
            <li><Link to="/alergeni" className="hover:text-accent transition-colors">{t("nav.allergens")}</Link></li>
            <li><Link to="/despre-noi" className="hover:text-accent transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-accent">{t("footer.legal")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/gdpr" className="hover:text-accent transition-colors">{t("legal.gdpr")}</Link></li>
            <li><Link to="/confidentialitate" className="hover:text-accent transition-colors">{t("legal.privacy")}</Link></li>
            <li><Link to="/termeni" className="hover:text-accent transition-colors">{t("legal.terms")}</Link></li>
            <li><Link to="/cookies" className="hover:text-accent transition-colors">{t("legal.cookies")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 grid gap-4 md:grid-cols-2 border-t border-secondary-foreground/15 pt-8">
          <div className="space-y-2 text-sm text-secondary-foreground/80">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-accent" /> Botoșani, România</p>
            <p className="flex items-center gap-2"><Phone className="size-4 text-accent" /> 0745 383 256</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener" className="rounded border border-secondary-foreground/30 px-3 py-1.5 text-xs hover:bg-secondary-foreground/10">ANPC SAL</a>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" className="rounded border border-secondary-foreground/30 px-3 py-1.5 text-xs hover:bg-secondary-foreground/10">ANPC SOL</a>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-5 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Avanti Pizza. {t("footer.rights")}
      </div>
    </footer>
  );
}
