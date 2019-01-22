> Het opgevraagde artikel met id 1, bestaat niet.

# Haven-Stad Tijdlijn
Dit wordt een inleiding.

## Inhoud
* [Installatie](#installatie)
* [Artikel toevoegen](#artikel-toevoegen)
* [Technische details](#technische-details)

## Installatie
Om de applicatie te installeren voer je de volgende commando's in in je terminal. Hierbij ga ik er van uit dat je [nodejs](https://nodejs.org/en/) en npm al hebt geïnstalleerd.
```
git clone https://github.com/jeroentvb/haven-stad.git
cd haven-stad
npm install
```

### Database
Nu moet de database geïnstalleerd worden. Hierin staat alle content voor de applicatie.
Importeer hiervoor het `.sql` bestand in de map [database](database/) in je SQL database naar keuze.  
  
Hierna moet een `.env` bestand worden aangemaakt met daarin het volgende. Vul de lege velden na de `=` in met je eigen inloggegevens.
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=havenstad
```

### Configuratie
Er zijn 2 instellingen beschikbaar in [app-config.json](app-config.json).
#### port
De port waar de server op luistert. Standaard ingesteld op 3000.
#### allowAdd
Sta toe dat artikelen worden toegevoegd aan de database door te navigeren naar domeinvandeserver.nl/add.

### Klaar
Start de server met `npm start` of `node index.js`.

## Artikel toevoegen
Zorg dat `allowAdd` in [app-config.json](app-config.json) op `true` staat. Navigeer vervolgens naar domeinvandeserver.nl/add.
Vul alle velden in. Klik op verzenden, en hij is toegevoegd aan de database en zichtbaar in de applicatie.

## Technische details
De applicatie bestaat uit een nodejs server met daaraan gekoppeld een SQL database. In de database staan alle artikelen.
De nodejs server wordt gebruikt om artikelen uit de database op te halen en de [article.ejs](templates/article.ejs) template te renderen, die vervolgens naar de gebruiker wordt gestuurd.  
De tijdlijn wordt client-side ingeladen. Hiervoor wordt eerst een request naar de server gestuurd om alle artikeldata te verkrijgen. Aan de hand daarvan worden alle bolletjes op de tijdlijn geladen.
