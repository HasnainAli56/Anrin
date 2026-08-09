/* ===================== Central i18n Module ===================== 
 * Supports 7 languages:
 * - Swedish (sv) — Default
 * - English (en)
 * - Finnish (fi)
 * - Danish (da)
 * - Norwegian (no)
 * - Icelandic (is)
 * - German (de)
 * =============================================================== */

/* Fail-safe Immediate Preloader Dismissal */
(function autoDismissPreloader() {
  function hide() {
    const p = document.getElementById('preloader');
    if (p) {
      p.classList.add('done');
      p.style.opacity = '0';
      p.style.visibility = 'hidden';
      p.style.pointerEvents = 'none';
      p.style.display = 'none';
    }
  }
  if (document.readyState !== 'loading') {
    hide();
  } else {
    document.addEventListener('DOMContentLoaded', hide);
  }
  window.addEventListener('load', hide);
  setTimeout(hide, 200);
  setTimeout(hide, 500);
})();

const LANG_NAMES = {
  sv: "Svenska",
  en: "English",
  fi: "Suomi",
  da: "Dansk",
  no: "Norsk",
  is: "Íslenska",
  de: "Deutsch"
};const I18N = {
  sv: {
    news_hero_title:"Nyheter, certifieringar och produktuppdateringar.", news_hero_sub:"17 artiklar från ANRINs nyhetsarkiv, 2020 till 2025.", news_read_article:"Läs artikeln →", news_subscribe_title:"Vill du få uppdateringar direkt i din inkorg?", news_subscribe_btn:"Prenumerera på nyhetsbrevet", nav_produkter:"Produktområde", nav_projekt:"Projekt", nav_omoss:"Om oss", nav_nedladdningar:"Nedladdningar", nav_kontakt:"Kontakt",
    btn_quote:"Begär offert",
    back_to_overview:"‹ Tillbaka till översikt", grate_prod_desc:"PRODUKTBESKRIVNING", grate_prod_info:"PRODUKTINFORMATION", grate_material:"Material", grate_length:"Längd", grate_nominal_width:"Nominell bredd", grate_clasp:"Låsning", grate_loading_classes:"Belastningsklasser", grate_service_contact:"SERVICE OCH KONTAKT", grate_contact_sales:"Kontakta teknisk försäljning", matching_channel_body:"MATCHANDE RÄNNKROPP", load_class:"Belastningsklass", nav_references:"REFERENSER",
    hero_eyebrow:"ANRIN Nordic — Sedan 2017",
    hero_title_1:"Vi formar vägen", hero_title_2:"för vattnet.",
    hero_sub:"Kompletta system för dagvattenhantering — linjeavvattning, betäckningar, rostfritt stål och avskiljare. Utvecklade med precision, levererade snabbast i Norden.",
    hero_cta1:"Utforska produktområdet", hero_cta2:"Kontakta oss →",
    stat_1_v:"2017", stat_1_l:"Grundat", stat_2_v:"Trelleborg", stat_2_l:"Centrallager", stat_3_v:"24h", stat_3_l:"Svar på offert", stat_4_v:"Norden", stat_4_l:"Leveransområde",
    tag_produkter:"Produktområde", title_produkter:"Ett komplett sortiment för dagvattenhantering.", desc_produkter:"Från polymerbetong och segjärn till rostfritt stål och HDPE — varje produktlinje är vald i samarbete med ledande europeiska tillverkare.",
    p1_t:"Linjeavvattning", p1_d:"Rännor i polymerbetong för parkering, garage, gång- och cykelvägar, flygplatser och tung industri. Belastningsklass A15–F900, bredd 100–300 mm.",
    p2_t:"Hydrotec Betäckningar", p2_d:"Betäckningar i segjärn för vägbanor, gångbanor, torg och garage — i samarbete med tyska HYDROTEC. Brandsäkra och skrammelfria, med PUR-system.",
    p3_t:"Rostfritt & Syrafast Stål", p3_d:"Golvbrunnar, golvrännor och takterrassbrunnar i samarbete med finska Stainless Team OY. Specialprodukter visualiseras och tillverkas efter era specifikationer.",
    p4_t:"ENVIROguard Avskiljare", p4_d:"Olje- och fettavskiljare enligt EN 858:2003, för industri och kommersiella kök. Kompletta HDPE-rörsystem, spirallindade för hållbarhet.",
    read_more:"Läs mer →",
    tag_omoss:"Om oss", title_omoss:"Byggt på snabba svar och tekniskt djup.",
    about_p1:"ANRIN Nordic grundades år 2017 och har idag återförsäljare i alla nordiska länder. Vårt centrallager i Trelleborg levererar med hög effektivitet till hela Norden.",
    about_p2:"Sedan starten har vi noggrant valt ut och etablerat unika avtal med flera tillverkare för att erbjuda den svenska marknaden ett komplett sortiment inom dagvattenhantering.",
    about_p3:"Vår säljorganisation sträcker sig från Malmö i söder till Östersund i norr. All personal har gedigen erfarenhet inom Mark & VA.",
    chart_title:"Nordisk täckning sedan starten", chart_sub:"Andel av nordiska marknaden med aktiv återförsäljning",
    tag_process:"Vår arbetsprocess", title_process:"Från förfrågan till installation.", desc_process:"En stark backoffice och gedigen teknisk kompetens gör processen snabb — utan att kompromissa med precisionen.",
    proc1_t:"Förfrågan", proc1_d:"Ni beskriver projektet — belastningsklass, flöde och miljö. Vårt tekniska team tar vid direkt.",
    proc2_t:"Offert inom 24h", proc2_d:"Med en stark backoffice har vi som mål att alltid leverera offerter inom 24 timmar.",
    proc3_t:"Leverans", proc3_d:"Från vårt centrallager i Trelleborg levererar vi till hela Norden med korta ledtider.",
    proc4_t:"Support", proc4_d:"Teknisk support genom hela projektets livstid — från specifikation till installation.",
    partners_label:"Våra produkter finns med i",
    cta_title:"Har du ett projekt? Vi visualiserar och tillverkar efter era specifikationer.",
    cta_btn:"Starta en dialog",
    tag_kontakt:"Kontakt", title_kontakt:"Prata med vårt tekniska team.", desc_kontakt:"Vi svarar med offert inom 24 timmar.",
    lbl_adress:"Adress", lbl_telefon:"Telefon", lbl_epost:"E-post", lbl_oppet:"Öppettider", val_oppet:"Mån–Fre, 08:00–17:00",
    form_category:"Vad gäller din förfrågan?", form_name:"Namn", form_email:"E-post", form_phone:"Telefon", form_company:"Företag", form_message:"Meddelande", form_submit:"Skicka förfrågan",
    form_note:"Tack — vi återkommer inom 24 timmar till angiven e-postadress.",
    tag_downloads_route:"HEM / NEDLADDNINGAR", dl_hero_title:"Ritningar, produktblad och certifikat.", dl_hero_sub:"Samma struktur som i vårt tidigare nedladdningsarkiv — sök på filnamn eller filtrera på produktområde, dokumenttyp och språk.",
    footer_desc:"Leading Water — kompletta lösningar för dagvattenhantering, levererade snabbast i Norden sedan 2017.",
    footer_produkter:"Produktområde", footer_foretag:"Företaget", footer_kontakt:"Kontakt",
    footer_rights:"© 2026 ANRIN Nordic — Alla rättigheter reserverade.",
    cat_linjeavvattning:"Linjeavvattning", cat_betackningar:"Punktavvattning / Betäckningar", cat_rostfritt:"Rostfritt", cat_avskiljare:"Avskiljare", cat_ror:"Rör & Vattentankar", cat_ovrigt:"Övrigt",
    legal_privacy:"Integritetspolicy", legal_cookies:"Cookies", legal_terms:"Allmänna villkor", legal_copyright:"Upphovsrätt",
    privacy_title:"Integritetspolicy", privacy_content:"<h3>Integritetspolicy</h3><p>ANRIN Nordic AB (\"vi\", \"oss\" eller \"vårt\") tar din integritet på allvar. Denna policy beskriver hur vi samlar in, använder och skyddar dina personuppgifter när du besöker vår webbplats.</p><h4>1. Vilka uppgifter vi samlar in</h4><p>Vi kan samla in följande typer av personuppgifter:</p><ul><li>Kontaktuppgifter (namn, e-post, telefonnummer, företag)</li><li>Teknisk information (IP-adress, webbläsartyp, operativsystem)</li><li>Användningsdata (sidor besökta, tid spenderad, klick)</li></ul><h4>2. Hur vi använder dina uppgifter</h4><p>Vi använder dina uppgifter för att:</p><ul><li>Svara på dina förfrågningar och erbjuda support</li><li>Skicka offerter och produktinformation</li><li>Förbättra vår webbplats och tjänster</li><li>Uppfylla lagliga skyldigheter</li></ul><h4>3. Delning av uppgifter</h4><p>Vi säljer inte dina personuppgifter. Vi kan dela dem med:</p><ul><li>Återförsäljare och partners för att hantera din förfrågan</li><li>Tjänsteleverantörer som drifttar vår webbplats (t.ex. hosting, analys)</li><li>Myndigheter vid lagliga krav</li></ul><h4>4. Dina rättigheter</h4><p>Du har rätt att:</p><ul><li>Begära åtkomst till dina uppgifter</li><li>Begära rättning eller radering</li><li>Invända mot behandling</li><li>Begära dataportabilitet</li><li>Återkalla samtycke när som helst</li></ul><h4>5. Cookies</h4><p>Vår webbplats använder cookies för att förbättra användarupplevelsen. Se vår <button class=\"legal-link\" data-legal=\"cookies\">Cookie-policy</button> för mer information.</p><h4>6. Kontakt</h4><p>Vid frågor om denna policy, kontakta: <a href=\"mailto:info@anrin.se\">info@anrin.se</a></p><p><em>Senast uppdaterad: 2026</em></p>",
    cookies_title:"Cookie-policy", cookies_content:"<h3>Cookie-policy</h3><p>Denna policy förklarar hur ANRIN Nordic AB använder cookies och liknande spårningstekniker på vår webbplats.</p><h4>Vad är cookies?</h4><p>Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. De hjälper webbplatsen att fungera korrekt och ger information till webbplatsens ägare.</p><h4>Typer av cookies vi använder</h4><ul><li><strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera (t.ex. sessionshantering, säkerhet). Dessa kan inte stängas av.</li><li><strong>Funktionalitetscookies:</strong> Möjliggör förbättrad funktionalitet och personanpassning (t.ex. språkinställningar).</li><li><strong>Analytiska cookies:</strong> Hjälper oss att förstå hur besökare interagerar med webbplatsen (t.ex. Google Analytics).</li><li><strong>Marknadsföringscookies:</strong> Används för att visa relevanta annonser.</li></ul><h4>Hantera cookies</h4><p>Du kan hantera dina cookie-inställningar via din webbläsare. Observera att om du blockerar nödvändiga cookies kan vissa delar av webbplatsen inte fungera korrekt.</p><h4>Tredjepartscookies</h4><p>Vi kan använda tredjepartstjänster som sätter cookies (t.ex. Google Analytics, YouTube för inbäddade videor). Dessa har sina egna cookie-policys.</p><h4>Kontakt</h4><p>Vid frågor om cookies, kontakta: <a href=\"mailto:info@anrin.se\">info@anrin.se</a></p><p><em>Senast uppdaterad: 2026</em></p>",
    terms_title:"Allmänna villkor", terms_content:"<h3>Allmänna villkor</h3><p>Dessa allmänna villkor (\"Villkoren\") reglerar din användning av ANRIN Nordic AB:s webbplats och tjänster. Genom att använda webbplatsen godkänner du dessa villkor.</p><h4>1. Användning av webbplatsen</h4><p>Du får använda webbplatsen för lagliga ändamål och i enlighet med dessa villkor. Du får inte:</p><ul><li>Använda webbplatsen på ett sätt som skadar oss eller tredje man</li><li>Försöka få obehörig tillgång till system eller data</li><li>Sprida skadlig kod eller virus</li></ul><h4>2. Immaterialrätt</h4><p>Allt innehåll på webbplatsen (texter, bilder, logotyper, mönster, ritningar, specifikationer) är skyddat av upphovsrätt och tillhör ANRIN Nordic AB eller våra licensgivare. Du får inte kopiera, reproducera, distribuera eller skapa avledda verk utan skriftligt tillstånd.</p><h4>3. Produktinformation</h4><p>Produktinformation, specifikationer och priser på webbplatsen är endast för allmän information och utgör inte ett bindande erbjudande. Vi förbehåller rätten att ändra information utan förvarning. Tekniska specifikationer kan avvika.</p><h4>4. Offerter och avtal</h4><p>Offerter från ANRIN Nordic AB gäller i 30 dagar om annat inte anges. Ett avtal träder först i kraft när vi skriftligen bekräftar din beställning.</p><h4>5. Ansvar och garanti</h4><p>Vi ansvarar inte för indirekta skador, förlorad vinst eller följdskador. Vårt totala ansvar begränsas till det belopp du betalat för den specifika produkten/tjänsten. Produkter levereras med standardgaranti enligt svensk lag.</p><h4>6. Integritet</h4><p>Din användning av webbplatsen regleras även av vår <button class=\"legal-link\" data-legal=\"privacy\">Integritetspolicy</button>.</p><h4>7. Gällande lag och tvistlösning</h4><p>Dessa villkor regleras av svensk lag. Tvist skall avgöras av svensk domstol.</p><h4>8. Ändringar av villkoren</h4><p>Vi kan uppdatera dessa villkor när som helst. Ändringar träder i kraft vid publicering på webbplatsen.</p><h4>Kontakt</h4><p>Vid frågor om dessa villkor, kontakta: <a href=\"mailto:info@anrin.se\">info@anrin.se</a></p><p><em>Senast uppdaterad: 2026</em></p>",
    copyright_title:"Upphovsrätt", copyright_content:"<h3>Upphovsrätt</h3><p>Alla rättigheter förbehållna. Innehållet på denna webbplats, inklusive men inte begränsat till texter, bilder, grafik, logotyper, ikoner, videor, ritningar, tekniska specifikationer, produktkataloger och programvara, är skyddat av upphovsrättslagar och andra immaterialrättsliga bestämmelser.</p><h4>Ägare</h4><p>Upphovsrätten till innehållet på webbplatsen tillhör ANRIN Nordic AB eller våra licensgivare (t.ex. HYDROTEC, Stainless Team OY).</p><h4>Tillåten användning</h4><p>Du får:</p><ul><li>Visa och bläddra innehållet för personligt, icke-kommersiellt bruk</li><li>Ladda ner produktkataloger och tekniska datablad för eget bruk</li><li>Dela länkar till webbplatsen</li></ul><h4>Förbjuden användning</h4><p>Utan skriftligt tillstånd från ANRIN Nordic AB får du INTE:</p><ul><li>Kopiera, reproducera eller distribuera innehåll kommersiellt</li><li>Modifiera, anpassa eller skapa avledda verk</li><li>Ta bort upphovsrättsmeddelanden eller vattenstämplar</li><li>Använda logotyper, varumärken eller designelement i egen marknadsföring</li></ul><h4>Varumärken</h4><p>ANRIN, HYDROTEC, Stainless Team, ENVIROguard och relaterade logotyper är registrerade varumärken. Deras användning kräver skriftligt tillstånd.</p><h4>Anmäl intrång</h4><p>Om du anser att ditt upphovsrättsskyddade material används utan tillstånd, kontakta: <a href=\"mailto:info@anrin.se\">info@anrin.se</a></p><p><em>© 2026 ANRIN Nordic AB — Alla rättigheter reserverade.</em></p>"
  },
  en: {
    news_hero_title:"News, certifications and product updates.", news_hero_sub:"17 articles from the ANRIN news archive, 2020 to 2025.", news_read_article:"Read article →", news_subscribe_title:"Would you like updates delivered directly to your inbox?", news_subscribe_btn:"Subscribe to newsletter", nav_produkter:"Products", nav_projekt:"Projects", nav_omoss:"About us", nav_nedladdningar:"Downloads", nav_kontakt:"Contact",
    btn_quote:"Request a quote",
    tag_downloads_route:"HOME / DOWNLOADS", dl_hero_title:"Drawings, product sheets and certificates.", dl_hero_sub:"Same structure as our previous download library — search by filename or filter by product area, document type and language.",
    back_to_overview:"‹ Back to overview", grate_prod_desc:"PRODUCT DESCRIPTION", grate_prod_info:"PRODUCT INFORMATION", grate_material:"Material", grate_length:"Length", grate_nominal_width:"Nominal width", grate_clasp:"Locking", grate_loading_classes:"Load classes", grate_service_contact:"SERVICE AND CONTACT", grate_contact_sales:"Contact Technical Sales", matching_channel_body:"MATCHING CHANNEL BODY", load_class:"Load class", nav_references:"REFERENCES",
    hero_eyebrow:"ANRIN Nordic — Since 2017",
    hero_title_1:"We shape the path", hero_title_2:"for water.",
    hero_sub:"Complete systems for surface water management — linear drainage, covers, stainless steel and separators. Engineered with precision, delivered faster than anyone else in the Nordics.",
    hero_cta1:"Explore our products", hero_cta2:"Contact us →",
    stat_1_v:"2017", stat_1_l:"Founded", stat_2_v:"Trelleborg", stat_2_l:"Central warehouse", stat_3_v:"24h", stat_3_l:"Quote turnaround", stat_4_v:"Nordics", stat_4_l:"Delivery area",
    tag_produkter:"Products", title_produkter:"A complete range for surface water management.", desc_produkter:"From polymer concrete and cast iron to stainless steel and HDPE — every product line is chosen together with leading European manufacturers.",
    p1_t:"Linear Drainage", p1_d:"Polymer-concrete channels for parking, garages, footpaths, cycle paths, airports and heavy industry. Load class A15–F900, width 100–300 mm.",
    p2_t:"Hydrotec Covers", p2_d:"Cast-iron covers for roads, footpaths, squares and garages — made with German partner HYDROTEC. Fire-safe and rattle-free, with PUR insert system.",
    p3_t:"Stainless & Acid-Resistant Steel", p3_d:"Floor drains, floor channels and roof-terrace drains with Finnish partner Stainless Team OY. Custom products visualised and manufactured to your spec.",
    p4_t:"ENVIROguard Separators", p4_d:"Oil and grease separators to EN 858:2003, for industry and commercial kitchens. Complete spiral-wound HDPE pipe systems built for durability.",
    read_more:"Learn more →",
    tag_omoss:"About us", title_omoss:"Built on fast answers and deep technical know-how.",
    about_p1:"ANRIN Nordic was founded in 2017 and today has distributors across every Nordic country. Our central warehouse in Trelleborg delivers efficiently across the whole region.",
    about_p2:"Since day one we have carefully selected manufacturers and secured unique agreements to offer the Swedish market a complete surface-water range.",
    about_p3:"Our sales organisation spans from Malmö in the south to Östersund in the north, all with deep experience in civil and water engineering.",
    chart_title:"Nordic coverage since launch", chart_sub:"Share of the Nordic market with active resale partners",
    tag_process:"Our process", title_process:"From enquiry to installation.", desc_process:"A strong back office and deep technical expertise keep the process fast — without compromising precision.",
    proc1_t:"Enquiry", proc1_d:"You describe the project — load class, flow and environment. Our technical team steps in immediately.",
    proc2_t:"Quote within 24h", proc2_d:"With a strong back office, our goal is to always deliver quotes within 24 hours.",
    proc3_t:"Delivery", proc3_d:"From our central warehouse in Trelleborg we deliver across the Nordics with short lead times.",
    proc4_t:"Support", proc4_d:"Technical support throughout the project's lifetime — from specification to installation.",
    partners_label:"Our products are listed in",
    cta_title:"Got a project? We visualise and manufacture to your exact specification.",
    cta_btn:"Start a conversation",
    tag_kontakt:"Contact", title_kontakt:"Talk to our technical team.", desc_kontakt:"We respond with a quote within 24 hours.",
    lbl_adress:"Address", lbl_telefon:"Phone", lbl_epost:"Email", lbl_oppet:"Opening hours", val_oppet:"Mon–Fri, 08:00–17:00",
    form_category:"What's your enquiry about?", form_name:"Name", form_email:"Email", form_phone:"Phone", form_company:"Company", form_message:"Message", form_submit:"Send enquiry",
    form_note:"Thank you — we'll reply within 24 hours to the email address you provided.",
    footer_desc:"Leading Water — complete surface-water solutions, delivered faster than anywhere else in the Nordics since 2017.",
    footer_produkter:"Products", footer_foretag:"Company", footer_kontakt:"Contact",
    footer_rights:"© 2026 ANRIN Nordic — All rights reserved.",
    cat_linjeavvattning:"Linear drainage", cat_betackningar:"Point drainage / Covers", cat_rostfritt:"Stainless steel", cat_avskiljare:"Separators", cat_ror:"Pipes & Water tanks", cat_ovrigt:"Other",
    legal_privacy:"Privacy Policy", legal_cookies:"Cookies", legal_terms:"Terms & Conditions", legal_copyright:"Copyright"
  },
  fi: {
    nav_produkter:"Tuotteet", nav_projekt:"Projektit", nav_omoss:"Meistä", nav_nedladdningar:"Ladattavat", nav_kontakt:"Yhteystiedot",
    btn_quote:"Pyydä tarjous",
    crumb_downloads:"KOTI / LATAUKSET", dl_hero_title:"Piirustukset, tuotekortit ja sertifikaatit.", dl_hero_sub:"Sama rakenne kuin aiemmassa latauskirjastossamme — hae tiedostonimellä tai suodata tuotealueen, dokumenttityypin ja kielen mukaan.",
    back_to_overview:"‹ Takaisin yleiskatsaukseen", grate_prod_desc:"TUOTEKUVAUS", grate_prod_info:"TUOTETIEDOT", grate_material:"Materiaali", grate_length:"Pituus", grate_nominal_width:"Nimellisleveys", grate_clasp:"Lukitus", grate_loading_classes:"Kuormitusluokat", grate_service_contact:"PALVELU JA YHTEYSTIEDOT", grate_contact_sales:"Ota yhteyttä tekniseen myyntiin", matching_channel_body:"YHTEENSOPIVA KOURURUNKO", load_class:"Kuormitusluokka", nav_references:"VIITTEET",
    hero_eyebrow:"ANRIN Nordic — Vuodesta 2017",
    hero_title_1:"Muovaamme reitin", hero_title_2:"vedelle.",
    hero_sub:"Kattavat hulevesijärjestelmät — linjakourut, kansistot, ruostumaton teräs ja erottimet. Suunniteltu tarkasti, toimitettu nopeimmin Pohjoismaissa.",
    hero_cta1:"Tutustu tuotteisiin", hero_cta2:"Ota yhteyttä →",
    stat_1_v:"2017", stat_1_l:"Perustettu", stat_2_v:"Trelleborg", stat_2_l:"Keskusvarasto", stat_3_v:"24h", stat_3_l:"Tarjousaika", stat_4_v:"Pohjoismaat", stat_4_l:"Toimitusalue",
    tag_produkter:"Tuotteet", title_produkter:"Kattava valikoima hulevesien hallintaan.", desc_produkter:"Polymeeribetonista ja valuraudasta ruostumattomaan teräkseen ja HDPE:hen — jokainen tuotelinja valitaan yhdessä johtavien eurooppalaisten valmistajien kanssa.",
    p1_t:"Linjakuivatus", p1_d:"Polymeeribetonikourut pysäköintialueille, autotalleihin, käveIy- ja pyöräteille, lentokentille ja raskaaseen teollisuuteen. Kuormitusluokka A15–F900, leveys 100–300 mm.",
    p2_t:"Hydrotec-kansistot", p2_d:"Valurautakansistot teille, jalkakäytäville, toreille ja autotalleihin — yhteistyössä saksalaisen HYDROTECin kanssa. Paloturvalliset ja kolisemattomat PUR-järjestelmällä.",
    p3_t:"Ruostumaton ja haponkestävä teräs", p3_d:"Lattiakaivot, lattiakourut ja kattoterassikaivot yhteistyössä suomalaisen Stainless Team OY:n kanssa. Erikoistuotteet visualisoidaan ja valmistetaan tilausten mukaan.",
    p4_t:"ENVIROguard-erottimet", p4_d:"Öljyn- ja rasvanerottimet standardin EN 858:2003 mukaisesti teollisuuteen ja ammattikeittiöihin. Täydelliset spiraalikierretyt HDPE-putkijärjestelmät.",
    read_more:"Lue lisää →",
    tag_omoss:"Meistä", title_omoss:"Rakennettu nopeiden vastausten ja teknisen osaamisen varaan.",
    about_p1:"ANRIN Nordic perustettiin vuonna 2017, ja sillä on nykyään jälleenmyyjiä kaikissa Pohjoismaissa. Keskusvarastomme Trelleborgissa toimittaa tehokkaasti koko alueelle.",
    about_p2:"Perustamisesta lähtien olemme huolellisesti valinneet valmistajia ja solmineet ainutlaatuisia sopimuksia tarjotaksemme Ruotsin markkinoille kattavan hulevesivalikoiman.",
    about_p3:"Myyntiorganisaatiomme ulottuu Malmöstä etelässä Östersundiin pohjoisessa, ja henkilöstöllämme on vankka kokemus maa- ja vesirakentamisesta.",
    chart_title:"Pohjoismainen kattavuus lanseerauksesta lähtien", chart_sub:"Pohjoismaiden markkinaosuus aktiivisten jälleenmyyjien kanssa",
    tag_process:"Työprosessimme", title_process:"Tiedustelusta asennukseen.", desc_process:"Vahva taustatuki ja syvällinen tekninen osaaminen pitävät prosessin nopeana — tarkkuudesta tinkimättä.",
    proc1_t:"Tiedustelu", proc1_d:"Kuvailette projektin — kuormitusluokan, virtaaman ja ympäristön. Tekninen tiimimme reagoi välittömästi.",
    proc2_t:"Tarjous 24 tunnissa", proc2_d:"Vahvan taustatuen ansiosta tavoitteemme on toimittaa tarjoukset aina 24 tunnin sisällä.",
    proc3_t:"Toimitus", proc3_d:"Keskusvarastostamme Trelleborgissa toimitamme koko Pohjoismaihin lyhyillä toimitusajoilla.",
    proc4_t:"Tuki", proc4_d:"Teknistä tukea koko projektin elinkaaren ajan — määrittelystä asennukseen.",
    partners_label:"Tuotteemme löytyvät myös",
    cta_title:"Onko sinulla projekti? Visualisoimme ja valmistamme tuotteet tarpeidenne mukaan.",
    cta_btn:"Aloita keskustelu",
    tag_kontakt:"Yhteystiedot", title_kontakt:"Keskustele teknisen tiimimme kanssa.", desc_kontakt:"Vastaamme tarjouksella 24 tunnin sisällä.",
    lbl_adress:"Osoite", lbl_telefon:"Puhelin", lbl_epost:"Sähköposti", lbl_oppet:"Aukioloajat", val_oppet:"Ma–Pe, 08:00–17:00",
    form_category:"Mitä tiedustelunne koskee?", form_name:"Nimi", form_email:"Sähköposti", form_phone:"Puhelin", form_company:"Yritys", form_message:"Viesti", form_submit:"Lähetä tiedustelu",
    form_note:"Kiitos — vastaamme 24 tunnin sisällä antamaanne sähköpostiosoitteeseen.",
    footer_desc:"Leading Water — kattavat hulevesiratkaisut, toimitettu nopeimmin Pohjoismaissa vuodesta 2017.",
    footer_produkter:"Tuotteet", footer_foretag:"Yritys", footer_kontakt:"Yhteystiedot",
    footer_rights:"© 2026 ANRIN Nordic — Kaikki oikeudet pidätetään.",
    cat_linjeavvattning:"Linjakuivatus", cat_betackningar:"Pistekuivatus / Kansistot", cat_rostfritt:"Ruostumaton teräs", cat_avskiljare:"Erottimet", cat_ror:"Putket & Vesisäiliöt", cat_ovrigt:"Muut",
    legal_privacy:"Tietosuojakäytäntö", legal_cookies:"Evästeet", legal_terms:"Yleiset ehdot", legal_copyright:"Tekijänoikeus"
  },
  da: {
    nav_produkter:"Produkter", nav_projekt:"Projekter", nav_omoss:"Om os", nav_nedladdningar:"Downloads", nav_kontakt:"Kontakt",
    btn_quote:"Anmod om tilbud",
    crumb_downloads:"HJEM / DOWNLOADS", dl_hero_title:"Tegninger, produktark og certifikater.", dl_hero_sub:"Samme struktur som vores tidligere downloadbibliotek — søg på filnavn eller filtrer efter produktområde, dokumenttype og sprog.",
    back_to_overview:"‹ Tilbage til oversigt", grate_prod_desc:"PRODUKTBESKRIVELSE", grate_prod_info:"PRODUKTINFORMATION", grate_material:"Materiale", grate_length:"Længde", grate_nominal_width:"Nominel bredde", grate_clasp:"Lås", grate_loading_classes:"Belastningsklasser", grate_service_contact:"SERVICE OG KONTAKT", grate_contact_sales:"Kontakt teknisk salg", matching_channel_body:"MATCHENDE RENDENKROP", load_class:"Belastningsklasse", nav_references:"REFERENCER",
    hero_eyebrow:"ANRIN Nordic — Siden 2017",
    hero_title_1:"Vi former vejen", hero_title_2:"for vandet.",
    hero_sub:"Komplette systemer til regnvandshåndtering — linjeafvanding, dæksler, rustfrit stål og udskillere. Udviklet med præcision, leveret hurtigst i Norden.",
    hero_cta1:"Udforsk vores produkter", hero_cta2:"Kontakt os →",
    stat_1_v:"2017", stat_1_l:"Grundlagt", stat_2_v:"Trelleborg", stat_2_l:"Centrallager", stat_3_v:"24t", stat_3_l:"Tilbudstid", stat_4_v:"Norden", stat_4_l:"Leveringsområde",
    tag_produkter:"Produkter", title_produkter:"Et komplet sortiment til regnvandshåndtering.", desc_produkter:"Fra polymerbeton og støbejern til rustfrit stål og HDPE — hver produktlinje er udvalgt sammen med førende europæiske producenter.",
    p1_t:"Linjeafvanding", p1_d:"Render i polymerbeton til parkering, garager, gang- og cykelstier, lufthavne og tung industri. Belastningsklasse A15–F900, bredde 100–300 mm.",
    p2_t:"Hydrotec-dæksler", p2_d:"Dæksler i støbejern til veje, fortove, pladser og garager — i samarbejde med den tyske partner HYDROTEC. Brandsikre og raslefrie med PUR-system.",
    p3_t:"Rustfrit & Syrefast Stål", p3_d:"Gulvafløb, gulvrender og tagterrasseafløb i samarbejde med den finske partner Stainless Team OY. Specialprodukter visualiseres og fremstilles efter jeres specifikationer.",
    p4_t:"ENVIROguard-udskillere", p4_d:"Olie- og fedtudskillere iht. EN 858:2003, til industri og erhvervskøkkener. Komplette spiralviklede HDPE-rørsystemer.",
    read_more:"Læs mere →",
    tag_omoss:"Om os", title_omoss:"Bygget på hurtige svar og dyb teknisk viden.",
    about_p1:"ANRIN Nordic blev grundlagt i 2017 og har i dag forhandlere i alle nordiske lande. Vores centrallager i Trelleborg leverer effektivt til hele regionen.",
    about_p2:"Siden starten har vi omhyggeligt udvalgt producenter og indgået unikke aftaler for at tilbyde det svenske marked et komplet sortiment inden for regnvandshåndtering.",
    about_p3:"Vores salgsorganisation strækker sig fra Malmø i syd til Östersund i nord, alle med solid erfaring inden for anlægs- og vandteknik.",
    chart_title:"Nordisk dækning siden lancering", chart_sub:"Andel af det nordiske marked med aktive forhandlere",
    tag_process:"Vores proces", title_process:"Fra forespørgsel til installation.", desc_process:"Et stærkt backoffice og dyb teknisk ekspertise holder processen hurtig — uden at gå på kompromis med præcisionen.",
    proc1_t:"Forespørgsel", proc1_d:"I beskriver projektet — belastningsklasse, flow og miljø. Vores tekniske team går straks i gang.",
    proc2_t:"Tilbud inden for 24 timer", proc2_d:"Med et stærkt backoffice er vores mål altid at levere tilbud inden for 24 timer.",
    proc3_t:"Levering", proc3_d:"Fra vores centrallager i Trelleborg leverer vi til hele Norden med korte leveringstider.",
    proc4_t:"Support", proc4_d:"Teknisk support gennem hele projektets levetid — fra specifikation til installation.",
    partners_label:"Vores produkter findes også hos",
    cta_title:"Har du et projekt? Vi visualiserer og fremstiller efter jeres specifikationer.",
    cta_btn:"Start en dialog",
    tag_kontakt:"Kontakt", title_kontakt:"Tal med vores tekniske team.", desc_kontakt:"Vi svarer med et tilbud inden for 24 timer.",
    lbl_adress:"Adresse", lbl_telefon:"Telefon", lbl_epost:"E-mail", lbl_oppet:"Åbningstider", val_oppet:"Man–Fre, 08:00–17:00",
    form_category:"Hvad handler din forespørgsel om?", form_name:"Navn", form_email:"E-mail", form_phone:"Telefon", form_company:"Virksomhed", form_message:"Besked", form_submit:"Send forespørgsel",
    form_note:"Tak — vi vender tilbage inden for 24 timer til den angivne e-mailadresse.",
    footer_desc:"Leading Water — komplette løsninger til regnvandshåndtering, leveret hurtigst i Norden siden 2017.",
    footer_produkter:"Produkter", footer_foretag:"Virksomheden", footer_kontakt:"Kontakt",
    footer_rights:"© 2026 ANRIN Nordic — Alle rettigheder forbeholdes.",
    cat_linjeafvanding:"Linjeafvanding", cat_betackningar:"Punktvandafledning / Dæksler", cat_rostfritt:"Rustfrit stål", cat_avskiljare:"Udskillere", cat_ror:"Rør & Vandtanke", cat_ovrigt:"Andet",
    legal_privacy:"Privatlivspolitik", legal_cookies:"Cookies", legal_terms:"Handelsbetingelser", legal_copyright:"Ophavsret"
  },
  no: {
    nav_produkter:"Produkter", nav_projekt:"Prosjekter", nav_omoss:"Om oss", nav_nedladdningar:"Nedlastinger", nav_kontakt:"Kontakt",
    btn_quote:"Be om tilbud",
    crumb_downloads:"HJEM / NEDLASTINGER", dl_hero_title:"Tegninger, produktark og sertifikater.", dl_hero_sub:"Samme struktur som vårt tidligere nedlastingsarkiv — søk på filnavn eller filtrer etter produktområde, dokumenttype og språk.",
    back_to_overview:"‹ Tilbake til oversikt", grate_prod_desc:"PRODUKTBESKRIVELSE", grate_prod_info:"PRODUKTINFORMASJON", grate_material:"Materiale", grate_length:"Lengde", grate_nominal_width:"Nominell bredde", grate_clasp:"Lås", grate_loading_classes:"Belastningsklasser", grate_service_contact:"SERVICE OG KONTAKT", grate_contact_sales:"Kontakt teknisk salg", matching_channel_body:"MATCHENDE RENNEKROPP", load_class:"Belastningsklasse", nav_references:"REFERANSER",
    hero_eyebrow:"ANRIN Nordic — Siden 2017",
    hero_title_1:"Vi former veien", hero_title_2:"for vannet.",
    hero_sub:"Komplette systemer for overvannshåndtering — linjeavvanning, dekkplater, rustfritt stål og utskillere. Utviklet med presisjon, levert raskest i Norden.",
    hero_cta1:"Utforsk produktene våre", hero_cta2:"Kontakt oss →",
    stat_1_v:"2017", stat_1_l:"Grunnlagt", stat_2_v:"Trelleborg", stat_2_l:"Sentrallager", stat_3_v:"24t", stat_3_l:"Tilbudstid", stat_4_v:"Norden", stat_4_l:"Leveringsområde",
    tag_produkter:"Produkter", title_produkter:"Et komplett sortiment for overvannshåndtering.", desc_produkter:"Fra polymerbetong og støpejern til rustfritt stål og HDPE — hver produktlinje er valgt sammen med ledende europeiske produsenter.",
    p1_t:"Linjeavvanning", p1_d:"Renner i polymerbetong for parkering, garasjer, gang- og sykkelveier, flyplasser og tung industri. Belastningsklasse A15–F900, bredde 100–300 mm.",
    p2_t:"Hydrotec-dekkplater", p2_d:"Dekkplater i støpejern for veier, fortau, plasser og garasjer — i samarbeid med den tyske partneren HYDROTEC. Brannsikre og klapperfrie med PUR-system.",
    p3_t:"Rustfritt & Syrefast Stål", p3_d:"Sluk, gulvrenner og takterrasseavløp i samarbeid med den finske partneren Stainless Team OY. Spesialprodukter visualiseres og produseres etter deres spesifikasjoner.",
    p4_t:"ENVIROguard-utskillere", p4_d:"Olje- og fettutskillere iht. EN 858:2003, for industri og storkjøkken. Komplette spiralviklede HDPE-rørsystemer.",
    read_more:"Les mer →",
    tag_omoss:"Om oss", title_omoss:"Bygget på raske svar og dyp teknisk kompetanse.",
    about_p1:"ANRIN Nordic ble grunnlagt i 2017 og har i dag forhandlere i alle nordiske land. Sentrallageret vårt i Trelleborg leverer effektivt til hele regionen.",
    about_p2:"Siden starten har vi nøye valgt ut produsenter og inngått unike avtaler for å tilby det svenske markedet et komplett sortiment innen overvannshåndtering.",
    about_p3:"Salgsorganisasjonen vår strekker seg fra Malmø i sør til Östersund i nord, alle med solid erfaring innen anleggs- og vannteknikk.",
    chart_title:"Nordisk dekning siden lansering", chart_sub:"Andel av det nordiske markedet med aktive forhandlere",
    tag_process:"Vår prosess", title_process:"Fra forespørsel til installasjon.", desc_process:"Et sterkt backoffice og solid teknisk kompetanse holder prosessen rask — uten å gå på akkord med presisjonen.",
    proc1_t:"Forespørsel", proc1_d:"Dere beskriver prosjektet — belastningsklasse, strømning og miljø. Det tekniske teamet vårt går i gang umiddelbart.",
    proc2_t:"Tilbud innen 24 timer", proc2_d:"Med et sterkt backoffice er målet vårt alltid å levere tilbud innen 24 timer.",
    proc3_t:"Levering", proc3_d:"Fra sentrallageret vårt i Trelleborg leverer vi til hele Norden med korte ledetider.",
    proc4_t:"Support", proc4_d:"Teknisk support gjennom hele prosjektets levetid — fra spesifikasjon til installasjon.",
    partners_label:"Produktene våre finnes også hos",
    cta_title:"Har du et prosjekt? Vi visualiserer og produserer etter deres spesifikasjoner.",
    cta_btn:"Start en dialog",
    tag_kontakt:"Kontakt", title_kontakt:"Snakk med det tekniske teamet vårt.", desc_kontakt:"Vi svarer med et tilbud innen 24 timer.",
    lbl_adress:"Adresse", lbl_telefon:"Telefon", lbl_epost:"E-post", lbl_oppet:"Åpningstider", val_oppet:"Man–Fre, 08:00–17:00",
    form_category:"Hva gjelder henvendelsen din?", form_name:"Navn", form_email:"E-post", form_phone:"Telefon", form_company:"Firma", form_message:"Melding", form_submit:"Send henvendelse",
    form_note:"Takk — vi svarer innen 24 timer til oppgitt e-postadresse.",
    footer_desc:"Leading Water — komplette løsninger for overvannshåndtering, levert raskest i Norden siden 2017.",
    footer_produkter:"Produkter", footer_foretag:"Selskapet", footer_kontakt:"Kontakt",
    footer_rights:"© 2026 ANRIN Nordic — Alle rettigheter forbeholdt.",
    cat_linjeavvattning:"Linjeavvanning", cat_betackningar:"Punktavvanning / Dekkplater", cat_rostfritt:"Rustfritt stål", cat_avskiljare:"Utskillere", cat_ror:"Rør & Vanntanker", cat_ovrigt:"Annet",
    legal_privacy:"Personvernerklæring", legal_cookies:"Informasjonskapsler", legal_terms:"Vilkår og betingelser", legal_copyright:"Opphavsrett"
  },
  is: {
    nav_produkter:"Vörur", nav_projekt:"Verkefni", nav_omoss:"Um okkur", nav_nedladdningar:"Niðurhal", nav_kontakt:"Hafðu samband",
    btn_quote:"Óska eftir tilboði",
    crumb_downloads:"HEIM / NIÐURHAL", dl_hero_title:"Teikningar, vörublöð og vottorð.", dl_hero_sub:"Sama uppbygging og í fyrra niðurhalsarkífi — leitaðu eftir skráarnafni eða síaðu eftir vöruflokki, skjalagerð og tungumáli.",
    back_to_overview:"‹ Til baka í yfirlit", grate_prod_desc:"VÖRULÝSING", grate_prod_info:"VÖRUUPLÝSINGAR", grate_material:"Efni", grate_length:"Lengd", grate_nominal_width:"Nafnbreidd", grate_clasp:"Læsing", grate_loading_classes:"Álagsflokkar", grate_service_contact:"ÞJÓNUSTA OG SAMSVIP", grate_contact_sales:"Hafðu samband við tæknisölu", matching_channel_body:"SAMSVARAÐUR RÆSAKROPPUR", load_class:"Álagsflokkur", nav_references:"TILVÍSANIR",
    hero_eyebrow:"ANRIN Nordic — Síðan 2017",
    hero_title_1:"Við mótum leiðina", hero_title_2:"fyrir vatnið.",
    hero_sub:"Heildarlausnir fyrir ofanvatnsstjórnun — línuræsi, lok, ryðfrítt stál og fituskiljur. Hannað af nákvæmni, afhent hraðast á Norðurlöndunum.",
    hero_cta1:"Skoða vörurnar okkar", hero_cta2:"Hafa samband →",
    stat_1_v:"2017", stat_1_l:"Stofnað", stat_2_v:"Trelleborg", stat_2_l:"Miðlægt vöruhús", stat_3_v:"24 klst", stat_3_l:"Svartími tilboðs", stat_4_v:"Norðurlönd", stat_4_l:"Afhendingarsvæði",
    tag_produkter:"Vörur", title_produkter:"Heildarúrval fyrir ofanvatnsstjórnun.", desc_produkter:"Frá fjölliðusteypu og steypujárni til ryðfrís stáls og HDPE — hver vörulína er valin í samstarfi við leiðandi evrópska framleiðendur.",
    p1_t:"Línuræsi", p1_d:"Rennur úr fjölliðusteypu fyrir bílastæði, bílskúra, göngu- og hjólastíga, flugvelli og þungaiðnað. Álagsflokkur A15–F900, breidd 100–300 mm.",
    p2_t:"Hydrotec-lok", p2_d:"Lok úr steypujárni fyrir götur, gangstéttir, torg og bílskúra — í samstarfi við þýska samstarfsaðilann HYDROTEC. Eldtraust og skröltlaus með PUR-kerfi.",
    p3_t:"Ryðfrítt & Sýruþolið Stál", p3_d:"Gólfniðurföll, gólfrennur og þakverandaniðurföll í samstarfi við finnska samstarfsaðilann Stainless Team OY. Sérvörur eru sýndar og framleiddar eftir ykkar forskriftum.",
    p4_t:"ENVIROguard-fituskiljur", p4_d:"Olíu- og fituskiljur samkvæmt EN 858:2003, fyrir iðnað og stóreldhús. Heildstæð, spíralvafin HDPE-lagnakerfi.",
    read_more:"Lesa meira →",
    tag_omoss:"Um okkur", title_omoss:"Byggt á hröðum svörum og djúpri tækniþekkingu.",
    about_p1:"ANRIN Nordic var stofnað árið 2017 og er í dag með dreifingaraðila í öllum Norðurlöndunum. Miðlæga vöruhúsið okkar í Trelleborg afhendir á skilvirkan hátt til alls svæðisins.",
    about_p2:"Frá upphafi höfum við vandlega valið framleiðendur og gert einstaka samninga til að bjóða sænska markaðnum heildarúrval í ofanvatnsstjórnun.",
    about_p3:"Sölusamtök okkar ná frá Malmö í suðri til Östersund í norðri, allt starfsfólk með trausta reynslu í mannvirkja- og vatnsverkfræði.",
    chart_title:"Norræn útbreiðsla frá upphafi", chart_sub:"Hlutdeild á norrænum markaði með virkum dreifingaraðilum",
    tag_process:"Vinnuferlið okkar", title_process:"Frá fyrirspurn til uppsetningar.", desc_process:"Öflug bakvinnsla og djúp tækniþekking halda ferlinu hröðu — án þess að gefa eftir í nákvæmni.",
    proc1_t:"Fyrirspurn", proc1_d:"Þið lýsið verkefninu — álagsflokki, flæði og umhverfi. Tækniteymi okkar bregst strax við.",
    proc2_t:"Tilboð innan 24 klst", proc2_d:"Með öflugri bakvinnslu er markmið okkar ávallt að afhenda tilboð innan 24 klukkustunda.",
    proc3_t:"Afhending", proc3_d:"Frá miðlæga vöruhúsinu okkar í Trelleborg afhendum við til allra Norðurlandanna með stuttum afgreiðslutíma.",
    proc4_t:"Stuðningur", proc4_d:"Tæknilegur stuðningur allan líftíma verkefnisins — frá forskrift til uppsetningar.",
    partners_label:"Vörurnar okkar er einnig að finna hjá",
    cta_title:"Ertu með verkefni? Við sjónrænum og framleiðum eftir ykkar forskriftum.",
    cta_btn:"Hefja samtal",
    tag_kontakt:"Hafðu samband", title_kontakt:"Talaðu við tækniteymið okkar.", desc_kontakt:"Við svörum með tilboði innan 24 klukkustunda.",
    lbl_adress:"Heimilisfang", lbl_telefon:"Sími", lbl_epost:"Netfang", lbl_oppet:"Opnunartími", val_oppet:"Mán–Fös, 08:00–17:00",
    form_category:"Um hvað snýst fyrirspurnin þín?", form_name:"Nafn", form_email:"Netfang", form_phone:"Sími", form_company:"Fyrirtæki", form_message:"Skilaboð", form_submit:"Senda fyrirspurn",
    form_note:"Takk — við svörum innan 24 klukkustunda á uppgefið netfang.",
    footer_desc:"Leading Water — heildarlausnir fyrir ofanvatnsstjórnun, afhent hraðast á Norðurlöndunum síðan 2017.",
    footer_produkter:"Vörur", footer_foretag:"Fyrirtækið", footer_kontakt:"Hafðu samband",
    footer_rights:"© 2026 ANRIN Nordic — Allur réttur áskilinn.",
    cat_linjeavvattning:"Línuræsi", cat_betackningar:"Punktaræsi / Lok", cat_rostfritt:"Ryðfrítt stál", cat_avskiljare:"Skiljur", cat_ror:"Rör & Vatngeymar", cat_ovrigt:"Annað",
    legal_privacy:"Persónuverndarstefna", legal_cookies:"Vafrakökur", legal_terms:"Almennar skilmálar", legal_copyright:"Höfundarréttur"
  },
  de: {
    nav_produkter:"Produkte", nav_projekt:"Projekte", nav_omoss:"Über uns", nav_nedladdningar:"Downloads", nav_kontakt:"Kontakt",
    btn_quote:"Angebot anfragen",
    crumb_downloads:"STARTSEITE / DOWNLOADS", dl_hero_title:"Zeichnungen, Produktblätter und Zertifikate.", dl_hero_sub:"Gleiche Struktur wie unsere bisherige Download-Bibliothek — suchen Sie nach Dateinamen oder filtern Sie nach Produktbereich, Dokumenttyp und Sprache.",
    back_to_overview:"‹ Zurück zur Übersicht", grate_prod_desc:"PRODUKTBESCHREIBUNG", grate_prod_info:"PRODUKTINFORMATIONEN", grate_material:"Material", grate_length:"Länge", grate_nominal_width:"Nennweite", grate_clasp:"Verschluss", grate_loading_classes:"Belastungsklassen", grate_service_contact:"SERVICE UND KONTAKT", grate_contact_sales:"Technischen Vertrieb kontaktieren", matching_channel_body:"PASSENDER RINNENKÖRPER", load_class:"Belastungsklasse", nav_references:"REFERENZEN",
    hero_eyebrow:"ANRIN Nordic — Seit 2017",
    hero_title_1:"Wir gestalten den Weg", hero_title_2:"für das Wasser.",
    hero_sub:"Komplette Systeme für die Regenwasserbewirtschaftung — Linienentwässerung, Abdeckungen, Edelstahl und Abscheider. Präzise entwickelt, am schnellsten in Nordeuropa geliefert.",
    hero_cta1:"Produkte entdecken", hero_cta2:"Kontakt aufnehmen →",
    stat_1_v:"2017", stat_1_l:"Gegründet", stat_2_v:"Trelleborg", stat_2_l:"Zentrallager", stat_3_v:"24 Std.", stat_3_l:"Angebotszeit", stat_4_v:"Norden", stat_4_l:"Liefergebiet",
    tag_produkter:"Produkte", title_produkter:"Ein komplettes Sortiment für die Regenwasserbewirtschaftung.", desc_produkter:"Von Polymerbeton und Gusseisen bis zu Edelstahl und HDPE — jede Produktlinie in Zusammenarbeit mit führenden europäischen Herstellern.",
    p1_t:"Linienentwässerung", p1_d:"Rinnen aus Polymerbeton für Parkplätze, Garagen, Geh- und Radwege, Flughäfen und die Schwerindustrie. Lastklasse A15–F900, Breite 100–300 mm.",
    p2_t:"Hydrotec Abdeckungen", p2_d:"Abdeckungen aus Gusseisen für Fahrbahnen, Gehwege, Plätze und Garagen — mit dem deutschen Partner HYDROTEC. Feuerfest und klapperfrei dank PUR-System.",
    p3_t:"Edelstahl & Säurefester Stahl", p3_d:"Bodenabläufe, Bodenrinnen und Dachterrassenabläufe mit dem finnischen Partner Stainless Team OY. Sonderanfertigungen nach Ihren Vorgaben.",
    p4_t:"ENVIROguard Abscheider", p4_d:"Öl- und Fettabscheider nach EN 858:2003, für Industrie und Gewerbeküchen. Komplette, spiralgewickelte HDPE-Rohrsysteme für hohe Beständigkeit.",
    read_more:"Mehr erfahren →",
    tag_omoss:"Über uns", title_omoss:"Schnelle Antworten, tiefes technisches Wissen.",
    about_p1:"ANRIN Nordic wurde 2017 gegründet und hat heute Vertriebspartner in allen nordischen Ländern. Unser Zentrallager in Trelleborg beliefert die gesamte Region effizient.",
    about_p2:"Seit dem Start haben wir sorgfältig Hersteller ausgewählt und exklusive Vereinbarungen getroffen, um dem schwedischen Markt ein komplettes Sortiment zu bieten.",
    about_p3:"Unsere Vertriebsorganisation reicht von Malmö im Süden bis Östersund im Norden — mit langjähriger Erfahrung im Tief- und Wasserbau.",
    chart_title:"Nordische Abdeckung seit dem Start", chart_sub:"Marktanteil mit aktiven Vertriebspartnern in Nordeuropa",
    tag_process:"Unser Prozess", title_process:"Von der Anfrage bis zur Installation.", desc_process:"Ein starkes Backoffice und fundiertes technisches Wissen machen den Prozess schnell — ohne Kompromisse bei der Präzision.",
    proc1_t:"Anfrage", proc1_d:"Sie beschreiben das Projekt — Lastklasse, Durchfluss und Umgebung. Unser technisches Team übernimmt sofort.",
    proc2_t:"Angebot in 24 Std.", proc2_d:"Mit einem starken Backoffice liefern wir Angebote grundsätzlich innerhalb von 24 Stunden.",
    proc3_t:"Lieferung", proc3_d:"Von unserem Zentrallager in Trelleborg liefern wir mit kurzen Lieferzeiten in den gesamten Norden.",
    proc4_t:"Support", proc4_d:"Technischer Support über die gesamte Projektlaufzeit — von der Spezifikation bis zur Installation.",
    partners_label:"Unsere Produkte sind gelistet bei",
    cta_title:"Haben Sie ein Projekt? Wir visualisieren und fertigen nach Ihren Vorgaben.",
    cta_btn:"Gespräch beginnen",
    tag_kontakt:"Kontakt", title_kontakt:"Sprechen Sie mit unserem technischen Team.", desc_kontakt:"Wir antworten mit einem Angebot innerhalb von 24 Stunden.",
    lbl_adress:"Adresse", lbl_telefon:"Telefon", lbl_epost:"E-Mail", lbl_oppet:"Öffnungszeiten", val_oppet:"Mo–Fr, 08:00–17:00",
    form_category:"Worum geht es bei Ihrer Anfrage?", form_name:"Name", form_email:"E-Mail", form_phone:"Telefon", form_company:"Unternehmen", form_message:"Nachricht", form_submit:"Anfrage senden",
    form_note:"Danke — wir melden uns innerhalb von 24 Stunden an die angegebene E-Mail-Adresse.",
    footer_desc:"Leading Water — komplette Lösungen für die Regenwasserbewirtschaftung, seit 2017 am schnellsten im Norden geliefert.",
    footer_produkter:"Produkte", footer_foretag:"Unternehmen", footer_kontakt:"Kontakt",
    footer_rights:"© 2026 ANRIN Nordic — Alle Rechte vorbehalten.",
    cat_linjeavvattning:"Linienentwässerung", cat_betackningar:"Punktentwässerung / Abdeckungen", cat_rostfritt:"Edelstahl", cat_avskiljare:"Abscheider", cat_ror:"Rohre & Wassertanks", cat_ovrigt:"Sonstiges",
    legal_privacy:"Datenschutzerklärung", legal_cookies:"Cookies", legal_terms:"Allgemeine Geschäftsbedingungen", legal_copyright:"Urheberrecht"
  }
};

