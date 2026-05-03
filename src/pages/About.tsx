import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Award, Leaf, Users } from "lucide-react";
import { useRef } from "react";
import { Seo } from "@/components/Seo";
import about from "@/assets/about-chef.jpg";
import pizzaHero from "@/assets/pizza-hero.png";

const PIZZA_SIZE = 300;

const About = () => {
  const { t } = useTranslation();

  const pageRef = useRef<HTMLDivElement>(null);
  const chefRef = useRef<HTMLDivElement>(null);

  // Raw scroll — NO spring, NO smoothing — 1:1 with the user's scroll position
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Path waypoints tracing the black curved line
  const pts = [0, 0.10, 0.22, 0.36, 0.52, 0.64, 0.74, 0.86, 1.00];

  const xPct = useTransform(scrollYProgress, pts,
    ["83%", "62%", "30%", "14%", "26%", "71%", "77%", "43%", "13%"]);

  const yPct = useTransform(scrollYProgress, pts,
    ["5%", "15%", "29%", "43%", "57%", "65%", "51%", "71%", "87%"]);

  const rotate = useTransform(scrollYProgress, pts,
    [-14, -5, 4, 11, 21, 28, 19, 8, 2]);

  const pizzaScale = useTransform(scrollYProgress, pts,
    [0.85, 0.94, 1.02, 1.10, 1.22, 1.28, 1.12, 0.96, 0.80]);

  const baseOpacity = useTransform(scrollYProgress,
    [0, 0.04, 0.88, 1.00],
    [0, 1, 1, 0]);

  // Chef-overlap fade — lerped per frame for smooth crossfade
  const pizzaOpacity = useMotionValue(0);

  useAnimationFrame(() => {
    if (!pageRef.current || !chefRef.current) return;

    const pageRect = pageRef.current.getBoundingClientRect();
    const chefRect = chefRef.current.getBoundingClientRect();

    const pctX = parseFloat(xPct.get()) / 100;
    const pctY = parseFloat(yPct.get()) / 100;
    const cx = pageRect.left + pageRect.width * pctX;
    const cy = pageRect.top + pageRect.height * pctY;

    const pL = cx - PIZZA_SIZE / 2, pR = cx + PIZZA_SIZE / 2;
    const pT = cy - PIZZA_SIZE / 2, pB = cy + PIZZA_SIZE / 2;

    const mg = 48;
    const overlaps =
      pR > chefRect.left - mg && pL < chefRect.right + mg &&
      pB > chefRect.top - mg && pT < chefRect.bottom + mg;

    let depth = 0;
    if (overlaps) {
      const ow = Math.min(pR, chefRect.right) - Math.max(pL, chefRect.left);
      const oh = Math.min(pB, chefRect.bottom) - Math.max(pT, chefRect.top);
      depth = Math.min(1, (ow * oh) / (PIZZA_SIZE * PIZZA_SIZE * 0.30));
    }

    const target = baseOpacity.get() * (1 - depth);
    pizzaOpacity.set(pizzaOpacity.get() + (target - pizzaOpacity.get()) * 0.10);
  });

  const values = [
    { key: "quality", icon: Award },
    { key: "tradition", icon: Leaf },
    { key: "community", icon: Users },
  ];

  return (
    <>
      <Seo
        title={`${t("aboutPage.title")} — Avanti Pizza`}
        description={t("aboutPage.lead")}
        path="/despre-noi"
      />

      <div ref={pageRef} style={{ position: "relative", overflow: "hidden" }}>

        <motion.img
          aria-hidden
          src={pizzaHero}
          alt=""
          style={{
            position: "absolute",
            top: yPct,
            left: xPct,
            width: PIZZA_SIZE,
            height: PIZZA_SIZE,
            translateX: "-50%",
            translateY: "-50%",
            rotate,
            scale: pizzaScale,
            opacity: pizzaOpacity,
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 20,
            mixBlendMode: "multiply",
            filter: "drop-shadow(0 10px 32px rgba(150,50,5,0.38))",
            willChange: "transform, opacity",
          }}
        />

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 bg-gradient-warm">
          <div className="container-edge max-w-3xl text-center mx-auto">
            <h1 className="font-display text-5xl sm:text-6xl font-bold animate-fade-in">
              {t("aboutPage.title")}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground animate-fade-in">
              {t("aboutPage.lead")}
            </p>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="py-16 bg-gradient-warm">
          <div className="container-edge grid lg:grid-cols-2 lg:items-stretch gap-12">

            <motion.div
              ref={chefRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/5] lg:aspect-auto overflow-hidden rounded-3xl shadow-elegant"
            >
              <img
                src={about}
                alt="Chef Avanti"
                loading="lazy"
                className="size-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center px-2 py-8"
            >
              <div className="space-y-5">
                <span className="block uppercase tracking-[0.22em] text-xs font-mono text-amber-600 mb-1">
                  Our Story
                </span>
                <p className="text-lg leading-relaxed text-stone-700">
                  {t("aboutPage.story1")}
                </p>
                <p className="text-lg leading-relaxed text-stone-700">
                  {t("aboutPage.story2")}
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-16 bg-gradient-warm">
          <div className="container-edge">
            <h2 className="text-center font-display text-4xl font-bold mb-12">
              {t("aboutPage.valuesTitle")}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl bg-card p-8 text-center shadow-card hover-lift border border-border/40"
                >
                  <div className="mx-auto mb-5 grid size-14 place-items-center rounded-xl bg-gradient-gold text-accent-foreground shadow-gold">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    {t(`aboutPage.values.${v.key}.title`)}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {t(`aboutPage.values.${v.key}.desc`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;