import { LegalLayout } from "@/components/LegalLayout";

export default function Delivery() {
  return (
    <LegalLayout title="Livrare Rapidă" path="/livrare">
      <h2>🚀 Timp de livrare</h2>
      <ul>
        <li>30–60 min în mod normal</li>
        <li>până la 90 min în perioade aglomerate</li>
      </ul>

      <h2>📍 Zone de livrare</h2>
      <p>Botoșani + zone apropiate.</p>
      <p>Pentru detalii despre zona ta specifică, ne poți contacta înainte de plasarea comenzii.</p>

      <h2>💰 Cost livrare</h2>
      <p>Costul livrării este afișat clar înainte de finalizarea comenzii, astfel încât să știi exact ce plătești.</p>

      <h2>✔ Garanția noastră</h2>
      <p>Dacă ceva nu este în regulă cu comanda ta:</p>
      <ul>
        <li>👉 ne contactezi imediat</li>
        <li>👉 rezolvăm rapid și eficient</li>
      </ul>

      <h2>⚠️ Important</h2>
      <ul>
        <li>Adresa de livrare trebuie completată corect și complet</li>
        <li>Numărul de telefon trebuie să fie valid și accesibil</li>
      </ul>
      <p>Aceste date sunt esențiale pentru o livrare fără probleme.</p>

      <h2>💡 Notă</h2>
      <p>
        Întârzierile pot apărea în condiții speciale (trafic intens, vreme nefavorabilă),
        dar te vom ține informat pe tot parcursul procesului.
      </p>

      <h2>Contact</h2>
      <p>
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>
    </LegalLayout>
  );
}