/* Brand visibility rules */
const BRAND_VISIBILITY = {
  sv: {hydrotec:true, stainless:true},
  en: {hydrotec:true, stainless:true},
  fi: {hydrotec:true, stainless:true},
  da: {hydrotec:true, stainless:true},
  no: {hydrotec:true, stainless:true},
  is: {hydrotec:true, stainless:true},
  de: {hydrotec:true, stainless:true}
};

function applyBrandVisibility(lang){
  const rules = BRAND_VISIBILITY[lang] || BRAND_VISIBILITY.en;
  document.querySelectorAll('[data-brand="hydrotec"]').forEach(el=> el.classList.remove('brand-hidden'));
  document.querySelectorAll('[data-brand="stainless"]').forEach(el=> el.classList.remove('brand-hidden'));
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function triggerGoogleTranslate(lang) {
  if (lang === 'sv') {
    // Clear Google Translate cookie so native dictionary translations render cleanly without auto-language shifting
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
  } else {
    setCookie('googtrans', `/sv/${lang}`, 7);
  }

  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = (lang === 'sv') ? '' : lang;
    select.dispatchEvent(new Event('change'));
  }
}

function applyLanguage(lang){

  // Locale-conditional Finnish vs Swedish contact address
  if (lang === 'fi') {
    document.querySelectorAll('.sweden-branch, .sw-contact-info').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.finland-branch, .fi-contact-info').forEach(el => el.style.display = 'block');
  } else {
    document.querySelectorAll('.sweden-branch, .sw-contact-info').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.finland-branch, .fi-contact-info').forEach(el => el.style.display = 'none');
  }

  if (!LANG_NAMES[lang]) lang = 'en';
  
  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined) {
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  renderLangMenus(lang);

  document.querySelectorAll('.mm-langs button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.querySelectorAll('.lang-label').forEach(el=> el.textContent = lang.toUpperCase());
  document.documentElement.setAttribute('lang', lang);
  
  applyBrandVisibility(lang);
  try { localStorage.setItem('anrin_lang', lang); } catch(e){}

  triggerGoogleTranslate(lang);
}

function getInitialLanguage() {
  let saved = null;
  try { saved = localStorage.getItem('anrin_lang'); } catch(e){}
  if (saved && LANG_NAMES[saved]) return saved;
  return 'en'; // Default to English (en)
}

const LANG_ITEMS = [
  { code: 'sv', country: 'SE', label: 'Swedish (sv)' },
  { code: 'en', country: 'GB', label: 'English (en)' },
  { code: 'fi', country: 'FI', label: 'Finnish (fi)' },
  { code: 'da', country: 'DK', label: 'Danish (da)' },
  { code: 'no', country: 'NO', label: 'Norwegian (no)' },
  { code: 'is', country: 'IS', label: 'Icelandic (is)' },
  { code: 'de', country: 'DE', label: 'German (de)' }
];

function buildLangMenuHTML(activeLang) {
  return LANG_ITEMS.map(item => {
    const isActive = item.code === activeLang ? ' active' : '';
    return `<button data-lang="${item.code}" class="notranslate${isActive}" translate="no"><span class="lang-code notranslate" translate="no">${item.country}</span><span class="lang-name notranslate" translate="no">${item.label}</span></button>`;
  }).join('');
}

function renderLangMenus(activeLang) {
  const html = buildLangMenuHTML(activeLang);
  document.querySelectorAll('.lang-menu').forEach(menu => {
    menu.classList.add('notranslate');
    menu.setAttribute('translate', 'no');
    menu.innerHTML = html;
  });
}

/* Inject Mandatory Universal CSS for Language Dropdown Switcher */
(function injectLangSwitchStyles() {
  const style = document.createElement('style');
  style.id = 'lang-switch-universal-style';
  style.innerHTML = `
    .lang-switch {
      position: relative !important;
      display: inline-block !important;
    }
    .lang-switch .lang-menu {
      display: none !important;
      position: absolute !important;
      top: calc(100% + 8px) !important;
      right: 0 !important;
      background: #ffffff !important;
      border: 1px solid rgba(0,0,0,0.08) !important;
      border-radius: 18px !important;
      box-shadow: 0 16px 40px rgba(0,0,0,0.14) !important;
      min-width: 185px !important;
      padding: 10px 8px !important;
      z-index: 999999 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transition: opacity 0.2s ease, visibility 0.2s ease !important;
    }
    .lang-switch.open .lang-menu {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .lang-menu button {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
      width: 100% !important;
      text-align: left !important;
      padding: 8px 12px !important;
      border: none !important;
      background: transparent !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      color: #222222 !important;
      cursor: pointer !important;
      border-radius: 8px !important;
      transition: background 0.15s ease !important;
    }
    .lang-menu button .lang-code {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 11px !important;
      font-weight: 800 !important;
      color: #111111 !important;
      width: 24px !important;
      text-align: center !important;
      letter-spacing: 0.02em !important;
    }
    .lang-menu button:hover {
      background: #f4f4f5 !important;
    }
    .lang-menu button.active {
      background: transparent !important;
    }
    .lang-menu button.active .lang-name {
      font-weight: 700 !important;
      color: #000000 !important;
    }
    .lang-menu button.active .lang-code {
      font-weight: 900 !important;
      color: #000000 !important;
    }
  `;
  if (document.head) document.head.appendChild(style);
  else document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
})();

function protectLangElements() {
  document.querySelectorAll('.lang-switch, .lang-menu, .mm-langs, .lang-current').forEach(el => {
    el.classList.add('notranslate');
    el.setAttribute('translate', 'no');
  });
}

function initGlobalMegaMenu(){
  const trigger = document.getElementById('productsMegaTrigger') || document.querySelector('.has-mega');
  const panel = document.getElementById('megaPanel');
  const overlay = document.getElementById('megaOverlay');
  if(!trigger || !panel) return;

  // Enforce 4-column grid layout and make all columns visible
  document.querySelectorAll('#megaPanel .mega-grid').forEach(g => {
    g.style.display = 'grid';
    g.style.gridTemplateColumns = 'repeat(4, 1fr)';
    g.style.gap = '32px';
  });
  document.querySelectorAll('#megaPanel .mega-col').forEach(col => {
    col.style.display = 'block';
    col.classList.remove('brand-hidden');
  });

  let timer = null;

  function openMenu(){
    if(timer) { clearTimeout(timer); timer = null; }
    panel.classList.add('open');
    if(overlay) overlay.classList.add('open');
  }

  function closeMenu(){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      panel.classList.remove('open');
      if(overlay) overlay.classList.remove('open');
    }, 180);
  }

  trigger.addEventListener('mouseenter', openMenu);
  trigger.addEventListener('mouseleave', closeMenu);

  panel.addEventListener('mouseenter', openMenu);
  panel.addEventListener('mouseleave', closeMenu);

  const link = trigger.querySelector('a');
  if(link){
    link.addEventListener('click', (e)=>{
      if(!panel.classList.contains('open')){
        e.preventDefault();
        openMenu();
      }
    });
  }

  if(overlay){
    overlay.addEventListener('click', ()=>{
      if(timer) clearTimeout(timer);
      panel.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      if(timer) clearTimeout(timer);
      panel.classList.remove('open');
      if(overlay) overlay.classList.remove('open');
    }
  });
}

