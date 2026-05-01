import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pizza } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProductBadge } from "./ProductBadge";
import type { MenuItem } from "@/lib/types";
import { getProductImage } from "@/lib/categoryImages";

interface DishModalProps {
    item: MenuItem | null;
    onClose: () => void;
}

export function DishModal({ item, onClose }: DishModalProps) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language.startsWith("en") ? "en" : "ro";

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (item) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [item]);

    const name = item ? (lang === "en" ? item.name_en : item.name_ro) : "";
    const ingredients = item ? (lang === "en" ? item.ingredients_en : item.ingredients_ro) : "";
    const src = item ? getProductImage(item) : null;

    return (
        <AnimatePresence>
            {item && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            zIndex: 50,
                            width: "min(92vw, 512px)",
                        }}
                        className="rounded-3xl bg-card shadow-2xl overflow-hidden border border-border/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                            {src ? (
                                <img
                                    src={src}
                                    alt={name}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <div className="flex size-full items-center justify-center bg-gradient-warm">
                                    <Pizza className="size-20 text-primary/30" strokeWidth={1.2} />
                                </div>
                            )}

                            {/* Badge */}
                            {item.badge && (
                                <div className="absolute left-4 top-4">
                                    <ProductBadge badge={item.badge} />
                                </div>
                            )}

                            {/* Price chip */}
                            <div className="absolute right-4 top-4 rounded-full bg-secondary/95 backdrop-blur px-4 py-2 text-base font-bold text-secondary-foreground shadow-lg">
                                {Number(item.price).toFixed(2)} Lei
                            </div>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute left-1/2 -translate-x-1/2 -bottom-5 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border shadow-lg hover:bg-muted transition-colors"
                            >
                                <X className="size-5 text-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 pt-8 pb-7">
                            <h2 className="font-display text-2xl font-bold text-foreground leading-tight">{name}</h2>
                            {ingredients && (
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{ingredients}</p>
                            )}

                            <div className="mt-6 flex items-center gap-3">
                                <a
                                    href="http://comanda.avantipizza.ro" target="_blank" rel="noopener noreferrer"
                                    className="flex-1 rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
                                >
                                    {t("modal.order")}
                                </a>
                                <button
                                    onClick={onClose}
                                    className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                                >
                                    {t("modal.back")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}