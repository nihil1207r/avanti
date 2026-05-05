import { useTranslation } from "react-i18next";
import { LegalLayout } from "@/components/LegalLayout";

export default function Delivery() {
  const { t } = useTranslation();
  return (
    <LegalLayout title={t("legalPages.delivery.title")} path="/livrare">
      <div className="terms-content">
        <section className="legal-section">
          <h2>{t("legalPages.delivery.s1_title")}</h2>
          <ul className="info-list">
            <li>
              <span className="info-icon">⏱</span>
              <span><strong>{t("legalPages.delivery.s1_item1")}</strong></span>
            </li>
            <li>
              <span className="info-icon">⏱</span>
              <span><strong>{t("legalPages.delivery.s1_item2")}</strong></span>
            </li>
          </ul>
          <p className="note">{t("legalPages.delivery.s1_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s2_title")}</h2>
          <p>{t("legalPages.delivery.s2_text")}</p>
          <p className="highlight-note">{t("legalPages.delivery.s2_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s3_title")}</h2>
          <p>{t("legalPages.delivery.s3_text")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s4_title")}</h2>
          <p>{t("legalPages.delivery.s4_text")}</p>
          <ul className="step-list">
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.delivery.s4_step1")}</span>
            </li>
            <li>
              <span className="step-icon">✔</span>
              <span>{t("legalPages.delivery.s4_step2")}</span>
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s5_title")}</h2>
          <ul className="status-list">
            <li className="status-ok">
              <span className="status-icon">⚠️</span>
              <span>{t("legalPages.delivery.s5_item1")}</span>
            </li>
            <li className="status-ok">
              <span className="status-icon">⚠️</span>
              <span>{t("legalPages.delivery.s5_item2")}</span>
            </li>
          </ul>
          <p className="note">{t("legalPages.delivery.s5_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s6_title")}</h2>
          <p className="highlight-note">{t("legalPages.delivery.s6_note")}</p>
        </section>

        <section className="legal-section">
          <h2>{t("legalPages.delivery.s7_title")}</h2>
          <div className="contact-block">
            <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
            <p>📞 0745 383 256</p>
          </div>
        </section>

        <div className="legal-footer">
          <p><strong>{t("legalPages.delivery.footer")}</strong></p>
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

        /* Lists */
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

        .status-ok {
          color: inherit;
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