function initLangSwitcher(){
  const currentLang = getInitialLanguage();
  applyLanguage(currentLang);
  protectLangElements();
  initGlobalMegaMenu();
}

// Global Event Delegation for 100% Click Reliability across all pages & dynamically loaded elements
document.addEventListener('click', (e) => {
  const currentBtn = e.target.closest('.lang-current');
  if (currentBtn) {
    e.stopPropagation();
    e.preventDefault();
    const sw = currentBtn.closest('.lang-switch');
    if (sw) {
      // Close all other open lang switches first
      document.querySelectorAll('.lang-switch.open').forEach(s => {
        if (s !== sw) s.classList.remove('open');
      });
      sw.classList.toggle('open');
    }
    return;
  }

  const langMenuBtn = e.target.closest('.lang-menu button');
  if (langMenuBtn) {
    e.preventDefault();
    const lang = langMenuBtn.dataset.lang;
    if (lang) {
      applyLanguage(lang);
    }
    const sw = langMenuBtn.closest('.lang-switch');
    if (sw) sw.classList.remove('open');
    return;
  }

  const mmLangBtn = e.target.closest('.mm-langs button');
  if (mmLangBtn) {
    e.preventDefault();
    const lang = mmLangBtn.dataset.lang;
    if (lang) {
      applyLanguage(lang);
    }
    return;
  }

  // Click outside closes any open lang-switch
  document.querySelectorAll('.lang-switch.open').forEach(s => s.classList.remove('open'));
});

