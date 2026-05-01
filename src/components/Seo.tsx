import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  description: string;
  path?: string;
  /** Absolute URL to OG image (1200×630 recommended) */
  image?: string;
  jsonLd?: object;
};

const SITE_NAME = "Avanti Pizza Botoșani";
const DEFAULT_OG_IMAGE = "https://avantipizza.ro/og-image.jpg";

export function Seo({ title, description, path = "/", image = DEFAULT_OG_IMAGE, jsonLd }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const locale = lang === "ro" ? "ro_RO" : "en_US";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://avantipizza.ro";
  const url = origin + path;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}