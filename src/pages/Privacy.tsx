import { LegalLayout } from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Politică de Confidențialitate" path="/confidentialitate">
      <h2>I. Definiții</h2>
      <p><strong>Operator (Administrator date personale)</strong> – persoana juridică ce stabilează scopurile și mijloacele prelucrării datelor.</p>
      <p><strong>Persoană împuternicită (Procesator)</strong> – entitatea care prelucrează datele în numele Operatorului.</p>
      <p><strong>Platforma online / aplicația mobilă</strong> – aplicațiile prin care clienții pot comanda produse și servicii.</p>
      <p><strong>Date cu caracter personal</strong> – orice informații despre o persoană fizică identificată sau identificabilă (ex: nume, telefon, adresă, IP, etc.).</p>
      <p><strong>Prelucrare</strong> – orice operațiune asupra datelor (colectare, stocare, utilizare, transmitere, ștergere).</p>
      <p><strong>Consimțământ</strong> – acord liber, specific, informat și lipsit de ambiguitate.</p>
      <p><strong>GDPR</strong> – Regulamentul (UE) 2016/679.</p>

      <h2>II. Operatorul de date</h2>
      <p>
        <strong>AVANTI FOOD DELIVERY SRL</strong><br />
        CUI: 36010706<br />
        Nr. Reg. Com.: J2016000218071<br />
        Uvertura Mall, Calea Națională 91, 710048 Botoșani, România<br />
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>

      <h2>III. Ce date colectăm</h2>
      <h3>Date furnizate direct:</h3>
      <ul>
        <li>Nume și prenume</li>
        <li>Număr de telefon</li>
        <li>Adresă de livrare</li>
        <li>Email</li>
        <li>Detalii comandă</li>
      </ul>
      <h3>Date colectate automat:</h3>
      <ul>
        <li>Adresă IP</li>
        <li>Browser și dispozitiv</li>
        <li>Activitate pe site</li>
        <li>Cookie-uri</li>
      </ul>

      <h2>IV. Scopurile prelucrării</h2>
      <p>Datele sunt utilizate pentru: procesarea comenzilor, livrarea produselor, confirmarea comenzilor, emiterea facturilor, suport clienți, marketing (cu consimțământ), îmbunătățirea serviciilor și securitate.</p>

      <h2>V. Temeiul legal</h2>
      <ul>
        <li>Executarea contractului (Art. 6(1)(b) GDPR)</li>
        <li>Obligații legale (Art. 6(1)(c))</li>
        <li>Interesul legitim (Art. 6(1)(f))</li>
        <li>Consimțământ (Art. 6(1)(a))</li>
      </ul>

      <h2>VI. Plăți online</h2>
      <p>Plățile sunt procesate prin furnizori securizați (ex: Netopia, Stripe). <strong>Nu stocăm datele cardului bancar.</strong></p>

      <h2>VII. Marketing</h2>
      <p>Datele pot fi utilizate pentru email marketing, SMS și notificări promoționale — exclusiv cu consimțământ explicit. Consimțământul poate fi retras oricând.</p>

      <h2>VIII. Cookie-uri</h2>
      <p>Site-ul utilizează cookie-uri pentru funcționare, analiză și marketing. Utilizatorul poate controla cookie-urile prin banner sau setările browserului.</p>

      <h2>IX. Destinatarii datelor</h2>
      <p>Datele pot fi transmise către: furnizori IT, procesatori de plăți, servicii de livrare și platforme marketing (Google, Meta).</p>

      <h2>X. Perioada de stocare</h2>
      <ul>
        <li>Comenzi / facturi: 5–10 ani</li>
        <li>Cont client: până la ștergere</li>
        <li>Marketing: până la retragerea consimțământului</li>
        <li>Log-uri: până la 12 luni</li>
      </ul>

      <h2>XI. Drepturile utilizatorului</h2>
      <p>Aveți dreptul la acces, rectificare, ștergere, restricționare, portabilitate, opoziție și retragerea consimțământului.</p>
      <p>📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a></p>
      <p>Aveți dreptul să depuneți plângere la <strong>ANSPDCP</strong>.</p>

      <h2>XII. Securitatea datelor</h2>
      <p>Aplicăm: conexiune securizată (HTTPS), acces restricționat, protecție server și backup periodic.</p>

      <h2>XIII. Transferuri internaționale</h2>
      <p>Transferurile în afara SEE se realizează exclusiv cu garanții legale adecvate (clauze contractuale standard).</p>

      <h2>XIV. Datele minorilor</h2>
      <p>Nu colectăm intenționat date de la persoane sub 16 ani.</p>

      <h2>XV. Modificări</h2>
      <p>Politica poate fi actualizată periodic. Versiunea actuală este disponibilă pe site.</p>

      <h2>XVI. Contact</h2>
      <p>
        📧 <a href="mailto:contact.avantipizza@gmail.com">contact.avantipizza@gmail.com</a><br />
        📞 0745 383 256
      </p>

      <hr />
      <p><strong>Prin utilizarea site-ului și plasarea unei comenzi, confirmați că ați citit și acceptat această Politică de Confidențialitate.</strong></p>
    </LegalLayout>
  );
}
