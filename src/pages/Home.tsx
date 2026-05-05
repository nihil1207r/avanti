import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Phone, MapPin, Sparkles, Truck, ChefHat, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { PizzaScrollAnimation } from "@/components/PizzaScrollAnimation";
import hero from "@/assets/hero-pizza.jpg";
import about from "@/assets/about-chef.jpg";
import pizza3d from "@/assets/pizza-3d.png";

function cbp(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): { x: number; y: number } {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0[0] + 3 * mt ** 2 * t * p1[0] + 3 * mt * t ** 2 * p2[0] + t ** 3 * p3[0],
    y: mt ** 3 * p0[1] + 3 * mt ** 2 * t * p1[1] + 3 * mt * t ** 2 * p2[1] + t ** 3 * p3[1],
  };
}

function getPathPoint(t: number): { x: number; y: number } {
  const s = Math.min(Math.max(t, 0), 1);

  if (s <= 0.30) return cbp([0.35, 0.06], [0.55, 0.08], [0.70, 0.12], [0.75, 0.20], s / 0.30);
  if (s <= 0.45) return cbp([0.75, 0.18], [0.60, 0.24], [0.38, 0.26], [0.44, 0.30], (s - 0.30) / 0.15);
  if (s <= 0.60) return cbp([0.44, 0.30], [0.15, 0.36], [0.12, 0.44], [0.32, 0.52], (s - 0.45) / 0.15);
  if (s <= 0.72) return cbp([0.32, 0.52], [0.55, 0.56], [0.72, 0.58], [0.78, 0.62], (s - 0.60) / 0.12);
  if (s <= 0.82) return cbp([0.78, 0.62], [0.82, 0.68], [0.78, 0.72], [0.72, 0.76], (s - 0.72) / 0.10);
  if (s <= 0.91) return cbp([0.72, 0.76], [0.55, 0.78], [0.52, 0.84], [0.68, 0.88], (s - 0.82) / 0.09);
  return cbp([0.68, 0.88], [0.80, 0.92], [0.78, 0.97], [0.72, 1.00], (s - 0.91) / 0.09);
}

