import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { ReactNode } from "react";

export function LegalLayout({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  const { t } = useTranslation();
  const date = new Date().toLocaleDateString();
  return (
    <>
      <Seo title={`${title} — Avanti Pizza`} description={title} path={path} />
      <section className="pt-32 pb-12 bg-gradient-warm">
        <div className="container-edge max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold animate-fade-in">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("legal.lastUpdate")}: {date}</p>
        </div>
      </section>
      <section className="py-12">
        <article className="container-edge max-w-3xl prose prose-neutral prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          {children}
        </article>
      </section>
    </>
  );
}
