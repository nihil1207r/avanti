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
          <h1 className="font-display text-4xl sm:text-5xl font-bold animate-fade-in text-accent">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("legal.lastUpdate")}: {date}</p>
        </div>
      </section>
      <section className="py-14">
        <article
          className={[
            "container-edge max-w-3xl",
            "prose prose-neutral",
            "prose-h2:font-display prose-h2:text-accent prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold prose-h2:border-b prose-h2:border-accent/30 prose-h2:pb-2",
            "prose-h3:font-display prose-h3:text-foreground/90 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-semibold",
            "prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-3",
            "prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:my-1",
            "prose-strong:text-foreground",
            "prose-a:text-accent prose-a:underline hover:prose-a:text-accent/80",
            "prose-ul:my-4 prose-ul:space-y-1",
            "prose-hr:border-border prose-hr:my-8",
          ].join(" ")}
        >
          {children}
        </article>
      </section>
    </>
  );
}
