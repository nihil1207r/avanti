import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

// ─── 6 section banner images ──────────────────────────────────────────────
const SECTIONS = [
  {
    slug: "burgeri",
    label_ro: "Burgeri",
    label_en: "Burgers",
    img: "/assets/01_burger.png",
  },
  {
    slug: "pui",
    label_ro: "Meniu Chicken",
    label_en: "Chicken Menu",
    img: "/assets/02_chicken_menu.png",
  },
  {
    slug: "chicken-rolls",
    label_ro: "Chicken Rolls & Crispy",
    label_en: "Chicken Rolls & Crispy",
    img: "/assets/03_chicken_rolls.png",
  },
  {
    slug: "salate",
    label_ro: "Salate & Cartofi",
    label_en: "Salads & Fries",
    img: "/assets/04_salads.png",
  },
  {
    slug: "oferte-pizza",
    label_ro: "Oferte Pizza",
    label_en: "Pizza Offers",
    img: "/assets/05_pizza_offers.png",
  },
  {
    slug: "pizza",
    label_ro: "Pizza",
    label_en: "Pizza",
    img: "/assets/06_pizza_menu.png",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────
const Allergens = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";

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

      {/* ── Images only ── */}
      <section className="py-16">
        <div className="container-edge space-y-10">
          {SECTIONS.map((sec) => (
            <div
              key={sec.slug}
              className="rounded-2xl overflow-hidden border border-border shadow-card print:shadow-none"
            >
              <img
                src={sec.img}
                alt={lang === "en" ? sec.label_en : sec.label_ro}
                className="w-full h-auto block"
                loading="eager"
                decoding="sync"
              />
            </div>
          ))}

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