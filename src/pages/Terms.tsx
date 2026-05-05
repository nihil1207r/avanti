import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";

export default function Terms() {
  const { t } = useTranslation();
  return (
    <LegalLayout title={t("legalPages.terms.title")} path="/termeni">
      <div className="terms-content">
        <section className="legal-section">
          <h2>{t("legalPages.terms.s1_title")}</h2>
          <div className="contact-block">
            <p><strong>AVANTI FOOD DELIVERY SRL</strong></p>
            <p>CUI: 36010706 | J2016000218071</p>
            <p>📍 Uvertura Mall, Botoșani</p>
            <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
            <p>📞 0745 383 256</p>
          </div>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s2_title")}</h2>
          <ul className="step-list">
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s2_step1")}</span>
            </li>
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s2_step2")}</span>
            </li>
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s2_step3")}</span>
            </li>
          </ul>
          <p className="note">{t("legalPages.terms.s2_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s3_title")}</h2>
          <ul className="info-list">
            <li>
              <span className="info-icon">⏱</span>
              <span><strong>{t("legalPages.terms.s3_item1")}</strong></span>
            </li>
            <li>
              <span className="info-icon">⏱</span>
              <span><strong>{t("legalPages.terms.s3_item2")}</strong></span>
            </li>
          </ul>
          <p className="note">{t("legalPages.terms.s3_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s4_title")}</h2>
          <ul className="step-list">
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s4_step1")}</span>
            </li>
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s4_step2")}</span>
            </li>
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.terms.s4_step3")}</span>
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s5_title")}</h2>
          <ul className="status-list">
            <li className="status-ok">
              <span className="status-icon">✔</span>
              <span><strong>{t("legalPages.terms.s5_ok")}</strong></span>
            </li>
            <li className="status-no">
              <span className="status-icon">❌</span>
              <span><strong>{t("legalPages.terms.s5_no")}</strong></span>
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s6_title")}</h2>
          <p>{t("legalPages.terms.s6_text")}</p>
          <p className="highlight-note">{t("legalPages.terms.s6_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s7_title")}</h2>
          <p>{t("legalPages.terms.s7_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s8_title")}</h2>
          <p>{t("legalPages.terms.s8_text")}</p>
          <ul className="link-list">
            <li>
              <strong>ANPC:</strong>{" "}
              <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">https://anpc.ro</a>
            </li>
            <li>
              <strong>SOL:</strong>{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.terms.s9_title")}</h2>
          <p>{t("legalPages.terms.s9_text")}</p>
        </section>

        <div className="legal-footer">
          <p><strong>{t("legalPages.terms.footer")}</strong></p>
        </div>

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

        /* Step list (checkmarks) */
        .step-list,
        .info-list,
        .status-list,
        .link-list {
          list-style: none;
          margin: 0.25rem 0;
          padding: 0;
        }

        .step-list li,
        .info-list li,
        .status-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          line-height: 1.6;
        }

        .step-list li:last-child,
        .info-list li:last-child,
        .status-list li:last-child {
          border-bottom: none;
        }

        .step-icon,
        .info-icon,
        .status-icon {
          flex-shrink: 0;
          width: 1.25rem;
          text-align: center;
          margin-top: 0.1rem;
        }

        /* Status list variants */
        .status-ok {
          color: inherit;
        }

        .status-no {
          opacity: 0.75;
        }

        /* Link list */
        .link-list {
          margin-top: 0.5rem;
        }

        .link-list li {
          padding: 0.3rem 0;
          line-height: 1.6;
        }

        /* Note styling */
        .note {
          margin-top: 0.75rem !important;
          font-size: 0.875rem;
          opacity: 0.75;
          font-style: italic;
        }

        .highlight-note {
          margin-top: 0.5rem !important;
          padding: 0.5rem 0.75rem;
          background: rgba(0,0,0,0.03);
          border-left: 3px solid #b45309;
          border-radius: 0 4px 4px 0;
          font-size: 0.9rem;
        }

        /* Footer */
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