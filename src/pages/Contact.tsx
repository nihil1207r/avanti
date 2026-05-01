import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Seo } from "@/components/Seo";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    setSending(false);

    if (error) {
      toast.error("Mesajul nu a putut fi trimis. Încearcă din nou.");
      console.error(error);
      return;
    }

    setSent(true);
    toast.success(t("contactPage.success"));
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <Seo
        title={`${t("contactPage.title")} — Avanti Pizza`}
        description="Contactează-ne. Telefon, adresă, hartă. Botoșani, România."
        path="/contact"
      />

      <section className="pt-32 pb-12 bg-gradient-warm">
        <div className="container-edge max-w-3xl text-center mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-bold animate-fade-in">
            {t("contactPage.title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-edge grid gap-10 lg:grid-cols-2">

          {/* ── Left: info + map ── */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><MapPin /></div>
              <div>
                <h3 className="font-display text-xl font-semibold">{t("contactPage.addressLabel")}</h3>
                <p className="text-muted-foreground">Botoșani, România</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><Phone /></div>
              <div>
                <h3 className="font-display text-xl font-semibold">{t("contactPage.phoneLabel")}</h3>
                <a href="tel:+40745383256" className="text-muted-foreground hover:text-primary">0745 383 256</a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><Clock /></div>
              <div>
                <h3 className="font-display text-xl font-semibold">{t("contactPage.hoursLabel")}</h3>
                <p className="text-muted-foreground">{t("contactPage.hours")}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card aspect-video mt-6">
              <iframe
                title="Avanti Pizza Botoșani"
                src="https://www.google.com/maps?q=Botosani,Romania&output=embed"
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right: contact form ── */}
          <form
            onSubmit={submit}
            noValidate
            className="rounded-2xl bg-card p-8 shadow-card border border-border/40 space-y-5 h-fit"
          >
            <h2 className="font-display text-2xl font-semibold">{t("contactPage.formTitle")}</h2>

            <div>
              <Label htmlFor="name">{t("contactPage.name")}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5"
                maxLength={100}
                disabled={sending}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">{t("contactPage.email")}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5"
                maxLength={255}
                disabled={sending}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="message">{t("contactPage.message")}</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5"
                maxLength={1000}
                disabled={sending}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={sending || sent}
              size="lg"
              className={
                sent
                  ? "w-full bg-green-600 hover:bg-green-600 cursor-default"
                  : "w-full bg-primary hover:bg-primary/90"
              }
            >
              {sent ? (
                <><CheckCircle2 className="mr-2 size-4" /> Mesaj trimis!</>
              ) : sending ? (
                <>
                  <svg className="mr-2 size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Se trimite…
                </>
              ) : (
                <><Send className="mr-2 size-4" /> {t("contactPage.send")}</>
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;