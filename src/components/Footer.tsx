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
            <a href="https://www.facebook.com/avantipizzabt/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.instagram.com/avantipizzabt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-secondary-foreground/20 p-2.5 hover:bg-accent hover:text-accent-foreground hover:border-transparent transition-all">
              <Instagram className="size-4" />
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
          <div className="flex flex-wrap items-center gap-3">
            {/* ANPC SAL banner */}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded border-2 border-[#1a3a6b] bg-white text-[#1a3a6b] px-3 py-2 hover:bg-[#f0f4ff] transition-colors min-w-[230px]"
            >
              <div className="flex items-center justify-center rounded bg-[#1a3a6b] p-1.5 shrink-0">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="4" fill="#1a3a6b"/>
                  <text x="20" y="26" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ANPC</text>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-wide">{t("footer.anpcSalTitle")}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide">{t("footer.anpcSalSub")}</span>
                <span className="mt-1 text-[9px] font-semibold text-[#c8102e] uppercase border border-[#c8102e] px-1.5 py-0.5 rounded self-start">{t("footer.anpcDetails")}</span>
              </div>
            </a>
            {/* ANPC SOL banner */}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded border-2 border-[#1a3a6b] bg-[#1a3a6b] text-white px-3 py-2 hover:bg-[#162f5a] transition-colors min-w-[230px]"
            >
              <div className="flex items-center justify-center rounded bg-white p-1.5 shrink-0">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="4" fill="#003399"/>
                  <text x="20" y="26" textAnchor="middle" fill="#FFD700" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ANPC</text>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-wide">{t("footer.anpcSolTitle")}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide">{t("footer.anpcSolSub")}</span>
                <span className="mt-1 text-[9px] font-semibold text-[#FFD700] uppercase border border-[#FFD700] px-1.5 py-0.5 rounded self-start">{t("footer.anpcDetails")}</span>
              </div>
            </a>
          </div>
          <div className="space-y-2 text-sm text-secondary-foreground/80 md:text-right">
            <p className="flex items-center gap-2 md:justify-end"><MapPin className="size-4 text-accent" /> Botoșani, România</p>
            <p className="flex items-center gap-2 md:justify-end"><Phone className="size-4 text-accent" /> 0745 383 256</p>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-5 text-center text-xs text-secondary-foreground/60">
        © {new Date().getFullYear()} Avanti Pizza. {t("footer.rights")}
      </div>
    </footer>
  );
}