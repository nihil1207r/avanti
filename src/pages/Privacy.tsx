import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";

export default function Privacy() {
  const { t } = useTranslation();
  return (
    <LegalLayout title={t("legalPages.privacy.title")} path="/confidentialitate">
      <div className="privacy-content">
        <section className="legal-section">
          <h2>{t("legalPages.privacy.s1_title")}</h2>
          <dl className="definition-list">
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_operator_term")}</dt>
              <dd>{t("legalPages.privacy.s1_operator_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_processor_term")}</dt>
              <dd>{t("legalPages.privacy.s1_processor_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_platform_term")}</dt>
              <dd>{t("legalPages.privacy.s1_platform_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_personal_term")}</dt>
              <dd>{t("legalPages.privacy.s1_personal_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_processing_term")}</dt>
              <dd>{t("legalPages.privacy.s1_processing_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_consent_term")}</dt>
              <dd>{t("legalPages.privacy.s1_consent_def")}</dd>
            </div>
            <div className="definition-item">
              <dt>{t("legalPages.privacy.s1_gdpr_term")}</dt>
              <dd>{t("legalPages.privacy.s1_gdpr_def")}</dd>
            </div>
          </dl>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s2_title")}</h2>
          <div className="contact-block">
            <p><strong>AVANTI FOOD DELIVERY SRL</strong></p>
            <p>CUI: 36010706</p>
            <p>Nr. Reg. Com.: J2016000218071</p>
            <p>Uvertura Mall, Calea Națională 91, 710048 Botoșani, România</p>
            <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
            <p>📞 0745 383 256</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s3_title")}</h2>
          <div className="data-group">
            <h3>{t("legalPages.privacy.s3_direct_heading")}</h3>
            <ul>
              {((t("legalPages.privacy.s3_direct_items", { returnObjects: true }) as string[]) || []).map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="data-group">
            <h3>{t("legalPages.privacy.s3_auto_heading")}</h3>
            <ul>
              {((t("legalPages.privacy.s3_auto_items", { returnObjects: true }) as string[]) || []).map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s4_title")}</h2>
          <p>{t("legalPages.privacy.s4_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s5_title")}</h2>
          <ul>
            {((t("legalPages.privacy.s5_items", { returnObjects: true }) as string[]) || []).map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s6_title")}</h2>
          <p>{t("legalPages.privacy.s6_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s7_title")}</h2>
          <p>{t("legalPages.privacy.s7_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s8_title")}</h2>
          <p>{t("legalPages.privacy.s8_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s9_title")}</h2>
          <p>{t("legalPages.privacy.s9_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s10_title")}</h2>
          <ul>
            {((t("legalPages.privacy.s10_items", { returnObjects: true }) as string[]) || []).map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s11_title")}</h2>
          <p>{t("legalPages.privacy.s11_text")}</p>
          <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
          <p>{t("legalPages.privacy.s11_anspdcp")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s12_title")}</h2>
          <p>{t("legalPages.privacy.s12_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s13_title")}</h2>
          <p>{t("legalPages.privacy.s13_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s14_title")}</h2>
          <p>{t("legalPages.privacy.s14_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s15_title")}</h2>
          <p>{t("legalPages.privacy.s15_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.privacy.s16_title")}</h2>
          <div className="contact-block">
            <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
            <p>📞 0745 383 256</p>
          </div>
        </section>

        <div className="legal-footer">
          <p><strong>{t("legalPages.privacy.footer")}</strong></p>
        </div>

      </div>

      <style>{`
        .privacy-content {
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

        .legal-section h3 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0.75rem;
          color: inherit;
        }

        .legal-section p {
          margin: 0.4rem 0;
          line-height: 1.7;
        }

        /* Definition list */
        .definition-list {
          margin: 0;
          padding: 0;
        }

        .definition-item {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0.5rem 1.5rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .definition-item:last-child {
          border-bottom: none;
        }

        .definition-item dt {
          font-weight: 600;
          font-size: 0.875rem;
          padding-top: 0.1rem;
        }

        .definition-item dd {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.6;
          color: inherit;
          opacity: 0.85;
        }

        /* Lists */
        .legal-section ul {
          margin: 0.25rem 0;
          padding-left: 1.5rem;
        }

        .legal-section ul li {
          padding: 0.25rem 0;
          line-height: 1.6;
        }

        /* Data groups */
        .data-group {
          margin-bottom: 0.75rem;
        }

        .data-group:last-child {
          margin-bottom: 0;
        }

        /* Legal refs */
        .legal-ref {
          opacity: 0.65;
          font-size: 0.85em;
          margin-left: 0.25rem;
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

        /* Footer note */
        .legal-footer {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 2px solid rgba(0,0,0,0.1);
          text-align: center;
        }

        .legal-footer p {
          font-size: 0.875rem;
          line-height: 1.6;
        }

        /* Links */
        .privacy-content a {
          color: #b45309;
          text-decoration: none;
        }

        .privacy-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </LegalLayout>
  );
}