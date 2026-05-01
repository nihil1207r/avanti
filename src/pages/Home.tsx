import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Sparkles, Truck, ChefHat, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { ProductCard } from "@/components/ProductCard";
import { useFeaturedItems } from "@/lib/queries";
import { PizzaScrollAnimation } from "@/components/PizzaScrollAnimation";
import hero from "@/assets/hero-pizza.jpg";
import about from "@/assets/about-chef.jpg";

const Home = () => {
  const { t } = useTranslation();
  const { data: featured = [] } = useFeaturedItems();

  const why = [
    { key: "fresh", icon: Sparkles },
    { key: "fast", icon: Truck },
    { key: "recipe", icon: ChefHat },
    { key: "local", icon: Heart },
  ];

  const testimonials = [
    { name: "Andreea M.", text: "Cea mai bună pizza din Botoșani! Aluatul e perfect și ingredientele se simt proaspete.", rating: 5 },
    { name: "Vlad P.", text: "Burgerul BBQ e divin, livrare rapidă și caldă. Recomand cu drag!", rating: 5 },
    { name: "Maria I.", text: "Ne-am îndrăgostit de Capriciosa. Mâncare premium la preț corect.", rating: 5 },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Avanti Pizza",
    image: hero,
    address: { "@type": "PostalAddress", addressLocality: "Botoșani", addressCountry: "RO" },
    telephone: "+40745383256",
    servesCuisine: ["Italian", "Pizza", "Burgers"],
    priceRange: "$$",
  };

  return (
    <>
      <Seo title="Avanti Pizza Botoșani — Pizza artizanală, burgeri și preparate premium"
           description="Tradiție italiană în inima Botoșaniului. Pizza artizanală, burgeri suculenți și preparate premium. Comandă acum: 0745 383 256."
           jsonLd={jsonLd} />

      {/* SCROLL ANIMATION HERO */}
      <PizzaScrollAnimation />

      {/* WHY */}
      <section className="py-20 sm:py-28 bg-gradient-warm">
        <div className="container-edge">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{t("why.subtitle")}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{t("why.title")}</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <motion.div key={w.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl bg-card p-7 shadow-card hover-lift border border-border/40 text-center">
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-warm group-hover:scale-110 transition-transform duration-300">
                  <w.icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{t(`why.items.${w.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`why.items.${w.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="container-edge">
            <div className="flex flex-col items-center text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">⭐ {t("featured.title")}</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{t("featured.subtitle")}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 6).map((it, i) => <ProductCard key={it.id} item={it} index={i} />)}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/meniu">{t("hero.cta")} <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-secondary text-secondary-foreground">
        <div className="container-edge">
          <h2 className="text-center font-display text-4xl sm:text-5xl font-bold mb-14">{t("testimonials.title")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.blockquote key={i}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="rounded-2xl bg-secondary-foreground/5 backdrop-blur p-7 border border-secondary-foreground/10">
                <div className="flex gap-0.5 text-accent mb-4">
                  {Array.from({ length: tm.rating }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}
                </div>
                <p className="text-secondary-foreground/90 leading-relaxed">"{tm.text}"</p>
                <footer className="mt-5 font-semibold text-accent">— {tm.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 sm:py-28">
        <div className="container-edge grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={about} alt="Chef Avanti" loading="lazy" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Avanti Pizza</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-tight">{t("about.title")}</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("about.body")}</p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary-glow">
              <Link to="/despre-noi">{t("about.cta")} <ArrowRight className="ml-1" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground py-16">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 40%)" }} />
        <div className="container-edge relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{t("cta.title")}</h2>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href="tel:+40745383256" className="flex items-center gap-3 rounded-2xl bg-secondary text-secondary-foreground px-6 py-4 hover-lift shadow-elegant">
              <div className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><Phone className="size-5" /></div>
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">{t("cta.phone")}</div>
                <div className="font-display text-lg font-semibold">0745 383 256</div>
              </div>
            </a>
            <Link to="/contact" className="flex items-center gap-3 rounded-2xl bg-background text-foreground px-6 py-4 hover-lift shadow-elegant">
              <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><MapPin className="size-5" /></div>
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">{t("cta.visit")}</div>
                <div className="font-display text-lg font-semibold">Botoșani, RO</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
