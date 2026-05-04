import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import anpcSal from "@/assets/anpc-sal.svg";
import anpcSol from "@/assets/anpc-sol.svg";

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
          <div className="flex flex-row flex-wrap items-center justify-center gap-4">

            {/* SAL badge */}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ANPC - Soluționarea Alternativă a Litigiilor"
            >
              <img
                src={anpcSal}
                alt="ANPC SAL"
                className="h-[50px] w-auto object-contain"
              />
            </a>

            {/* SOL badge */}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ANPC - Soluționarea Online a Litigiilor"
            >
              <img
                src={anpcSol}
                alt="ANPC SOL"
                className="h-[50px] w-auto object-contain"
              />
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end space-y-2 text-sm text-secondary-foreground/80">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Botoșani, România
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" /> 0745 383 256
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