/* Fail-safe Preloader Dismissal (Prevents black screen freezing) */
function dismissPreloader() {
  const p = document.getElementById('preloader');
  if (p) {
    p.classList.add('done');
    p.style.opacity = '0';
    p.style.visibility = 'hidden';
    p.style.pointerEvents = 'none';
    setTimeout(() => { p.style.display = 'none'; }, 400);
  }
}
window.addEventListener('load', dismissPreloader);
document.addEventListener('DOMContentLoaded', () => setTimeout(dismissPreloader, 400));
setTimeout(dismissPreloader, 800);

// Run immediately if DOM is ready, otherwise on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLangSwitcher();
    initGlobalMegaMenu();
    dismissPreloader();
  });
} else {
  initLangSwitcher();
  initGlobalMegaMenu();
  dismissPreloader();
}

/* Background Google Translate Engine initialization for full page translation */
(function setupGoogleTranslateEngine() {
  if (!document.getElementById('google_translate_element')) {
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    document.body ? document.body.appendChild(gtDiv) : document.addEventListener('DOMContentLoaded', () => document.body.appendChild(gtDiv));
  }

  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'sv',
      includedLanguages: 'sv,en,fi,da,no,is,de',
      autoDisplay: false
    }, 'google_translate_element');

    const initialLang = getInitialLanguage();
    if (initialLang !== 'sv') {
      setTimeout(() => triggerGoogleTranslate(initialLang), 300);
    }
  };

