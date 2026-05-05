import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";

export default function ContactDetails() {
  const { t } = useTranslation();
  return (
    <LegalLayout title={t("legalPages.contactDetails.title")} path="/contact-detalii">
      <div className="terms-content">
        <section className="legal-section">
          <h2>{t("legalPages.contactDetails.companyHeading")}</h2>
          <div className="contact-block">
            <p>
              <strong>AVANTI FOOD DELIVERY SRL</strong><br />
              CUI: 36010706<br />
              Nr. Reg. Com.: J2016000218071
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.contactDetails.locationHeading")}</h2>
          <p>📍 Uvertura Mall, Calea Națională 91, 710048 Botoșani, România</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.contactDetails.contactHeading")}</h2>
          <div className="contact-block">
            <p>
              📞 <a href="tel:0745383256">0745 383 256</a><br />
              📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a>
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.contactDetails.hoursHeading")}</h2>
          <p>⏱ {t("legalPages.contactDetails.hours")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.contactDetails.responseHeading")}</h2>
          <p>👉 {t("legalPages.contactDetails.responseText")}</p>
        </section>

      </div>

      <style>{`
        .terms-content {
          font-family: inherit;
          color: inherit;
          max-width: 800px;
        }

        .legal-section {
          margin-bottom: 2rem;
        }

        .legal-section h2 {
          font-size: 1rem;
          font-weight: 600;
          color: #b45309;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          margin-top: 0;
        }

        .legal-section p {
          margin: 0.4rem 0;
          line-height: 1.7;
        }

        /* Contact block */
        .contact-block {
          padding: 0.75rem 1rem;
          background: rgba(0,0,0,0.03);
          border-left: 3px solid #b45309;
          border-radius: 0 4px 4px 0;
        }

        .contact-block p {
          margin: 0.3rem 0;
          font-size: 0.9rem;
        }

        /* Links */
        .terms-content a {
          color: #b45309;
          text-decoration: none;
        }

        .terms-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </LegalLayout>
  );
}
