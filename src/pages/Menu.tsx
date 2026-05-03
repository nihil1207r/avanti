import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Pizza } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Seo } from "@/components/Seo";
import { ProductCard } from "@/components/ProductCard";
import { ProductBadge } from "@/components/ProductBadge";
import { useCategories, useMenuItems } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductImage, DRINKS_CATEGORY_ID } from "@/lib/categoryImages";
import type { MenuItem } from "@/lib/types";

const Menu = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const { data: cats = [], isLoading: lc } = useCategories();
  const { data: items = [], isLoading: li } = useMenuItems();
  const [active, setActive] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // ✅ Fix: resolves to pizza category once cats loads, not "all"
  const effectiveActive = useMemo(() => {
    if (active !== null) return active;
    return cats.find((c) => c.slug === "pizza")?.id ?? "all";
  }, [active, cats]);

  const filtered = useMemo(() => {
    let list = items.filter((i) => i.available);
    if (effectiveActive === "top") list = list.filter((i) => i.is_featured);
    else if (effectiveActive !== "all") list = list.filter((i) => i.category_id === effectiveActive);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((i) =>
        (i.name_ro + " " + i.name_en + " " + (i.ingredients_ro ?? "") + " " + (i.ingredients_en ?? ""))
          .toLowerCase()
          .includes(s),
      );
    }
    return list;
  }, [items, effectiveActive, q]);

  const tabs = [
    ...cats.map((c) => ({ id: c.id, label: lang === "en" ? c.name_en : c.name_ro, slug: c.slug })),
    { id: "all", label: t("menu.all") },
  ];

  const isLoading = lc || li;

  return (
    <>
      <Seo
        title={`${t("menu.title")} — Avanti Pizza`}
        description="Meniul complet Avanti Pizza: pizza artizanală, burgeri, preparate cu pui, salate, băuturi. Vezi toate prețurile."
        path="/meniu"
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-warm">
        <div className="container-edge text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold animate-fade-in-down">Avanti</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold animate-fade-in">{t("menu.title")}</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in">{t("menu.subtitle")}</p>

          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("menu.search")}
              className="pl-11 h-12 rounded-full bg-card border-border shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-16 z-30 border-y border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="container-edge overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {tabs.map((tab) => {
              const isActive = effectiveActive === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    isActive ? "text-primary-foreground" : "text-foreground hover:bg-muted",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute inset-0 bg-primary rounded-full shadow-warm"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical Grid */}
      <section className="py-12 sm:py-16">
        <div className="container-edge">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">{t("menu.empty")}</p>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((it, i) => (
                  <ProductCard key={it.id} item={it} index={i} onClick={() => setSelectedItem(it)} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Order CTA */}
      <section className="py-10 sm:py-14 bg-gradient-warm">
        <div className="container-edge flex justify-center">
          <a
            href="https://comanda.avantipizza.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-warm hover:bg-primary/90 transition-colors"
          >
            {t("modal.order")} →
          </a>
        </div>
      </section>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem &&
          (() => {
            const lang2 = i18n.language.startsWith("en") ? "en" : "ro";
            const name = lang2 === "en" ? selectedItem.name_en : selectedItem.name_ro;
            const ingredients = lang2 === "en" ? selectedItem.ingredients_en : selectedItem.ingredients_ro;
            const src = getProductImage(selectedItem);
            return (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.9, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 24 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="relative w-full max-w-md rounded-3xl bg-card shadow-2xl overflow-hidden border border-border/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-5" />
                  </button>

                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {src ? (
                      <img
                        src={src}
                        alt={name}
                        className={[
                          "size-full transition-transform duration-300",
                          selectedItem.category_id === DRINKS_CATEGORY_ID
                            ? "object-contain p-6"
                            : "object-cover",
                        ].join(" ")}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-gradient-warm">
                        <Pizza className="size-20 text-primary/30" strokeWidth={1.2} />
                      </div>
                    )}
                    {selectedItem.badge && (
                      <div className="absolute left-4 top-4">
                        <ProductBadge badge={selectedItem.badge} />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-2xl font-bold text-foreground">{name}</h2>
                      <span className="shrink-0 rounded-full bg-secondary px-4 py-1.5 text-base font-semibold text-secondary-foreground shadow">
                        {Number(selectedItem.price).toFixed(2)} Lei
                      </span>
                    </div>
                    {ingredients && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{ingredients}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </>
  );
};

export default Menu;