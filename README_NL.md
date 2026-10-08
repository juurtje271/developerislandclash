# Island Clash — School + Supabase (v4)

Deze versie gebruikt **Supabase** als centrale online opslag. MongoDB en Windows-startbestanden zijn niet nodig.

## Bestanden
- `public/index.html` — hoofdinterface
- `public/style.css` — alle styling
- `public/app.js` — Island Clash hoofdcode, accounts, eilanden en docenttools
- `public/school-module.js` — schoolomgeving (vakken, lessen, huiswerk, toetsen, cijfers, aanwezigheid, rooster en agenda)
- `public/cloud-sync.js` — synchronisatie van `ic_*` gegevens naar Supabase
- `public/supabase-config.js` — Supabase URL + publishable key
- `public/supabase-database.js` — Supabase client
- `public/supabase-login.js` — aparte Supabase Auth helper
- `public/screen-share.js` — toestemming-gebaseerd schermdelen via Supabase Realtime + WebRTC
- `supabase/schema.sql` — benodigde centrale opslagtafel en policies

## Extra tools
Het docentpanel bevat nu: schermdelen aanvragen/bekijken, cijfers verwijderen, leerlingvoortgang resetten, quizscores resetten, leerlingaccounts resetten en quizsets per eiland verwijderen.

## Scherm meekijken
Schermdelen is **niet verborgen**: de docent stuurt een verzoek, de leerling moet dit accepteren en de browser vraagt daarna expliciet toestemming om het scherm te delen. De verbinding gebruikt Supabase Realtime voor signalering en WebRTC voor de videostream. Zonder goede netwerkconnectiviteit/STUN/TURN kan een verbinding op sommige netwerken niet tot stand komen.

## Centrale opslag
De bestaande `ic_*` opslag wordt via `cloud-sync.js` centraal opgeslagen in `public.ic_global_state`. Daardoor worden accounts, klassen/groepen, vakken, schoolgegevens, eilanden, quizsets, voortgang, cijfers, opdrachten, instellingen enzovoort tussen apparaten gedeeld zodra alle apparaten dezelfde Supabase-configuratie gebruiken.

## Supabase instellen
1. Maak een Supabase-project.
2. Voer `supabase/schema.sql` één keer uit in SQL Editor.
3. Vul in `public/supabase-config.js` je project-URL en publishable key in.
4. Zet de bestanden op een webserver of hosting die de losse JS- en CSS-bestanden kan serveren.
5. Open Island Clash vanaf diezelfde online locatie op alle apparaten.

Gebruik in browsercode alleen de **publishable/anon key**. Zet nooit een `service_role` of secret key in de frontend.

## Belangrijk
De huidige centrale opslag is bedoeld als schoolproject/prototype. Voor productie met echte leerlinggegevens moeten Supabase Auth, strengere Row Level Security en per-rol/per-gebruiker policies worden ingericht.
