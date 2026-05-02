import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";
const Privacy = () => {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");
  return (
    <LegalLayout title={t("legal.privacy")} path="/confidentialitate">
      {en ? (
        <>
          <h2>Introduction</h2><p>This policy explains how avantipizza.ro processes your personal data.</p>
          <h2>Website analytics</h2><p>We use anonymous analytics to understand traffic patterns. No personal identifiers are stored.</p>
          <h2>Contact form data</h2><p>Data submitted via the contact form (name, email, message) is used solely to reply to you and is kept for a maximum of 12 months.</p>
          <h2>Cookie usage</h2><p>See our <a href="/cookies">Cookie Policy</a> for details.</p>
          <h2>Third parties</h2><p>We do not share your data with third parties for marketing purposes.</p>
        </>
      ) : (
        <>
          <h2>Introducere</h2><p>Această politică explică modul în care avantipizza.ro procesează datele tale personale.</p>
          <h2>Analiza site-ului</h2><p>Folosim analiză anonimă pentru a înțelege traficul. Nu stocăm identificatori personali.</p>
          <h2>Datele din formularul de contact</h2><p>Datele trimise prin formularul de contact (nume, email, mesaj) sunt folosite doar pentru a-ți răspunde și sunt păstrate maximum 12 luni.</p>
          <h2>Utilizarea cookies</h2><p>Vezi <a href="/cookies">Politica de Cookies</a> pentru detalii.</p>
          <h2>Terți</h2><p>Nu împărtășim datele tale cu terți în scopuri de marketing.</p>
        </>
      )}
    </LegalLayout>
  );
};
export default Privacy;