/* Inject CSS to hide Google Translate top bar, popups, tooltips, blue highlights, and text cursor edit mode */
(function injectGoogleTranslateStyles() {
  const style = document.createElement('style');
  style.id = 'gt-anti-highlight-styles';
  style.innerHTML = `
    .goog-te-banner-frame,
    .goog-te-banner-frame.skiptranslate,
    iframe.goog-te-banner-frame,
    #goog-gt-tt,
    .goog-te-balloon-frame,
    div.goog-te-tooltip,
    .goog-text-highlight,
    .goog-tooltip,
    .goog-tooltip:hover {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    font, font *, font[style], span[style*="background-color"], .goog-text-highlight {
      background-color: transparent !important;
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
      outline: none !important;
      color: inherit !important;
      cursor: inherit !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    font:hover, font:focus, font:active,
    span[style]:hover, span[style]:focus,
    .goog-text-highlight:hover, .goog-text-highlight:focus,
    font *:hover, font *:focus, font *:active {
      background-color: transparent !important;
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
      outline: none !important;
      color: inherit !important;
      cursor: inherit !important;
    }
    
    html, body {
      top: 0px !important;
      margin-top: 0px !important;
      padding-top: 0px !important;
      position: static !important;
    }
    .goog-te-banner-frame,
    .goog-te-banner-frame.skiptranslate,
    iframe.goog-te-banner-frame,
    .skiptranslate.goog-te-banner-frame {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  
    .skiptranslate:not(.notranslate):not(#google_translate_element) {
      display: none !important;
    }
  `;
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
  }
})();

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.head.appendChild(script);

})();



