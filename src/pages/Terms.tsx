import { LegalLayout } from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Termeni și Condiții" path="/termeni">
      <h2>1. Cine suntem</h2>
      <p>
        <strong>AVANTI FOOD DELIVERY SRL</strong><br />
        CUI: 36010706 | J2016000218071<br />
        📍 Uvertura Mall, Botoșani<br />
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>

      <h2>2. Cum comanzi</h2>
      <ul>
        <li>✔ alegi produsele</li>
        <li>✔ completezi datele</li>
        <li>✔ confirmi comanda</li>
      </ul>
      <p>După confirmare, comanda intră direct în preparare.</p>

      <h2>3. Livrare rapidă</h2>
      <ul>
        <li>⏱ 30–60 min (mediu)</li>
        <li>⏱ până la 90 min (ore aglomerate)</li>
      </ul>
      <p>Facem tot posibilul să ajungem cât mai repede.</p>

      <h2>4. Plată simplă</h2>
      <ul>
        <li>✔ cash</li>
        <li>✔ card online</li>
        <li>✔ POS (unde este disponibil)</li>
      </ul>

      <h2>5. Anulare</h2>
      <ul>
        <li>✔ înainte de preparare → posibil</li>
        <li>❌ după preparare → nu mai este posibilă</li>
      </ul>

      <h2>6. Retur</h2>
      <p>Produsele alimentare nu pot fi returnate după livrare.</p>
      <p>👉 Dacă există o problemă, o rezolvăm rapid.</p>

      <h2>7. Responsabilitate</h2>
      <p>Verifică datele introduse (adresă / telefon). Greșelile pot afecta livrarea.</p>

      <h2>8. Litigii</h2>
      <p>Rezolvăm orice problemă amiabil.</p>
      <ul>
        <li>ANPC: <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">https://anpc.ro</a></li>
        <li>SOL: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a></li>
      </ul>

      <h2>9. Acceptare</h2>
      <p>Prin comandă, accepți acești termeni.</p>
    </LegalLayout>
  );
}
