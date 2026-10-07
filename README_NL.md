# Island Clash — School + Supabase

Deze versie gebruikt **Supabase (PostgreSQL)** als centrale online opslag. Supabase is volledig verwijderd.

## Bestanden
- `public/index.html` — hoofdpagina
- `public/style.css` — alle styling, los bestand
- `public/app.js` — Island Clash hoofdcode
- `public/school-module.js` — schoolfuncties
- `public/cloud-sync.js` — centrale synchronisatie met Supabase
- `public/supabase-database.js` — Supabase database-bridge
- `public/supabase-login.js` — losse Supabase Auth login-helper
- `public/supabase-config.js` — jouw Supabase URL + publishable key
- `supabase/schema.sql` — database-tabel + beveiligingsinstellingen
- `` — start een lokale HTTP-server met Python

## Wat wordt centraal opgeslagen?
De bestaande Island Clash-opslag met `ic_*` sleutels wordt per sleutel naar Supabase geschreven. Daardoor worden onder andere accounts, klassen/groepen, 500 eilanden, eilandbouw, quizsets en quizvoortgang, XP, coins, gems, elixir, trophies, cijfers, toetsgegevens, huiswerk, lessen, aanwezigheid, rooster, agenda, berichten, shopgegevens en instellingen tussen apparaten gedeeld.

## Supabase instellen
1. Maak een Supabase-project.
2. Open **SQL Editor**.
3. Plak `supabase/schema.sql` en voer het uit.
4. Open `public/supabase-config.js`.
5. Vul je project-URL en **publishable key** in.
6. Start de map via een webserver, bijvoorbeeld met ``.
7. Open de getoonde URL. Alle apparaten moeten dezelfde online Supabase-configuratie gebruiken.

Supabase gebruikt in de browser een publishable key. Een `service_role`/secret key mag nooit in `index.html` of andere browserbestanden worden gezet.

## Belangrijk over automatische tabellen
Een browserapp hoort niet met een geheime sleutel zelf database-tabellen te maken. Daarom staat het eenmalige schema in `supabase/schema.sql`. Zodra dit één keer in Supabase is uitgevoerd, gebruikt de app daarna automatisch dezelfde tabel.

## Supabase Auth
`supabase-login.js` is een aparte helper voor Supabase Auth met email/password. De bestaande Island Clash-interface gebruikt daarnaast de eigen schoollogin met leerlingcode en docentgebruikersnaam. De Auth-helper is los beschikbaar voor een volgende stap waarin de login volledig door Supabase Auth kan worden beheerd.

## Starten zonder Node/Supabase
Je hebt voor deze versie geen Supabase en geen Node-server nodig. `` gebruikt de ingebouwde Python HTTP-server zodat externe Supabase-verzoeken vanuit de browser normaal kunnen werken.

## Veiligheid
Voor een echte schoolproductieomgeving moet je Row Level Security (RLS) gebruiken en de toegang per gebruiker/rol beperken. Deze versie gebruikt één centrale state-tabel om de bestaande Island Clash-code met weinig wijzigingen naar de cloud te brengen; pas RLS/policies aan voordat je er echte persoonsgegevens in zet.


## Schoolomgeving
De schoolomgeving bevat nu onder meer:
- cijfers en cijfertypes per vak
- vakken beheren
- lessen plannen en een docent toewijzen
- afspraken plannen
- huiswerkitems met types zoals Huiswerk, Inleveropdracht, Lezen, Oefenen en Project
- toetsen plannen met types Toets, Grote Toets, Inleveropdracht, Proefwerk en Praktijktoets
- toetsdatum, tijd, lokaal, docent en weging
- planningsoverzicht met lessen, afspraken, huiswerk en toetsen
- rooster, agenda, aanwezigheid en leerlingweergave

`start_windows.bat` is verwijderd.
