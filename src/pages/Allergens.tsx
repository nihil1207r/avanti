import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { useCategories, useMenuItems } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

// ─── 6 section banner images ──────────────────────────────────────────────
const SECTIONS = [
  {
    slug: "burgeri",
    label_ro: "Burgeri",
    label_en: "Burgers",
    img: "/assets/01_burger.png",
    allergens_ro: "Gluten, Lactoză, Ouă, Muștar, Susan",
    allergens_en: "Gluten, Lactose, Eggs, Mustard, Sesame",
  },
  {
    slug: "pui",
    label_ro: "Meniu Chicken",
    label_en: "Chicken Menu",
    img: "/assets/02_chicken_menu.png",
    allergens_ro: "Gluten, Lactoză, Ouă",
    allergens_en: "Gluten, Lactose, Eggs",
  },
  {
    slug: "chicken-rolls",
    label_ro: "Chicken Rolls & Crispy",
    label_en: "Chicken Rolls & Crispy",
    img: "/assets/03_chicken_rolls.png",
    allergens_ro: "Gluten, Lactoză, Ouă",
    allergens_en: "Gluten, Lactose, Eggs",
  },
  {
    slug: "salate",
    label_ro: "Salate & Cartofi",
    label_en: "Salads & Fries",
    img: "/assets/04_salads.png",
    allergens_ro: "Lactoză, Ouă, Muștar",
    allergens_en: "Lactose, Eggs, Mustard",
  },
  {
    slug: "oferte-pizza",
    label_ro: "Oferte Pizza",
    label_en: "Pizza Offers",
    img: "/assets/05_pizza_offers.png",
    allergens_ro: "Gluten, Lactoză, Ouă",
    allergens_en: "Gluten, Lactose, Eggs",
  },
  {
    slug: "pizza",
    label_ro: "Pizza",
    label_en: "Pizza",
    img: "/assets/06_pizza_menu.png",
    allergens_ro: "Gluten, Lactoză, Ouă",
    allergens_en: "Gluten, Lactose, Eggs",
  },
] as const;

// ─── Fallback allergens for categories not in SECTIONS ────────────────────
const allergensBySlug_ro: Record<string, string> = {
  burgeri: "Gluten, Lactoză, Ouă, Muștar, Susan",
  pui: "Gluten, Lactoză, Ouă",
  "chicken-rolls": "Gluten, Lactoză, Ouă",
  salate: "Lactoză, Ouă, Muștar",
  "oferte-pizza": "Gluten, Lactoză, Ouă",
  pizza: "Gluten, Lactoză, Ouă",
  sosuri: "Ouă, Muștar, Lactoză",
  bauturi: "—",
};

const allergensBySlug_en: Record<string, string> = {
  burgeri: "Gluten, Lactose, Eggs, Mustard, Sesame",
  pui: "Gluten, Lactose, Eggs",
  "chicken-rolls": "Gluten, Lactose, Eggs",
  salate: "Lactose, Eggs, Mustard",
  "oferte-pizza": "Gluten, Lactose, Eggs",
  pizza: "Gluten, Lactose, Eggs",
  sosuri: "Eggs, Mustard, Lactose",
  bauturi: "—",
};

