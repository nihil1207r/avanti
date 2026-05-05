import { LegalLayout } from "@/components/LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout title="Politică Cookie" path="/cookies">
      <h2>Ce sunt cookie-urile?</h2>
      <p>
        Cookie-urile sunt fișiere mici stocate pe dispozitivul tău atunci când vizitezi un site web.
        Ele ne ajută să îmbunătățim experiența ta de navigare și să îți oferim servicii relevante.
      </p>

      <h2>Cum folosim cookie-urile</h2>
      <p>Folosim cookie-uri pentru:</p>
      <ul>
        <li>✔ funcționarea site-ului (coș de cumpărături, autentificare)</li>
        <li>✔ îmbunătățirea experienței de navigare</li>
        <li>✔ afișarea de oferte relevante</li>
        <li>✔ analiză trafic și statistici</li>
        <li>✔ marketing și remarketing</li>
      </ul>

      <h2>Tipuri de cookie-uri utilizate</h2>
      <h3>Cookie-uri necesare</h3>
      <p>Esențiale pentru funcționarea site-ului. Nu pot fi dezactivate fără a afecta experiența de utilizare.</p>

      <h3>Cookie-uri de analiză</h3>
      <p>Ne ajută să înțelegem cum interacționezi cu site-ul (ex: Google Analytics).</p>

      <h3>Cookie-uri de marketing</h3>
      <p>Utilizate pentru a îți arăta reclame relevante pe alte platforme (ex: Google Ads, Meta/Facebook).</p>

      <h2>Servicii terțe</h2>
      <p>Folosim servicii precum <strong>Google</strong> și <strong>Meta</strong> pentru analiză și marketing. Aceste servicii pot plasa propriile cookie-uri pe dispozitivul tău.</p>

      <h2>Controlul cookie-urilor</h2>
      <p>Poți accepta sau modifica preferințele oricând prin:</p>
      <ul>
        <li>Banner-ul de cookie-uri afișat la prima vizită</li>
        <li>Setările browserului tău</li>
      </ul>
      <p>Dezactivarea cookie-urilor poate afecta funcționalitatea anumitor secțiuni ale site-ului.</p>

      <h2>Contact</h2>
      <p>
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>
    </LegalLayout>
  );
}
