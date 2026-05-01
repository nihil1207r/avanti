import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const KEY = "avanti-cookie-consent";

export function CookieBanner() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  const decide = (v: "accept" | "decline") => {
    localStorage.setItem(KEY, v);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] animate-fade-in-down">
      <div className="container-edge pb-4">
        <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-elegant p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-foreground/90 flex-1">
            🍪 {t("cookieBanner.text")}{" "}
            <Link to="/cookies" className="story-link relative font-semibold text-primary">{t("cookieBanner.more")}</Link>
          </p>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => decide("decline")}>{t("cookieBanner.decline")}</Button>
            <Button size="sm" onClick={() => decide("accept")} className="bg-primary hover:bg-primary-glow">{t("cookieBanner.accept")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