const Home = () => {
  const { t } = useTranslation();

  const whySectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const testiSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [wrapperSize, setWrapperSize] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const measure = () => {
      if (
        !wrapperRef.current ||
        !whySectionRef.current ||
        !ctaSectionRef.current ||
        !testiSectionRef.current ||
        !aboutSectionRef.current
      ) return;
      setWrapperSize({
        w: wrapperRef.current.offsetWidth,
        h:
          whySectionRef.current.offsetHeight +
          ctaSectionRef.current.offsetHeight +
          testiSectionRef.current.offsetHeight +
          aboutSectionRef.current.offsetHeight,
      });
    };
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 48%", "end 52"],
  });

  const IMG = 380;
  const rawX = useTransform(scrollYProgress, (p) => getPathPoint(p).x * wrapperSize.w);
  const rawY = useTransform(scrollYProgress, (p) => getPathPoint(p).y * wrapperSize.h);

  const cfg = { stiffness: 700, damping: 18, mass: 0.08 };
  const springX = useSpring(rawX, cfg);
  const springY = useSpring(rawY, cfg);

  const posX = useTransform(springX, (v) => v - IMG / 2);
  const posY = useTransform(springY, (v) => v - IMG / 2);

  const floatVariants = {
    float: {
      y: [-20, 20, -20],
      rotate: [-4, 4, -4],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const why = [
    { key: "fresh", icon: Sparkles },
    { key: "fast", icon: Truck },
    { key: "recipe", icon: ChefHat },
    { key: "local", icon: Heart },
  ];

  const testimonials = [
    { name: "Andreea M.", text: t("testimonials.items.0.text"), rating: 5 },
    { name: "Vlad P.", text: t("testimonials.items.1.text"), rating: 5 },
    { name: "Maria I.", text: t("testimonials.items.2.text"), rating: 5 },
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
      <Seo
        title="Avanti Pizza Botoșani — Pizza artizanală, burgeri și preparate premium"
        description="Tradiție italiană în inima Botoșaniului. Pizza artizanală, burgeri suculenți și preparate premium. Comandă acum: 0745 383 256."
        jsonLd={jsonLd}
      />

      <PizzaScrollAnimation
        primaryButton={
          // "View Menu" — outline, renders first (left)
          <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-white/40 text-white hover:bg-white hover:text-foreground">
            <Link to="/meniu">{t("hero.cta")} <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        }
        secondaryButton={
          // "Order Now" — red, renders second (right)
          <Button asChild size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-warm h-14 px-8 text-base">
            <a href="https://comanda.avantipizza.ro" target="_blank" rel="noopener noreferrer">
              {t("modal.order")} <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
        }
      />

      <div
        ref={wrapperRef}
        style={{ position: "relative", overflowX: "clip" }}
      >
        {/* FLOATING PIZZA */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x: posX,
            y: posY,
            zIndex: 1,
            pointerEvents: "none",
            willChange: "transform",
            filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))",
          }}
        >
          <motion.img
            src={pizza3d}
            alt="Avanti Pizza slice"
            variants={floatVariants}
            animate="float"
            style={{ width: IMG, height: IMG, objectFit: "contain" }}
            className="select-none pointer-events-none"
          />
        </motion.div>

        {/* WHY SECTION */}
        <section ref={whySectionRef} className="py-20 sm:py-28 bg-gradient-warm pt-28 sm:pt-36">
          <div className="container-edge">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
              style={{ position: "relative", zIndex: 2 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                {t("why.subtitle")}
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
                {t("why.title")}
              </h2>
            </motion.div>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-4" style={{ position: "relative", zIndex: 2 }}>
              {why.map((w, i) => (
                <motion.div
                  key={w.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-2xl bg-card p-7 shadow-card hover-lift border border-border/40 text-center"
                  style={{ position: "relative", zIndex: 2 }}
                >
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

        {/* CTA BUTTONS */}
        <section ref={ctaSectionRef} className="py-10 sm:py-14 bg-gradient-warm">
          <div
            className="container-edge flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ position: "relative", zIndex: 2 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground min-w-[180px]">
              <a href="https://comanda.avantipizza.ro" target="_blank" rel="noopener noreferrer">
                {t("modal.order")} <ArrowRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-w-[180px]">
              <Link to="/meniu">{t("hero.cta")} <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section ref={testiSectionRef} className="py-20 sm:py-28 bg-secondary text-secondary-foreground">
          <div className="container-edge" style={{ position: "relative", zIndex: 2 }}>
            <h2 className="text-center font-display text-4xl sm:text-5xl font-bold mb-14">
              {t("testimonials.title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((tm, i) => (
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="rounded-2xl bg-secondary-foreground/5 backdrop-blur p-7 border border-secondary-foreground/10"
                  style={{ position: "relative", zIndex: 2 }}
                >
                  <div className="flex gap-0.5 text-accent mb-4">
                    {Array.from({ length: tm.rating }).map((_, k) => (
                      <Star key={k} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-foreground/90 leading-relaxed">"{tm.text}"</p>
                  <footer className="mt-5 font-semibold text-accent">— {tm.name}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section ref={aboutSectionRef} className="py-20 sm:py-28">
          <div
            className="container-edge grid gap-12 lg:grid-cols-2 lg:items-center"
            style={{ position: "relative", zIndex: 2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant"
            >
              <img src={about} alt="Chef Avanti" loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Avanti Pizza</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-tight">{t("about.title")}</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("about.body")}</p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary-glow">
                <Link to="/despre-noi">{t("about.cta")} <ArrowRight className="ml-1" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </div>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground py-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 40%)" }}
        />
        <div className="container-edge relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{t("cta.title")}</h2>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a
              href="tel:+40745383256"
              className="flex items-center gap-3 rounded-2xl bg-secondary text-secondary-foreground px-6 py-4 hover-lift shadow-elegant"
            >
              <div className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
                <Phone className="size-5" />
              </div>
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">{t("cta.phone")}</div>
                <div className="font-display text-lg font-semibold">0745 383 256</div>
              </div>
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-3 rounded-2xl bg-background text-foreground px-6 py-4 hover-lift shadow-elegant"
            >
              <div className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="size-5" />
              </div>
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">{t("cta.visit")}</div>
                <div className="font-display text-lg font-semibold">Botoșani, RO</div>
              </div>
            </Link>
          </div>
        </div>
      </section >
    </>
  );
};

export default Home;