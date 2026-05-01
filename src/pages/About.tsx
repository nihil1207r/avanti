import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Award, Leaf, Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import about from "@/assets/about-chef.jpg";

const About = () => {
  const { t } = useTranslation();
  const values = [
    { key: "quality", icon: Award },
    { key: "tradition", icon: Leaf },
    { key: "community", icon: Users },
  ];
  return (
    <>
      <Seo title={`${t("aboutPage.title")} — Avanti Pizza`} description={t("aboutPage.lead")} path="/despre-noi" />

      <section className="pt-32 pb-16 bg-gradient-warm">
        <div className="container-edge max-w-3xl text-center mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-bold animate-fade-in">{t("aboutPage.title")}</h1>
          <p className="mt-5 text-lg text-muted-foreground animate-fade-in">{t("aboutPage.lead")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-edge grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img src={about} alt="Chef Avanti" loading="lazy" className="size-full object-cover" />
          </motion.div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{t("aboutPage.story1")}</p>
            <p>{t("aboutPage.story2")}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-warm">
        <div className="container-edge">
          <h2 className="text-center font-display text-4xl font-bold mb-12">{t("aboutPage.valuesTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div key={v.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card p-8 text-center shadow-card hover-lift border border-border/40">
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-xl bg-gradient-gold text-accent-foreground shadow-gold">
                  <v.icon className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold">{t(`aboutPage.values.${v.key}.title`)}</h3>
                <p className="mt-3 text-muted-foreground">{t(`aboutPage.values.${v.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