// ─── Component ────────────────────────────────────────────────────────────
const Allergens = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const { data: cats = [], isLoading: lc } = useCategories();
  const { data: items = [], isLoading: li } = useMenuItems();

  const isLoading = lc || li;

  return (
    <>
      <Seo
        title={`${t("allergensPage.title")} — Avanti Pizza`}
        description={t("allergensPage.intro")}
        path="/alergeni"
      />

      {/* ── Hero ── */}
      <section className="pt-32 pb-12 bg-gradient-warm">
        <div className="container-edge max-w-3xl text-center mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-bold animate-fade-in">
            {t("allergensPage.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in">
            {t("allergensPage.intro")}
          </p>
        </div>
      </section>

      {/* ── Tables ── */}
      <section className="py-16">
        <div className="container-edge space-y-10">
          {isLoading ? (
            <Skeleton className="h-96 rounded-2xl" />
          ) : (
            <>
              {/* ── Always render all 6 sections ── */}
              {SECTIONS.map((sec) => {
                const sectionLabel = lang === "en" ? sec.label_en : sec.label_ro;
                const sectionAllergens =
                  lang === "en" ? sec.allergens_en : sec.allergens_ro;

                // Try matching by category slug, then by item's category_slug field
                const cat = cats.find((c) => c.slug === sec.slug);
                const sectionItems = cat
                  ? items.filter((it) => it.category_id === cat.id && it.available)
                  : items.filter((it) => it.category_slug === sec.slug && it.available);

                // NOTE: we always render the section — even if sectionItems is empty.
                // This ensures all 6 images are always shown.

                return (
                  <div
                    key={sec.slug}
                    className="rounded-2xl overflow-hidden border border-border shadow-card print:shadow-none"
                  >
                    {/* ── Full section image — no crop, no black bars ── */}
                    <img
                      src={sec.img}
                      alt={sectionLabel}
                      className="w-full h-auto block"
                      loading="eager"
                      decoding="sync"
                    />

                    {/* ── Allergen rows (hidden if no items) ── */}
                    {sectionItems.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-secondary text-secondary-foreground text-xs uppercase tracking-wider">
                            <tr>
                              <th className="px-5 py-3 font-semibold">
                                {t("allergensPage.product")}
                              </th>
                              <th className="px-5 py-3 font-semibold hidden sm:table-cell">
                                {t("allergensPage.category")}
                              </th>
                              <th className="px-5 py-3 font-semibold">
                                {t("allergensPage.allergens")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sectionItems.map((it, idx) => (
                              <tr
                                key={it.id}
                                className={idx % 2 === 0 ? "bg-background" : "bg-muted/40"}
                              >
                                <td className="px-5 py-3 font-medium">
                                  {lang === "en" ? it.name_en : it.name_ro}
                                </td>
                                <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                                  {sectionLabel}
                                </td>
                                <td className="px-5 py-3 text-muted-foreground text-sm">
                                  {sectionAllergens}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* ── Catch-all: any DB categories not covered by the 6 SECTIONS ── */}
              {cats
                .filter((c) => !SECTIONS.find((s) => s.slug === c.slug))
                .map((cat) => {
                  const cItems = items.filter(
                    (it) => it.category_id === cat.id && it.available
                  );
                  if (!cItems.length) return null;
                  const catLabel = lang === "en" ? cat.name_en : cat.name_ro;
                  const catAllergens =
                    lang === "en"
                      ? allergensBySlug_en[cat.slug] ?? "—"
                      : allergensBySlug_ro[cat.slug] ?? "—";

                  return (
                    <div
                      key={cat.id}
                      className="rounded-2xl overflow-hidden border border-border shadow-card print:shadow-none"
                    >
                      <div className="bg-secondary px-6 py-4">
                        <span className="text-lg font-semibold">{catLabel}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-secondary/60 text-secondary-foreground text-xs uppercase tracking-wider">
                            <tr>
                              <th className="px-5 py-3 font-semibold">
                                {t("allergensPage.product")}
                              </th>
                              <th className="px-5 py-3 font-semibold hidden sm:table-cell">
                                {t("allergensPage.category")}
                              </th>
                              <th className="px-5 py-3 font-semibold">
                                {t("allergensPage.allergens")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {cItems.map((it, idx) => (
                              <tr
                                key={it.id}
                                className={idx % 2 === 0 ? "bg-background" : "bg-muted/40"}
                              >
                                <td className="px-5 py-3 font-medium">
                                  {lang === "en" ? it.name_en : it.name_ro}
                                </td>
                                <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">
                                  {catLabel}
                                </td>
                                <td className="px-5 py-3 text-muted-foreground text-sm">
                                  {catAllergens}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {/* ── Footer note ── */}
          <p className="text-sm text-muted-foreground italic">
            ⚠️ {t("allergensPage.commonNote")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Allergens;