/* Preloader fail-safe dismiss */
function autoDismissPreloader() {
  const els = document.querySelectorAll('#preloader');
  els.forEach(p => {
    p.classList.add('done');
    p.style.display = 'none';
    p.style.opacity = '0';
    p.style.visibility = 'hidden';
    p.style.pointerEvents = 'none';
  });
}

/* Scroll reveal fail-safe so all content is 100% visible */
function autoRevealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('in');
  });
}

/* Global 100% Edge-to-Edge Full Bleed Hero & Header Clear Fix */
(function injectGlobalHeroFix() {
  const style = document.createElement('style');
  style.id = 'global-full-bleed-breakout-fix';
  style.textContent = `

    /* ── Hero Stat Row Mobile Optimization (2 Cols x 2 Rows Grid, Zero Word Break) ── */
    @media (max-width: 768px) {
      section.hero .wrap.hero-meta,
      .hero .wrap.hero-meta,
      .aint-hero-home .wrap.hero-meta,
      .page-hero .wrap.hero-meta,
      .htec-hero .wrap.hero-meta,
      div.wrap.hero-meta,
      .wrap.hero-meta,
      .hero-meta,
      .brand-meta-row,
      .hero-stats,
      .stat-row,
      div.stat-row {
        all: unset !important;
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: auto auto !important;
        gap: 24px 16px !important;
        margin-top: 32px !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 20px 16px 0 16px !important;
        border-top: 1px solid rgba(255, 255, 255, 0.14) !important;
        box-sizing: border-box !important;
      }

      section.hero .wrap.hero-meta > div,
      .hero .wrap.hero-meta > div,
      .aint-hero-home .wrap.hero-meta > div,
      .page-hero .wrap.hero-meta > div,
      .wrap.hero-meta > div,
      .hero-meta > div,
      .brand-meta-row > div,
      .hero-stats > div,
      .stat-row > div {
        all: unset !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
      }

      section.hero .wrap.hero-meta > div b,
      .hero .wrap.hero-meta > div b,
      .aint-hero-home .wrap.hero-meta > div b,
      .page-hero .wrap.hero-meta > div b,
      .wrap.hero-meta > div b,
      .hero-meta > div b,
      .brand-meta-row > div b,
      .hero-stats > div b,
      .stat-row div b {
        display: block !important;
        font-family: 'Manrope', sans-serif !important;
        font-size: 20px !important;
        font-weight: 800 !important;
        color: #ffffff !important;
        margin-bottom: 4px !important;
        white-space: nowrap !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
        hyphens: none !important;
        line-height: 1.15 !important;
      }

      section.hero .wrap.hero-meta > div span,
      .hero .wrap.hero-meta > div span,
      .wrap.hero-meta > div span,
      .hero-meta > div span,
      .brand-meta-row > div span,
      .hero-stats > div span,
      .stat-row div span {
        display: block !important;
        font-size: 11px !important;
        color: rgba(255, 255, 255, 0.75) !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
        white-space: normal !important;
        word-break: normal !important;
        overflow-wrap: break-word !important;
        line-height: 1.3 !important;
      }
    }



    /* ── Universal Mobile Optimization for ANRIN Product Pages (anrin-page-1 to 27) ── */
    @media (max-width: 768px) {
      body {
        padding-top: 70px !important;
      }

      .vbig-container, .container, main, .main-content {
        padding-left: 16px !important;
        padding-right: 16px !important;
        overflow-x: hidden !important;
      }

      /* 1. Product Title & Breadcrumbs */
      h1, .product-title, .product-heading {
        font-size: 22px !important;
        line-height: 1.25 !important;
        margin-top: 10px !important;
        margin-bottom: 10px !important;
        word-break: break-word !important;
      }

      /* 2. Product Specs Table Mobile Responsiveness */
      .product-specs-table, table.product-specs-table {
        display: block !important;
        width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        border-collapse: collapse !important;
      }
      .product-specs-table tr {
        display: flex !important;
        flex-direction: column !important;
        padding: 8px 0 !important;
        border-bottom: 1px solid #eeeeee !important;
      }
      .product-specs-table td {
        display: block !important;
        width: 100% !important;
        padding: 2px 0 !important;
        font-size: 13.5px !important;
      }
      .product-specs-table td:first-child {
        font-weight: 700 !important;
        color: #111111 !important;
      }

      /* 3. Product Image Carousel & Thumbnails */
      #productMainCarousel, .product-image-slider {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
      }
      #productMainCarousel img, .product-image {
        max-height: 240px !important;
        object-fit: contain !important;
        width: auto !important;
        margin: 0 auto !important;
      }
      .thumbnail-container, .thumbnail-slider {
        display: flex !important;
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        gap: 8px !important;
        padding: 8px 0 !important;
      }
      .thumbnail {
        flex: 0 0 54px !important;
        width: 54px !important;
        height: 54px !important;
      }

      /* 4. Downloads Buttons inside Accordion */
      .dowloads .col-12, .dowloads [class*="col-"] {
        width: 100% !important;
        flex: 0 0 100% !important;
        max-width: 100% !important;
        margin-bottom: 8px !important;
      }

      /* 5. Accessories / Variant Product Grid Cards (2 per row on Mobile) */
      .additional-products .row {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px 12px !important;
        width: 100% !important;
        margin: 16px 0 !important;
      }
      .additional-products .col {
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: 0 !important;
        padding: 0 !important;
      }
      .additional-product-image-container, .additional-product-image {
        height: 140px !important;
        min-height: 140px !important;
        max-height: 150px !important;
        background: #f8f9fa !important;
        border-radius: 10px !important;
        padding: 10px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .additional-product-image img, .additional-product-image-container img {
        max-height: 120px !important;
        max-width: 100% !important;
        object-fit: contain !important;
      }
      .additional-product-info {
        padding: 8px 4px !important;
      }
      .additional-product-info .product-name {
        font-size: 13px !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        margin-bottom: 2px !important;
        color: #111111 !important;
      }
      .additional-product-info .product-description {
        font-size: 11.5px !important;
        line-height: 1.3 !important;
        color: #555555 !important;
      }
    }



    



    /* ── Mobile Product Card Layout Fix (anrin-page-1 to 27) ──────────────── */
    @media (max-width: 768px) {
      .additional-products .row,
      .responsive-tabs-component .row,
      .tab-content .row {
        display: flex !important;
        flex-direction: column !important;
        gap: 20px !important;
        width: 100% !important;
      }

      .additional-products .col,
      .responsive-tabs-component .col,
      .tab-content .col,
      .sku-card,
      .card-item {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        height: auto !important;
        margin-bottom: 16px !important;
      }

      .additional-product-image-container,
      .additional-product-image,
      .card-image-wrapper {
        position: relative !important;
        width: 100% !important;
        height: 220px !important;
        max-height: 240px !important;
        min-height: 180px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        background: #f8f9fa !important;
        border-radius: 12px !important;
        padding: 12px !important;
        box-sizing: border-box !important;
      }

      .additional-product-image img,
      .additional-product-image-container img,
      .card-image-wrapper img {
        position: static !important;
        max-width: 100% !important;
        max-height: 100% !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        margin: 0 auto !important;
        display: block !important;
      }

      .additional-product-info,
      .card-info {
        padding: 16px 12px !important;
        position: static !important;
        width: 100% !important;
        height: auto !important;
      }

      .additional-product-info .product-name,
      .additional-product-info h3,
      .additional-product-info h4 {
        font-size: 16px !important;
        font-weight: 700 !important;
        line-height: 1.3 !important;
        margin-bottom: 6px !important;
        color: #111111 !important;
      }

      .additional-product-info .product-description,
      .additional-product-info p {
        font-size: 13.5px !important;
        line-height: 1.5 !important;
        color: #555555 !important;
      }

      /* Hero Stats 2x2 Grid Layout */
      section.hero .wrap.hero-meta,
      .hero .wrap.hero-meta,
      .aint-hero-home .wrap.hero-meta,
      .page-hero .wrap.hero-meta,
      .htec-hero .wrap.hero-meta,
      div.wrap.hero-meta,
      .wrap.hero-meta,
      .hero-meta,
      .brand-meta-row,
      .hero-stats,
      .stat-row {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: auto auto !important;
        gap: 24px 16px !important;
        margin-top: 28px !important;
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      section.hero .wrap.hero-meta > div,
      .hero .wrap.hero-meta > div,
      .aint-hero-home .wrap.hero-meta > div,
      .page-hero .wrap.hero-meta > div,
      .wrap.hero-meta > div,
      .hero-meta > div,
      .stat-row > div {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        flex: none !important;
        box-sizing: border-box !important;
      }

      
    section.hero .wrap.hero-meta > div b,
    .hero .wrap.hero-meta > div b,
    .wrap.hero-meta > div b,
    .hero-meta > div b,
    .stat-row div b {
      font-size: 17px !important;
      white-space: nowrap !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
      hyphens: none !important;
    }
  

      section.hero .wrap.hero-meta > div span,
      .hero .wrap.hero-meta > div span,
      .wrap.hero-meta > div span,
      .hero-meta > div span,
      .stat-row div span {
        font-size: 11px !important;
        white-space: normal !important;
        word-break: break-word !important;
      }
    }



    /* ── Hero Stat Row Mobile 2x2 Grid Layout (2 per col, 2 per row) ────────── */
    .stat-row, div.stat-row, .hero-content .stat-row {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 36px !important;
      margin-top: 40px !important;
      width: 100% !important;
    }

    @media (max-width: 768px) {
      .stat-row, div.stat-row, .hero-content .stat-row {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: auto auto !important;
        gap: 24px 16px !important;
        margin-top: 28px !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .stat-row > div {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
        flex: none !important;
      }
      .stat-row div b {
        font-size: 26px !important;
        line-height: 1.15 !important;
        display: block !important;
      }
      .stat-row div span {
        font-size: 11px !important;
        line-height: 1.3 !important;
        display: block !important;
      }
    }

    @media (max-width: 400px) {
      .stat-row, div.stat-row, .hero-content .stat-row {
        grid-template-columns: 1fr 1fr !important;
        gap: 20px 12px !important;
      }
      .stat-row div b {
        font-size: 22px !important;
      }
    }



    

    @media (max-width: 400px) {
      .stat-row, div.stat-row {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px 12px !important;
      }
      .stat-row div b {
        font-size: 22px !important;
      }
    }



    /* ── Partners / Certifications Strip: Equal Spacing & Horizontal Row ────── */
    .partners-strip,
    div.partners-strip {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: wrap !important;
      gap: 32px !important;
      width: 100% !important;
      max-width: 1320px !important;
      margin: 0 auto !important;
      padding: 40px 0 !important;
    }

    .partners-strip .partners-label {
      font-family: 'Manrope', -apple-system, sans-serif !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #767676 !important;
      white-space: nowrap !important;
      margin: 0 !important;
    }

    .partners-strip img {
      height: 36px !important;
      max-height: 40px !important;
      width: auto !important;
      max-width: 160px !important;
      object-fit: contain !important;
      display: inline-block !important;
      filter: grayscale(1) opacity(0.75) !important;
      transition: opacity 0.25s ease, filter 0.25s ease !important;
    }

    .partners-strip img:hover {
      filter: grayscale(0) opacity(1) !important;
    }

    @media (max-width: 768px) {
      .partners-strip,
      div.partners-strip {
        justify-content: center !important;
        gap: 24px !important;
        padding: 28px 16px !important;
      }
    }



    

    @media (max-width: 480px) {
      .wrap, .container, .hero .wrap, .hero-content, .page-hero .wrap, 
      .htec-hero .wrap, #hero .hero-inner, section.hero .wrap, 
      footer .wrap, .main-site-footer .wrap, main.wrap {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }

    .hero, .page-hero, .htec-hero, .aint-hero-home, #hero, section.hero {
      position: relative !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      left: 0 !important;
      right: 0 !important;
      padding-top: 140px !important;
      padding-bottom: 80px !important;
      background-color: #000000 !important;
      color: #ffffff !important;
      box-sizing: border-box !important;
    }

    .hero-content {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      text-align: left !important;
    }

    @media (max-width: 768px) {
      .hero, .page-hero, .htec-hero, .aint-hero-home, #hero, section.hero {
        padding-top: 100px !important;
        padding-bottom: 48px !important;
      }
    }

    /* ── Mobile Typography & Headings ─────────────────────────────────────── */
    @media (max-width: 768px) {
      h1, .hero-title, h1.hero-title, .page-hero h1 {
        font-size: clamp(26px, 7vw, 42px) !important;
        line-height: 1.18 !important;
        letter-spacing: -0.015em !important;
        word-break: break-word !important;
        overflow-wrap: break-word !important;
      }

      h2, .section-title, h2.section-title, .cta-banner h2 {
        font-size: clamp(22px, 5.5vw, 32px) !important;
        line-height: 1.25 !important;
        word-break: break-word !important;
      }

      h3, .card-title, h3.title, .cat-block h3, .product-card h3 {
        font-size: clamp(18px, 4.5vw, 24px) !important;
        line-height: 1.3 !important;
      }

      .lead, p.lead, .hero-sub, p.hero-sub, .section-desc {
        font-size: clamp(14px, 3.8vw, 16.5px) !important;
        line-height: 1.55 !important;
      }
    }

    /* ── Layout Grids & Cards Transformation on Mobile ─────────────────────── */
    @media (max-width: 992px) {
      .split, .cat-block, .chart-card {
        grid-template-columns: 1fr !important;
        gap: 36px !important;
      }
      .products-grid, .projects-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }

    @media (max-width: 640px) {
      .products-grid, .projects-grid, .news-grid, .prod-grid, .grid, 
      .ref-grid, .downloads-grid, .contact-grid, .hero-grid, .features-grid, 
      .cat-grid, .cards-grid, .dl-grid, .specs-grid, .prod-cards, .system-grid, 
      .products-grid, .use-cases-grid, .steps-grid, .stats-grid, .gallery-grid,
      .footer-top, .main-site-footer .footer-top, .stat-row {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        gap: 20px !important;
      }

      .product-card, .project-card, .news-card, .prod-card, .card, 
      .ref-card, .dl-row, .contact-card {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
      }

      .process-item {
        grid-template-columns: 44px 1fr !important;
        gap: 16px !important;
      }
      .process-item .pi-desc {
        grid-column: 1 / -1 !important;
      }

      .hero-actions, .hero-ctas, .btn-group, .cta-banner .wrap, .cat-cta {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        gap: 12px !important;
      }

      .hero-actions a, .hero-ctas a, .btn-primary, .btn-secondary, 
      .btn-quote, .btn, .btn-dark, .btn-ghost-line, .cta-banner a {
        width: 100% !important;
        text-align: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        min-height: 48px !important;
        display: inline-flex !important;
        align-items: center !important;
      }
    }

    @media (max-width: 768px) {
      .news-modal-dialog, .ref-modal-dialog, .modal-dialog, .lightbox-dialog,
      .modal-content, .news-modal .news-modal-dialog {
        width: 94% !important;
        max-width: 100% !important;
        margin: 16px auto !important;
        padding: 20px 16px !important;
        max-height: 88vh !important;
        overflow-y: auto !important;
        border-radius: 16px !important;
        box-sizing: border-box !important;
      }

      section, .section-pad {
        padding-top: 44px !important;
        padding-bottom: 44px !important;
      }
    }

`;
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
  }
})();

