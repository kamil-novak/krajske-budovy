# Krajské budovy

*Webová aplikace založená na JavaScriptové technologii ArcGIS Maps SDK for JavaScript a JS frameworku React*

Demo aplikace pro ukázku možnosti programaticky přistupovat k jednotlivým prvkům 3D modelu ve webové scéně. 

**URL parametr `config`:**<br>
Aplikace může být volána s URL parametrem `config`. Toto volání umožňuje spustit aplikaci s konkrétní konfigurací (jednu instanci aplikace lze volat s různými konfiguracemi). Jednotlivé konfigurační soubory (konfigurace) se ukládají do složky `config` ve formátu JSON. Pokud není URL parametr `config` přítomen, volá se defaultní konfigurace `default.json` (tento soubor by měl být ve složce přítomen vždy a lze jej kopírovat a upravovat pro další konfigurace). Pokud přidáme do složky soubor `nondefault.json`, volání této konfigurace bude vypadat takto: 

`https://www.example.com?config=nondefault`
- `config=nondefault` - do URL parametru vstupuje název konfiguračního souboru bez přípony JSON

**URL parametr `find`:**<br>
Aplikace může být volána s URL parametrem `find`. Parametr find umožňuje po spuštění aplikace automaticky vyhledat konkrétní prvek modelu, přiblížit na něj scénu, filtrovat model a označit prvek v panelu. Parametr se skládá ze tří hodnot oddělených čárkou:

`https://www.example.com?find=serviceLayerId,id,queryParamValue`, př. `https://www.example.com/?find=5c80316899484c22ac0490885f824e34,15,123`
- `serviceLayerId` – ID mapové služby, ve které se nachází požadovaný prvek modelu (v konfiguraci `layersForSelection -> serviceLayerId`)
- `id` – ID vrstvy, ve které se nachází požadovaný prvek modelu (v konfiguraci `layersForSelection -> id`)
- `queryParamValue` – číselná nebo textová hodnota atributu požadovaného prvku modelu (atribut nastavený v konfiguraci v `layersForSelection -> queryParamField`)

Hotový odkaz lze získat přímo v aplikaci v panelu Filtr. U každého prvku je tlačítko pro zkopírování odkazu. Zkopírovaná URL zachová všechny aktuální parametry aplikace a doplní parametr find pro vybraný prvek. Čárky mohou být v URL automaticky zapsány také jako %2C; oba zápisy jsou ekvivalentní.


## Environment a nasazení

- Aplikace běží na standardních webových serverech jako je IIS apod. Na webový server se nasazuje pouze adresář `dist`, který obsahuje kompilovanou aplikaci. Tento adresář lze na webovém serveru podle potřeby přejmenovat.
- Adresář `dist` obsahuje soubor `config.json`, pomocí kterého lze aplikaci konfigurovat. Tento soubor je nutné před novou kompilací zálohovat, protože kompilace přepíše tento soubor nastavením z vývojové nekompilované verze (více v kapitole **Nastavení**).
- Kompilace se provádí pomocí buildovacího nástroje Vite příkazem `npm run build`. Dalšími vývojářskými příkazy jsou `npm run dev` a `npm run preview`. Kompilací se zabývá pouze vývojář, administrátor pracuje pouze s kompilovanou verzí, tedy adresářem `dist`.  


## Nastavení
Základní konfigurace kompilované aplikace se provádí v konfiguračních souborech uložených v `./dist/config/`.
Výchozím souborem konfigurace je `./dist/config/default.json`. Tento soubor lze zkopírovat, pojmenovat libovolným názvem a přepsat v něm výchozí parametry dle vlastních potřeb. Více informací o této technice je k dispozici v úvodu v podkapitole **URL parametr config**.

*V případě nové kompilace se převezme konfigurace ze souboru `./config/default.json`, proto je vhodné konfigurační soubor `./dist/config/default.json` zálohovat a po kompilaci aplikaci dle potřeby znovu nastavit. POZOR: V závislosti na úpravách aplikace může kompilace zanést do souboru `./dist/config/default.json` nové parametry nebo některé původní odstranit.*


### Popis nastavení v rámci konfiguračního souboru
Parametry nastavení jsou popsány formou komentářů v příkladu níže.


### Struktura nastavení a příklad nastavení
Na modelovém příkladu nastavení jsou vidět pozice parametrů v kontextu struktury celé JSON konfigurace. Datové typy nastavení výcházejí z hodnot modelového příkladu. Formou komentářů jsou jednotlivé parametry popsány. 
```json
{
  // Název aplikace, který se objeví v horní liště (header)
  "appName": "3D modely krajských budov",
  // URL portalu s webovou scénou, kterou aplikace konzumuje
  "portalUrl": "https://vysocina.maps.arcgis.com",
  // ID scény v rámci výše definovaného portalu
  "sceneItemId": "2347e87cc58647e69766af099564d67a",
  // Nastavení výchozího extentu scény:
  // - "cameraPosition" - pole ve formátu [longitude, latitude, elevation]
  // - "cameraHeading" - úhel kamery ve stupních
  // - "cameraTilt" - náklon kamery ve stupních
  "initialSceneCamera": {
    "cameraPosition": [-670013.182848098, -1130421.1403788568, 552.1726279828418],
    "cameraHeading": 0.5334765553848148,
    "cameraTilt": 81.44238215240865
  },
  // Vrstvy v rámci scény, jejichž obsah bude možné filtrovat
  "layersForSelection": [
    {
      "serviceLayerId": "19b6ea928ed-layer-100",
      "id": 10,
      // Text a atributy, které se zobrazí ve výpisu prvků v panelu
      // Názvy atributů se uvádějí ve složených závorkách
      "displayField": "{longname}, {OID}",
      // Název pole vrstvy použitého v URL parametru find
      "queryParamField": "OID",
      // Název Global ID pole vrstvy
      "globalIdField": "GlobalId",
      // Libovolný název, který se zobrazí ve výpisu prvků v panelu
      "title": "Místnost budovy E Krajského úřadu"
    }
  ] 
}
```

## Poznámky
- Pokud aplikace neběží na stejné doméně jako organizace ArcGIS, je potřeba pro tuto doménu povolit CORS (Organizace -> Nastavení -> Zabezpečení -> Povolit počátky). 
- Pro testovací účely lze kontrolu CORS vypnout na úrovni prohlížeče, v případě Chrome např. přes přidaný a aktivovaný doplněk [Anti-CORS, anti-CSP](https://chromewebstore.google.com/detail/anti-cors-anti-csp/fcbmpcbjjphnaohicmhefjihollidgkp).


## Testování
\-\-\-


