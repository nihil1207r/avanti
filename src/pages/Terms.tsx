import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";
const Terms = () => {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");
  return (
    <LegalLayout title={t("legal.terms")} path="/termeni">
      {en ? (
        <>
          <h2>Use of website</h2><p>By accessing avantipizza.ro you agree to these terms. The site is a product catalog only — no online ordering.</p>
          <h2>Intellectual property</h2><p>All content (text, images, logo) belongs to Avanti Pizza and may not be reproduced without permission.</p>
          <h2>Limitation of liability</h2><p>We strive for accuracy but do not warrant that menu, prices or availability are error-free. Final pricing is confirmed in-store.</p>
          <h2>Changes</h2><p>We may update these terms at any time. Continued use means acceptance.</p>
        </>
      ) : (
        <>
          <h2>Utilizarea site-ului</h2><p>Prin accesarea avantipizza.ro accepți acești termeni. Site-ul este doar un catalog de produse — fără comenzi online.</p>
          <h2>Proprietate intelectuală</h2><p>Tot conținutul (text, imagini, logo) aparține Avanti Pizza și nu poate fi reprodus fără permisiune.</p>
          <h2>Limitarea răspunderii</h2><p>Depunem eforturi pentru acuratețe dar nu garantăm că meniul, prețurile sau disponibilitatea sunt fără erori. Prețurile finale se confirmă la fața locului.</p>
          <h2>Modificări</h2><p>Putem actualiza acești termeni oricând. Folosirea continuă reprezintă acceptarea lor.</p>
        </>
      )}
    </LegalLayout>
  );
};
export default Terms;
