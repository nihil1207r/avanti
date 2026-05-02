import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ProductBadge } from "./ProductBadge";
import type { MenuItem } from "@/lib/types";
import { Pizza } from "lucide-react";
import { getProductImage, DRINKS_CATEGORY_ID } from "@/lib/categoryImages";

export function ProductCard({ item, index = 0, onClick }: { item: MenuItem; index?: number; onClick?: () => void }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const name = lang === "en" ? item.name_en : item.name_ro;
  const ingredients = lang === "en" ? item.ingredients_en : item.ingredients_ro;

  const src = getProductImage(item, index);
  const isDrink = item.category_id === DRINKS_CATEGORY_ID;

  return (
    <motion.article
      onClick={onClick}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card hover-lift border border-border/50 h-full cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            className={[
              "size-full transition-transform duration-700 group-hover:scale-110",
              isDrink ? "object-contain p-4" : "object-cover",
            ].join(" ")}
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-warm">
            <Pizza className="size-16 text-primary/30" strokeWidth={1.2} />
          </div>
        )}
        {item.badge && (
          <div className="absolute left-3 top-3">
            <ProductBadge badge={item.badge} />
          </div>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-secondary/90 backdrop-blur px-3 py-1.5 text-sm font-semibold text-secondary-foreground shadow-md">
          {Number(item.price).toFixed(2)} Lei
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-semibold text-foreground">{name}</h3>
        {ingredients && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{ingredients}</p>
        )}
      </div>
    </motion.article>
  );
}