/* Automatic Broken Image Fallback & Local File Link Repair */
function fixBrokenImagesAndLinks() {
  const isSubFolder = window.location.pathname.includes('/files');
  const pathPrefix = isSubFolder ? '../' : '';
  const fallbackImg = pathPrefix + 'images/stainless_kitchen_drain.jpg';

  document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
      this.onerror = null;
      this.src = fallbackImg;
    };
  });

  document.querySelectorAll('a[href]').forEach(a => {
    let href = a.getAttribute('href');
    if (!href) return;

    if (href.includes('index.html#enviroguard') || href.endsWith('#enviroguard')) {
      a.setAttribute('href', pathPrefix + 'produkter.html#enviroguard');
    } else if (href.includes('stainless-team.html')) {
      a.setAttribute('href', pathPrefix + 'stainless-team.html');
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      // Remove leading slash so file:/// relative resolution works
      let cleanHref = href.replace(/^\/+/, '');
      a.setAttribute('href', pathPrefix + cleanHref);
    }
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  autoDismissPreloader();
  autoRevealElements();
  fixBrokenImagesAndLinks();
} else {
  window.addEventListener('load', () => {
    autoDismissPreloader();
    autoRevealElements();
    fixBrokenImagesAndLinks();
  });
  document.addEventListener('DOMContentLoaded', () => {
    autoDismissPreloader();
    autoRevealElements();
    fixBrokenImagesAndLinks();
  });
}
window.applyLanguage = applyLanguage;
window.setLanguage = applyLanguage;

document.addEventListener('anrin:header-mounted', function () {
  applyLanguage(getInitialLanguage());
});

/* Header rendering & styling is fully managed by header.js and header.css */




/* Continuous fail-safe to kill Google Translate top 40px body gap */
setInterval(function() {
  if (document.body) {
    if (document.body.style.top !== '0px' && document.body.style.top !== '') document.body.style.top = '0px';
    if (document.body.style.marginTop !== '0px' && document.body.style.marginTop !== '') document.body.style.marginTop = '0px';
  }
  if (document.documentElement) {
    if (document.documentElement.style.top !== '0px' && document.documentElement.style.top !== '') document.documentElement.style.top = '0px';
    if (document.documentElement.style.marginTop !== '0px' && document.documentElement.style.marginTop !== '') document.documentElement.style.marginTop = '0px';
  }
}, 150);
