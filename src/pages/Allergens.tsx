import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { useCategories, useMenuItems } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

// Common allergens per category (curated)
const allergensByCategory_ro: Record<string, string> = {
  pizza: "Gluten, Lactoză, Ouă",
  burgeri: "Gluten, Lactoză, Ouă, Muștar, Susan",
  pui: "Gluten, Lactoză, Ouă",
  salate: "Lactoză, Ouă, Muștar",
  post: "Gluten",
  sosuri: "Ouă, Muștar, Lactoză",
  bauturi: "—",
  top: "Variabil",
};

const allergensByCategory_en: Record<string, string> = {
  pizza: "Gluten, Lactose, Eggs",
  burgeri: "Gluten, Lactose, Eggs, Mustard, Sesame",
  pui: "Gluten, Lactose, Eggs",
  salate: "Lactose, Eggs, Mustard",
  post: "Gluten",
  sosuri: "Eggs, Mustard, Lactose",
  bauturi: "—",
  top: "Variable",
};

const Allergens = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const allergensByCategory = lang === "en" ? allergensByCategory_en : allergensByCategory_ro;
  const { data: cats = [], isLoading: lc } = useCategories();
  const { data: items = [], isLoading: li } = useMenuItems();

  return (
    <>
      <Seo title={`${t("allergensPage.title")} — Avanti Pizza`} description={t("allergensPage.intro")} path="/alergeni" />

      <section className="pt-32 pb-12 bg-gradient-warm">
        <div className="container-edge max-w-3xl text-center mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-bold animate-fade-in">{t("allergensPage.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in">{t("allergensPage.intro")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-edge">
          {(lc || li) ? (
            <Skeleton className="h-96 rounded-2xl" />
          ) : (
            <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden print:shadow-none">
              <table className="w-full text-left">
                <thead className="bg-secondary text-secondary-foreground text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4">{t("allergensPage.product")}</th>
                    <th className="px-5 py-4">{t("allergensPage.category")}</th>
                    <th className="px-5 py-4">{t("allergensPage.allergens")}</th>
                  </tr>
                </thead>
                <tbody>
                  {cats.flatMap((cat) => {
                    const cItems = items.filter((it) => it.category_id === cat.id && it.available);
                    return cItems.map((it, idx) => (
                      <tr key={it.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/40"}>
                        <td className="px-5 py-3 font-medium">{lang === "en" ? it.name_en : it.name_ro}</td>
                        <td className="px-5 py-3 text-muted-foreground">{lang === "en" ? cat.name_en : cat.name_ro}</td>
                        <td className="px-5 py-3 text-muted-foreground text-sm">{allergensByCategory[cat.slug] ?? "—"}</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-6 text-sm text-muted-foreground italic">⚠️ {t("allergensPage.commonNote")}</p>
        </div>
      </section>
    </>
  );
};

export default Allergens;