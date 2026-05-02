import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Leaf, Users } from "lucide-react";
import { useRef } from "react";
import { Seo } from "@/components/Seo";
import about from "@/assets/about-chef.jpg";
import pizzaHero from "@/assets/pizza-hero.png";

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const valuesRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: valuesRef,
    offset: ["start end", "start start"],
  });

  const pizzaY      = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const pizzaRotate = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const pizzaScale  = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const values = [
    { key: "quality",   icon: Award  },
    { key: "tradition", icon: Leaf   },
    { key: "community", icon: Users  },
  ];

  return (
    <>
      <Seo
        title={`${t("aboutPage.title")} — Avanti Pizza`}
        description={t("aboutPage.lead")}
        path="/despre-noi"
      />

      {/* ── Hero banner ── */}
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

      {/* ── Story section ── */}
      <section ref={sectionRef} className="py-16 bg-gradient-warm">
        <div className="container-edge grid lg:grid-cols-2 lg:items-stretch gap-12">

          {/* Left – chef photo */}
          <motion.div
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

          {/* Right – text only */}
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
      <section ref={valuesRef} className="py-16 bg-gradient-warm relative">

        {/* Pizza image — floats just above the "Our values" heading */}
        <div className="container-edge relative">
          <motion.div
            aria-hidden
            style={{
              y: pizzaY,
              rotate: pizzaRotate,
              scale: pizzaScale,
            }}
            className="absolute -top-40 right-8 w-72 h-72 pointer-events-none will-change-transform z-10"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={pizzaHero}
                alt=""
                className="w-full h-full object-contain scale-110"
                style={{
                  filter: "drop-shadow(0 4px 16px rgba(180,80,20,0.22))",
                  WebkitMaskImage: `
                    linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%),
                    linear-gradient(to right,  transparent 0%, black 22%, black 78%, transparent 100%)
                  `,
                  WebkitMaskComposite: "source-in",
                  maskImage: `
                    linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%),
                    linear-gradient(to right,  transparent 0%, black 22%, black 78%, transparent 100%)
                  `,
                  maskComposite: "intersect",
                }}
              />
            </div>
          </motion.div>
        </div>

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
    </>
  );
};

export default About;