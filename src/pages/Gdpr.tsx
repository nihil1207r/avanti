import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";

const Gdpr = () => {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");
  return (
    <LegalLayout title={t("legal.gdpr")} path="/gdpr">
      {en ? (
        <>
          <h2>Data Controller</h2>
          <p>Avanti Pizza, Botoșani, România. Contact: 0745 383 256.</p>
          <h2>What data we collect</h2>
          <ul><li>Contact form: name, email, message.</li><li>Anonymous website analytics.</li><li>Cookies (see Cookie Policy).</li></ul>
          <h2>Purpose</h2>
          <p>To respond to your inquiries and improve our services. We never sell your data.</p>
          <h2>Your rights</h2>
          <ul><li>Right of access, rectification, erasure</li><li>Right to restrict / object</li><li>Right to data portability</li><li>Right to lodge a complaint with ANSPDCP</li></ul>
          <h2>Contact DPO</h2>
          <p>Email: contact@avantipizza.ro · Phone: 0745 383 256</p>
        </>
      ) : (
        <>
          <h2>Operatorul de date</h2>
          <p>Avanti Pizza, Botoșani, România. Contact: 0745 383 256.</p>
          <h2>Ce date colectăm</h2>
          <ul><li>Formular de contact: nume, email, mesaj.</li><li>Date de analiză anonime ale site-ului.</li><li>Cookies (vezi Politica de Cookies).</li></ul>
          <h2>Scop</h2>
          <p>Pentru a răspunde solicitărilor tale și a îmbunătăți serviciile noastre. Nu vindem niciodată datele tale.</p>
          <h2>Drepturile tale</h2>
          <ul><li>Dreptul de acces, rectificare, ștergere</li><li>Dreptul de restricționare / opoziție</li><li>Dreptul la portabilitatea datelor</li><li>Dreptul de a depune plângere la ANSPDCP</li></ul>
          <h2>Contact DPO</h2>
          <p>Email: contact@avantipizza.ro · Telefon: 0745 383 256</p>
        </>
      )}
    </LegalLayout>
  );
};
export default Gdpr;
