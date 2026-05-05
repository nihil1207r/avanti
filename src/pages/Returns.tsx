import { LegalLayout } from "@/components/LegalLayout";

export default function Returns() {
  return (
    <LegalLayout title="Retur & Reclamații" path="/retur">
      <h2>❌ Politica de retur</h2>
      <p>
        Produsele alimentare <strong>NU pot fi returnate</strong> după livrare,
        conform legislației în vigoare privind siguranța alimentară.
      </p>

      <h2>✔ Dacă apare o problemă</h2>
      <p>Te ajutăm imediat dacă:</p>
      <ul>
        <li>produsul primit este greșit față de comandă</li>
        <li>produsul este deteriorat sau prezintă probleme</li>
        <li>comanda nu corespunde cu ce ai comandat</li>
      </ul>

      <h2>📩 Contact rapid</h2>
      <p>
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>

      <h2>⏱ Timp reclamație</h2>
      <p>
        Reclamațiile trebuie transmise în <strong>maxim 24 de ore</strong> de la livrare,
        pentru a putea fi soluționate corespunzător.
      </p>

      <h2>🎯 Scopul nostru</h2>
      <p>
        Ne dorim să pleci mulțumit de fiecare comandă. Satisfacția ta este prioritatea noastră,
        și vom face tot ce ne stă în putință să rezolvăm orice situație neplăcută.
      </p>

      <h2>Litigii</h2>
      <p>Rezolvăm orice problemă amiabil. Dacă este nevoie, poți apela la:</p>
      <ul>
        <li>ANPC: <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">https://anpc.ro</a></li>
        <li>SOL: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a></li>
      </ul>
    </LegalLayout>
  );
}
