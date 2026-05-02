import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";
const Cookies = () => {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");
  return (
    <LegalLayout title={t("legal.cookies")} path="/cookies">
      {en ? (
        <>
          <h2>What are cookies?</h2><p>Small text files stored on your device to help the site function and remember your preferences.</p>
          <h2>Cookies we use</h2>
          <ul>
            <li><strong>avanti-cookie-consent</strong> — stores your consent choice. Duration: 12 months. Type: necessary.</li>
            <li><strong>i18nextLng</strong> — stores your selected language (RO/EN). Duration: persistent. Type: preference.</li>
            <li><strong>sb-*</strong> — authentication session for admin area. Duration: session. Type: necessary.</li>
          </ul>
          <h2>How to manage cookies</h2><p>You can clear them anytime from your browser settings.</p>
        </>
      ) : (
        <>
          <h2>Ce sunt cookies-urile?</h2><p>Mici fișiere text stocate pe dispozitivul tău pentru a ajuta site-ul să funcționeze și a-ți reține preferințele.</p>
          <h2>Cookies pe care le folosim</h2>
          <ul>
            <li><strong>avanti-cookie-consent</strong> — stochează alegerea ta de consimțământ. Durată: 12 luni. Tip: necesar.</li>
            <li><strong>i18nextLng</strong> — stochează limba selectată (RO/EN). Durată: persistent. Tip: preferință.</li>
            <li><strong>sb-*</strong> — sesiune de autentificare pentru zona admin. Durată: sesiune. Tip: necesar.</li>
          </ul>
          <h2>Cum gestionezi cookies-urile</h2><p>Le poți șterge oricând din setările browserului.</p>
        </>
      )}
    </LegalLayout>
  );
};
export default Cookies;
